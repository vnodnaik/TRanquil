from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import secrets

# Security configurations
SECRET_KEY = "your-secret-key-change-in-production-tanquil-peeplz-2025"  # Change this in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Configure passlib to work with newer bcrypt
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12,
    bcrypt__ident="2b"
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        # Truncate password to 72 bytes if needed (bcrypt limitation)
        if len(plain_password.encode('utf-8')) > 72:
            plain_password = plain_password[:72]
        return pwd_context.verify(plain_password, hashed_password)
    except Exception as e:
        print(f"Password verification error: {e}")
        return False

def get_password_hash(password: str) -> str:
    try:
        # Truncate password to 72 characters (not bytes) for bcrypt
        if len(password) > 72:
            password = password[:72]
        return pwd_context.hash(password)
    except Exception as e:
        print(f"Password hashing error: {e}")
        raise HTTPException(status_code=500, detail=f"Password hashing failed: {str(e)}")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def generate_verification_token() -> str:
    return secrets.token_urlsafe(32)
