# 🚀 Job Portal API

<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

A modern and **scalable Job Portal API** built with **NestJS**, **Prisma**, and **JWT Authentication**.  
Designed for managing users, jobs, companies, and skills with role-based access control.

---

## 📌 Badges

![NestJS](https://img.shields.io/badge/NestJS-8.0.0-red?logo=nestjs)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green?logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-4.0.0-blue?logo=prisma)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
![NPM](https://img.shields.io/npm/v/@nestjs/core)

---

## 🛠️ Tech Stack

- **Backend:** NestJS (Node.js + TypeScript)
- **Database:** PostgreSQL/MySQL via Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Cloudinary
- **Email Service:** Nodemailer
- **Testing:** Jest
- **Environment:** dotenv

---

## ✨ Features

### 🔑 Authentication & Authorization
- JWT-based login & registration
- Role-based access control (Admin, Employer, Job Seeker)

### 👤 User Management
- Register & login
- Profile management
- Upload profile picture

### 💼 Job Management
- CRUD operations for jobs
- Assign skills to jobs
- Only job owners can update/delete

### 🛠️ Skills Management
- CRUD for user skills
- CRUD for job skills

### 🏢 Company Management
- CRUD operations for companies
- Associate jobs with companies

### 📬 Notifications
- OTP verification
- Registration confirmation
- Password reset emails

### 🌐 File Uploads
- Profile pictures & company logos via Cloudinary

---

## ⚡ Project Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
