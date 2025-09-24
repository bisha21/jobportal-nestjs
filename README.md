# 🚀 Job Portal API

<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

A modern, **scalable Job Portal API** built with **NestJS**, **Prisma**, and **JWT Authentication**.  
Includes **Google OAuth Login**, **real-time notifications**, and a **chatting feature** using **Socket.IO**.

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

### 💬 Chatting Feature
We have integrated a **real-time chatting feature** so that **Job Seekers** can directly chat with the **Employer** of the company they applied for.

#### Feature Highlights
- Real-time messaging between Job Seekers and Employers.
- Conversations restricted to only the Job Seeker and the Employer of the job applied for.
- Messages stored in the database for persistence.
- Notifications for new messages.

#### Chat Flow
1. A Job Seeker applies for a job.
2. A conversation room is created between the Job Seeker and the Employer.
3. Both participants join the conversation room via **Socket.IO**.
4. They send and receive messages in real-time.
5. Messages are persisted for later access.

#### Socket.IO Events for Chat

| Event               | Description                                  | Payload                                     |
|---------------------|----------------------------------------------|----------------------------------------------|
| `joinConversation` | Join the conversation room                  | `{ conversationId: number }`               |
| `sendMessage`      | Send a message to the conversation room     | `{ conversationId: number, content: string }` |
| `newMessage`       | Emitted when a new message is sent         | `{ message }`                               |

#### How to Test Chat
You can test this feature via **Postman WebSocket** or any frontend Socket.IO client.

**Connect to Socket.IO:**
