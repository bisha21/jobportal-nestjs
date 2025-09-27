# 🚀 Job Portal API

<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

A modern, **scalable Job Portal API** built with **NestJS**, **Prisma**, and **JWT Authentication**.  
Includes **Google OAuth Login** and **real-time notifications** using **Socket.IO**.

---

## 📌 Badges

![NestJS](https://img.shields.io/badge/NestJS-9.0.0-red?logo=nestjs)
![Node.js](https://img.shields.io/badge/Node.js-20.0.0-green?logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-4.15.0-blue?logo=prisma)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.0-orange)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
![NPM](https://img.shields.io/npm/v/@nestjs/core)

---

## 🛠️ Tech Stack

- **Backend:** NestJS (Node.js + TypeScript)
- **Database:** PostgreSQL/MySQL via Prisma ORM
- **Authentication:** JWT + Google OAuth 2.0
- **Real-Time:** Socket.IO
- **Email Service:** Nodemailer
- **File Uploads:** Cloudinary
- **Testing:** Jest
- **Environment Management:** dotenv

---

## ✨ Features

### 🔑 Authentication & Authorization
- JWT-based login & registration
- Google OAuth login
- Role-based access control (Admin, Employer, Job Seeker)

### 👤 User Management
- Register & login
- Profile management
- Upload profile picture

### 💼 Job Management
- CRUD operations for jobs
- Assign skills to jobs
- Only job owners can update/delete jobs

### 🛠️ Skills Management
- CRUD for user skills
- CRUD for job skills

### 🏢 Company Management
- CRUD operations for companies
- Associate jobs with companies

### 📬 Notifications
- Real-time notifications with **Socket.IO**
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
