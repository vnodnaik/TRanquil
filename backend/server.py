from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from enum import Enum
from auth import (
    get_password_hash, verify_password, create_access_token,
    decode_access_token, oauth2_scheme, generate_verification_token
)
from email_service import send_password_reset_email

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class UserRole(str, Enum):
    employer = "employer"
    jobseeker = "jobseeker"

class JobType(str, Enum):
    full_time = "Full-time"
    part_time = "Part-time"
    contract = "Contract"
    temporary = "Temporary"
    internship = "Internship"

class ApplicationStatus(str, Enum):
    pending = "Pending"
    reviewed = "Reviewed"
    shortlisted = "Shortlisted"
    rejected = "Rejected"

class ContactType(str, Enum):
    employer = "employer"
    employee = "employee"
    general = "general"

# Auth Models
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    password_hash: str
    role: UserRole
    email_verified: bool = False
    verification_token: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    profile: Optional[dict] = None

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: UserRole
    email_verified: bool
    profile: Optional[dict] = None

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    desired_position: Optional[str] = None
    experience: Optional[str] = None
    skills: Optional[str] = None
    bio: Optional[str] = None

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

# Job Models
class Job(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    location: str
    salary_range: Optional[str] = None
    job_type: JobType
    category: str
    company: str
    requirements: List[str]
    posted_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True
    employer_id: Optional[str] = None  # Made optional for backward compatibility

class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    salary_range: Optional[str] = None
    job_type: JobType
    category: str
    company: str
    requirements: List[str]

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    salary_range: Optional[str] = None
    job_type: Optional[JobType] = None
    category: Optional[str] = None
    company: Optional[str] = None
    requirements: Optional[List[str]] = None
    is_active: Optional[bool] = None

class Application(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    jobseeker_id: str
    applicant_name: str
    email: EmailStr
    phone: str
    cover_letter: str
    status: ApplicationStatus = ApplicationStatus.pending
    applied_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ApplicationCreate(BaseModel):
    job_id: str
    applicant_name: str
    email: EmailStr
    phone: str
    cover_letter: str

class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: str
    contact_type: ContactType
    created_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str
    contact_type: ContactType

class Stats(BaseModel):
    total_jobs: int
    active_jobs: int
    total_applications: int
    companies_hiring: int

# Dependency to get current user
async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    
    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if user is None:
        raise credentials_exception
    
    return User(**user)

# Auth Routes
@api_router.post("/auth/signup", response_model=Token)
async def signup(user_data: UserSignup):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=get_password_hash(user_data.password),
        role=user_data.role,
        verification_token=generate_verification_token()
    )
    
    user_dict = user.model_dump()
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    
    await db.users.insert_one(user_dict)
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    # For now, auto-verify email (in production, send email)
    await db.users.update_one(
        {"id": user.id},
        {"$set": {"email_verified": True}}
    )
    
    user_response = UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        role=user.role,
        email_verified=True,
        profile=user.profile
    )
    
    return Token(access_token=access_token, token_type="bearer", user=user_response)

@api_router.post("/auth/login", response_model=Token)
async def login(user_data: UserLogin):
    user = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    
    if not user or not verify_password(user_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    user_response = UserResponse(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"],
        email_verified=user.get("email_verified", False),
        profile=user.get("profile")
    )
    
    return Token(access_token=access_token, token_type="bearer", user=user_response)

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        role=current_user.role,
        email_verified=current_user.email_verified,
        profile=current_user.profile
    )

@api_router.put("/auth/switch-role")
async def switch_role(current_user: User = Depends(get_current_user)):
    new_role = UserRole.jobseeker if current_user.role == UserRole.employer else UserRole.employer
    
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {"role": new_role}}
    )
    
    return {"message": f"Role switched to {new_role}", "new_role": new_role}

@api_router.put("/auth/profile", response_model=UserResponse)
async def update_profile(profile_data: ProfileUpdate, current_user: User = Depends(get_current_user)):
    update_data = profile_data.model_dump(exclude_unset=True)
    
    # Update name if provided
    if "name" in update_data:
        await db.users.update_one(
            {"id": current_user.id},
            {"$set": {"name": update_data["name"]}}
        )
        del update_data["name"]
    
    # Update profile fields
    if update_data:
        current_profile = current_user.profile or {}
        current_profile.update(update_data)
        
        await db.users.update_one(
            {"id": current_user.id},
            {"$set": {"profile": current_profile}}
        )
    
    # Fetch updated user
    updated_user = await db.users.find_one({"id": current_user.id}, {"_id": 0})
    
    return UserResponse(
        id=updated_user["id"],
        name=updated_user["name"],
        email=updated_user["email"],
        role=updated_user["role"],
        email_verified=updated_user.get("email_verified", False),
        profile=updated_user.get("profile")
    )

