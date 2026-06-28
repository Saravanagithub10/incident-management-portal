# 🚨 Incident Management Portal

A full-stack cloud-native Incident Management Portal built using **React, Node.js, Express, Azure SQL Database, Azure App Service, and Azure Static Web Apps**.

This project allows organizations to manage IT incidents through a secure web application with authentication, role-based access, and complete incident lifecycle management.

---

# 🌐 Live Demo

### Frontend
https://orange-plant-0fdccc700.7.azurestaticapps.net

### Backend API
https://incident-management-portal-api-h2fnd5ashheahtdz.centralindia-01.azurewebsites.net

---

# 🚀 Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes

---

## Incident Management

- Create Incident
- View Incidents
- Edit Incident
- Delete Incident
- Search Incidents
- Filter by Status
- Filter by Priority

---

## Dashboard

- Total Incidents
- Open Incidents
- In Progress Incidents
- Resolved Incidents

---

## Role Based Access

### Employee

- Create Incidents
- View Own Incidents
- Edit Own Incidents
- Delete Own Incidents

### Admin

- View All Incidents
- Manage All Incidents
- Full System Access

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router
- Axios
- Bootstrap
- CSS

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

## Database

- Azure SQL Database

## Cloud Services

- Azure App Service
- Azure Static Web Apps

## CI/CD

- GitHub Actions

---

# 📂 Project Structure

```
Incident-Management-Portal
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── src
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication Flow

```
User

↓

Login / Register

↓

JWT Token Generated

↓

Protected APIs

↓

Azure SQL Database
```

---

# ☁️ Azure Architecture

```
React Frontend
(Azure Static Web Apps)

        │

        ▼

Node.js Express API
(Azure App Service)

        │

        ▼

Azure SQL Database
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/Saravanagithub10/incident-management-portal.git
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📌 Future Enhancements

- Email Notifications
- Azure Monitor Integration
- Azure Blob Storage Attachments
- Role Management
- Charts & Analytics
- Audit Logs

---

GitHub:
https://github.com/Saravanagithub10

LinkedIn:
https://www.linkedin.com/in/saravanankannan31/

---

# ⭐ If you like this project

Please consider giving this repository a ⭐ on GitHub.
