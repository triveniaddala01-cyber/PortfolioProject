# Triveni Portfolio CMS

A full-stack personal portfolio and Content Management System (CMS) developed to showcase skills, projects, education, career information, and contact details.

The system includes a public portfolio website and an authenticated admin dashboard that allows portfolio content to be managed dynamically without modifying the frontend source code.

## Project Overview

The Portfolio CMS allows visitors to view portfolio information through a responsive web interface.

The administrator can log in to the dashboard and manage:

* About information
* Skills
* Projects
* Contact messages

The application uses a React frontend, FastAPI backend, SQLAlchemy, and PostgreSQL database.

## Features

### Public Portfolio

* Home section
* About Me section
* Technical Skills
* Projects
* Contact section
* Resume access
* GitHub and LinkedIn links

### Admin Dashboard

* Admin registration
* Admin login
* Manage About information
* Add skills
* Update skills
* Delete skills
* Add projects
* Update projects
* Delete projects
* View contact messages
* Delete contact messages
* Password reset functionality
* Persistent database storage

## Technologies Used

### Frontend

* React.js
* Vite
* HTML
* CSS
* JavaScript

### Backend

* Python
* FastAPI
* SQLAlchemy
* Uvicorn
* REST APIs

### Database

* PostgreSQL

### Deployment

* Vercel – Frontend
* Render – Backend
* Render PostgreSQL – Database
* GitHub – Source Code Management

## System Architecture

```text
Visitor
   │
   ▼
React / Vite Frontend
   │
   │ REST API
   ▼
FastAPI Backend
   │
   ▼
SQLAlchemy
   │
   ▼
PostgreSQL Database
```

## Project Structure

```text
PortfolioProject/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Admin.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── package.json
└── .gitignore
```

## API Endpoints

### About

```text
GET  /about
PUT  /about
```

### Skills

```text
GET     /skills
POST    /skills
PUT     /skills/{skill_id}
DELETE  /skills/{skill_id}
```

### Projects

```text
GET     /projects
POST    /projects
PUT     /projects/{project_id}
DELETE  /projects/{project_id}
```

### Contact

```text
GET     /contact
POST    /contact
DELETE  /contact/{message_id}
```

### Authentication

```text
POST /auth/register
POST /auth/login
PUT  /auth/reset-password
```

## Deployment

### Frontend

The React frontend is deployed using Vercel.

### Backend

The FastAPI backend is deployed using Render.

### Database

The application uses PostgreSQL for persistent data storage.

The deployed application follows this flow:

```text
Admin / Visitor
      │
      ▼
Vercel Frontend
      │
      ▼
Render FastAPI Backend
      │
      ▼
PostgreSQL Database
```

## Local Setup

### Clone the Repository

```bash
git clone https://github.com/triveniaddala01-cyber/PortfolioProject.git
cd PortfolioProject
```

### Backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Set the PostgreSQL database connection using the `DATABASE_URL` environment variable.

Start the backend:

```bash
uvicorn main:app --reload
```

API:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## Security

Sensitive information such as database credentials and environment variables should not be committed to the GitHub repository.

The project uses environment variables for the PostgreSQL database connection.

## Purpose of the Project

The main purpose of this project is to create a dynamic and maintainable personal portfolio.

The CMS allows portfolio content to be updated through an admin dashboard instead of manually modifying frontend source code for every content change.

## Future Enhancements

* Secure password hashing
* JWT-based authentication
* Image upload management
* Project categories and filtering
* Analytics dashboard
* Email notifications
* Role-based access control
* Improved responsive design

## Author

**Triveni**

B.Tech – Artificial Intelligence and Data Science

**Portfolio CMS Project**