# Job Routes
@api_router.get("/jobs", response_model=List[Job])
async def get_jobs(
    category: Optional[str] = None,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    search: Optional[str] = None
):
    query = {"is_active": True}
    
    if category:
        query["category"] = category
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    if job_type:
        query["job_type"] = job_type
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"company": {"$regex": search, "$options": "i"}}
        ]
    
    jobs = await db.jobs.find(query, {"_id": 0}).to_list(1000)
    
    for job in jobs:
        if isinstance(job['posted_date'], str):
            job['posted_date'] = datetime.fromisoformat(job['posted_date'])
    
    return jobs

@api_router.get("/jobs/my-jobs", response_model=List[Job])
async def get_my_jobs(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.employer:
        raise HTTPException(status_code=403, detail="Only employers can view their jobs")
    
    jobs = await db.jobs.find({"employer_id": current_user.id}, {"_id": 0}).to_list(1000)
    
    for job in jobs:
        if isinstance(job['posted_date'], str):
            job['posted_date'] = datetime.fromisoformat(job['posted_date'])
    
    return jobs

@api_router.get("/jobs/{job_id}", response_model=Job)
async def get_job(job_id: str):
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if isinstance(job['posted_date'], str):
        job['posted_date'] = datetime.fromisoformat(job['posted_date'])
    
    return job

@api_router.post("/jobs", response_model=Job)
async def create_job(input: JobCreate, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.employer:
        raise HTTPException(status_code=403, detail="Only employers can post jobs")
    
    job_dict = input.model_dump()
    job_obj = Job(**job_dict, employer_id=current_user.id)
    
    doc = job_obj.model_dump()
    doc['posted_date'] = doc['posted_date'].isoformat()
    
    await db.jobs.insert_one(doc)
    return job_obj

@api_router.put("/jobs/{job_id}", response_model=Job)
async def update_job(job_id: str, input: JobUpdate, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.employer:
        raise HTTPException(status_code=403, detail="Only employers can update jobs")
    
    job = await db.jobs.find_one({"id": job_id, "employer_id": current_user.id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found or you don't have permission")
    
    update_data = input.model_dump(exclude_unset=True)
    if update_data:
        await db.jobs.update_one({"id": job_id}, {"$set": update_data})
    
    updated_job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if isinstance(updated_job['posted_date'], str):
        updated_job['posted_date'] = datetime.fromisoformat(updated_job['posted_date'])
    
    return Job(**updated_job)

@api_router.delete("/jobs/{job_id}")
async def delete_job(job_id: str, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.employer:
        raise HTTPException(status_code=403, detail="Only employers can delete jobs")
    
    result = await db.jobs.delete_one({"id": job_id, "employer_id": current_user.id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found or you don't have permission")
    
    return {"message": "Job deleted successfully"}

# Application Routes
@api_router.post("/applications", response_model=Application)
async def create_application(input: ApplicationCreate, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.jobseeker:
        raise HTTPException(status_code=403, detail="Only job seekers can apply")
    
    # Check if job exists
    job = await db.jobs.find_one({"id": input.job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Check if already applied
    existing = await db.applications.find_one({
        "job_id": input.job_id,
        "jobseeker_id": current_user.id
    })
    if existing:
        raise HTTPException(status_code=400, detail="You have already applied for this job")
    
    application_dict = input.model_dump()
    application_obj = Application(**application_dict, jobseeker_id=current_user.id)
    
    doc = application_obj.model_dump()
    doc['applied_date'] = doc['applied_date'].isoformat()
    
    await db.applications.insert_one(doc)
    return application_obj

@api_router.get("/applications/my-applications", response_model=List[Application])
async def get_my_applications(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.jobseeker:
        raise HTTPException(status_code=403, detail="Only job seekers can view their applications")
    
    applications = await db.applications.find(
        {"jobseeker_id": current_user.id},
        {"_id": 0}
    ).to_list(1000)
    
    for app in applications:
        if isinstance(app['applied_date'], str):
            app['applied_date'] = datetime.fromisoformat(app['applied_date'])
    
    return applications

@api_router.get("/applications/job/{job_id}", response_model=List[Application])
async def get_job_applications(job_id: str, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.employer:
        raise HTTPException(status_code=403, detail="Only employers can view applications")
    
    # Verify job belongs to employer
    job = await db.jobs.find_one({"id": job_id, "employer_id": current_user.id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found or you don't have permission")
    
    applications = await db.applications.find(
        {"job_id": job_id},
        {"_id": 0}
    ).to_list(1000)
    
    for app in applications:
        if isinstance(app['applied_date'], str):
            app['applied_date'] = datetime.fromisoformat(app['applied_date'])
    
    return applications

@api_router.put("/applications/{application_id}/status")
async def update_application_status(
    application_id: str,
    status_update: ApplicationStatusUpdate,
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.employer:
        raise HTTPException(status_code=403, detail="Only employers can update application status")
    
    application = await db.applications.find_one({"id": application_id})
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Verify job belongs to employer
    job = await db.jobs.find_one({
        "id": application["job_id"],
        "employer_id": current_user.id
    })
    if not job:
        raise HTTPException(status_code=403, detail="You don't have permission to update this application")
    
    await db.applications.update_one(
        {"id": application_id},
        {"$set": {"status": status_update.status}}
    )
    
    return {"message": "Application status updated", "status": status_update.status}

@api_router.get("/applications")
async def get_all_applications():
    applications = await db.applications.find({}, {"_id": 0}).to_list(1000)
    
    for app in applications:
        if isinstance(app['applied_date'], str):
            app['applied_date'] = datetime.fromisoformat(app['applied_date'])
    
    return applications

# Job Recommendations
@api_router.get("/jobs/recommendations", response_model=List[Job])
async def get_job_recommendations(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.jobseeker:
        raise HTTPException(status_code=403, detail="Only job seekers can get recommendations")
    
    # Get categories from user's applications
    applications = await db.applications.find(
        {"jobseeker_id": current_user.id},
        {"_id": 0, "job_id": 1}
    ).to_list(1000)
    
    if not applications:
        # Return latest jobs if no applications
        jobs = await db.jobs.find(
            {"is_active": True},
            {"_id": 0}
        ).sort("posted_date", -1).limit(10).to_list(10)
    else:
        job_ids = [app["job_id"] for app in applications]
        applied_jobs = await db.jobs.find(
            {"id": {"$in": job_ids}},
            {"_id": 0, "category": 1}
        ).to_list(1000)
        
        categories = list(set([job["category"] for job in applied_jobs]))
        
        # Get jobs in same categories
        jobs = await db.jobs.find(
            {
                "is_active": True,
                "category": {"$in": categories},
                "id": {"$nin": job_ids}
            },
            {"_id": 0}
        ).limit(10).to_list(10)
    
    for job in jobs:
        if isinstance(job['posted_date'], str):
            job['posted_date'] = datetime.fromisoformat(job['posted_date'])
    
    return jobs

# Contact Routes
@api_router.post("/contact", response_model=Contact)
async def create_contact(input: ContactCreate):
    contact_dict = input.model_dump()
    contact_obj = Contact(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_date'] = doc['created_date'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

# Stats Route
@api_router.get("/stats", response_model=Stats)
async def get_stats():
    total_jobs = await db.jobs.count_documents({})
    active_jobs = await db.jobs.count_documents({"is_active": True})
    total_applications = await db.applications.count_documents({})
    
    companies = await db.jobs.distinct("company")
    companies_hiring = len(companies)
    
    return Stats(
        total_jobs=total_jobs,
        active_jobs=active_jobs,
        total_applications=total_applications,
        companies_hiring=companies_hiring
    )

# Industries Route
@api_router.get("/industries")
async def get_industries():
    industries = [
        {"name": "Technology", "icon": "laptop"},
        {"name": "Healthcare", "icon": "heart-pulse"},
        {"name": "Finance", "icon": "building-columns"},
        {"name": "Manufacturing", "icon": "industry"},
        {"name": "Retail", "icon": "shopping-cart"},
        {"name": "Education", "icon": "graduation-cap"},
        {"name": "Hospitality", "icon": "utensils"},
        {"name": "Construction", "icon": "hard-hat"}
    ]
    return industries

# Categories Route
@api_router.get("/categories")
async def get_categories():
    categories = await db.jobs.distinct("category")
    return categories if categories else [
        "Engineering", "Marketing", "Sales", "Human Resources",
        "Finance", "Operations", "Customer Service", "IT"
    ]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()