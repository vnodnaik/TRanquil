# Tranquil Peeplz - Recruitment & Staffing Website

A professional recruitment and staffing website built with React, FastAPI, and MongoDB.

## 🎨 Design Theme
- **Primary Color**: Orange (#FF6B35)
- **Secondary Colors**: White (#FFFFFF), Grey (#6B7280, #374151)
- **Fonts**: Space Grotesk (headings), Inter (body text)

## 📋 Features

### Pages
1. **Home** - Hero section, services, how it works, industries, why choose us, solving challenges
2. **About Us** - Mission, vision, culture, team members, core values, company story
3. **For Employer** - Benefits, hiring process, job posting form
4. **For Employee** - Benefits, career tips, job types, testimonials
5. **Job Search** - Advanced search filters, job listings
6. **Job Details** - Detailed job information, application form
7. **Contact Us** - Contact form, contact information, FAQ

### Backend Features
- RESTful API with FastAPI
- MongoDB database integration
- Job management (CRUD operations)
- Application tracking
- Contact form submissions
- Statistics API
- Advanced job search with filters

### Frontend Features
- Responsive design (mobile, tablet, desktop)
- Professional UI with orange/white/grey theme
- Smooth animations and transitions
- Job search with multiple filters
- Online job application
- Contact forms
- Dynamic statistics display

## 🚀 API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs (with optional filters: search, location, category, job_type)
- `GET /api/jobs/{job_id}` - Get single job
- `POST /api/jobs` - Create new job

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get all applications

### Contact
- `POST /api/contact` - Submit contact form

### Other
- `GET /api/stats` - Get platform statistics
- `GET /api/industries` - Get list of industries
- `GET /api/categories` - Get job categories

## 🛠️ Tech Stack

### Backend
- FastAPI
- Motor (async MongoDB driver)
- Pydantic (data validation)
- Python 3.x

### Frontend
- React 19
- React Router DOM
- Axios
- Tailwind CSS
- Shadcn/UI Components
- Lucide React Icons
- Sonner (toast notifications)

### Database
- MongoDB

## Getting Started

This project is structured with:
- Frontend: React application in `/frontend`
- Backend: FastAPI server in `/backend`
- Database: MongoDB

## Development

Both frontend and backend support hot reload during development.
