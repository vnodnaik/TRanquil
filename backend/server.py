from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum

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

# Models
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

class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    salary_range: Optional[str] = None
    job_type: JobType
    category: str
    company: str
    requirements: List[str]

class Application(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
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

# Routes
@api_router.get("/")
async def root():
    return {"message": "Tranquil Peeplz API"}

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

@api_router.get("/jobs/{job_id}", response_model=Job)
async def get_job(job_id: str):
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if isinstance(job['posted_date'], str):
        job['posted_date'] = datetime.fromisoformat(job['posted_date'])
    
    return job

@api_router.post("/jobs", response_model=Job)
async def create_job(input: JobCreate):
    job_dict = input.model_dump()
    job_obj = Job(**job_dict)
    
    doc = job_obj.model_dump()
    doc['posted_date'] = doc['posted_date'].isoformat()
    
    await db.jobs.insert_one(doc)
    return job_obj

# Application Routes
@api_router.post("/applications", response_model=Application)
async def create_application(input: ApplicationCreate):
    # Check if job exists
    job = await db.jobs.find_one({"id": input.job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    application_dict = input.model_dump()
    application_obj = Application(**application_dict)
    
    doc = application_obj.model_dump()
    doc['applied_date'] = doc['applied_date'].isoformat()
    
    await db.applications.insert_one(doc)
    return application_obj

@api_router.get("/applications", response_model=List[Application])
async def get_applications():
    applications = await db.applications.find({}, {"_id": 0}).to_list(1000)
    
    for app in applications:
        if isinstance(app['applied_date'], str):
            app['applied_date'] = datetime.fromisoformat(app['applied_date'])
    
    return applications

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
    
    # Count unique companies
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