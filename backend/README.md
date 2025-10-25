# 🚀 Job Portal API

<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

A modern, **scalable Job Portal API** built with **NestJS**, **Prisma**, and **JWT Authentication**.  
Includes **Google OAuth Login**, **real-time notifications**, **favorites**, **chatting feature** using **Socket.IO**, **Redis caching**, **BullMQ for message queues**, and a **Subscription-Based Model** for premium features.

---

## 📌 Badges

![NestJS](https://img.shields.io/badge/NestJS-9.0.0-red?logo=nestjs)
![Node.js](https://img.shields.io/badge/Node.js-20.0.0-green?logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-4.15.0-blue?logo=prisma)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.0-orange)
![Redis](https://img.shields.io/badge/Redis-7.0.0-orange?logo=redis)
![BullMQ](https://img.shields.io/badge/BullMQ-2.0.0-red)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
![NPM](https://img.shields.io/npm/v/@nestjs/core)

---

## 🛠️ Tech Stack

* **Backend:** NestJS (Node.js + TypeScript)
* **Database:** PostgreSQL/MySQL via Prisma ORM
* **Authentication:** JWT + Google OAuth 2.0
* **Real-Time:** Socket.IO
* **Caching:** Redis (for performance and quick data retrieval)
* **Message Queue:** BullMQ (for handling background jobs and notifications)
* **Email Service:** Nodemailer
* **File Uploads:** Cloudinary
* **Testing:** Jest
* **Environment Management:** dotenv

---

## ✨ Features

### 🔑 Authentication & Authorization

* JWT-based login & registration  
* Google OAuth login  
* Role-based access control (Admin, Employer, Job Seeker)

### 👤 User Management

* Register & login  
* Profile management  
* Upload profile picture

### 💼 Job Management

* CRUD operations for jobs  
* Assign skills to jobs  
* Only job owners can update/delete jobs

### 🛠️ Skills Management

* CRUD for user skills  
* CRUD for job skills

### 🏢 Company Management

* CRUD operations for companies  
* Associate jobs with companies

### ⭐ Favorites (Save Jobs for Later)

Job Seekers can **save jobs to their favorites list** and apply later.

#### Feature Highlights

* Add jobs to favorites  
* View list of saved jobs  
* Remove jobs from favorites  
* Prevent duplicate entries with unique constraint

### 📬 Notifications

* Real-time notifications with **Socket.IO**  
* OTP verification  
* Registration confirmation  
* Password reset emails  
* Queue notifications using **BullMQ** for reliability and scaling

### 💬 Chatting Feature

Integrated **real-time chatting** for Job Seekers and Employers.

#### Feature Highlights

* Real-time messaging between Job Seekers and Employers  
* Conversations restricted to Job Seeker and Employer of the job applied for  
* Messages stored in the database  
* Notifications for new messages via **BullMQ**

#### Chat Flow

1. A Job Seeker applies for a job  
2. A conversation room is created between Job Seeker and Employer  
3. Participants join the conversation room via **Socket.IO**  
4. Messages sent and received in real-time  
5. Messages persisted for later access

---

### ⚡ Additional Features

* **Caching:** Frequently accessed data (jobs, user profiles) cached in **Redis** for faster retrieval  
* **Background Jobs:** Email sending, notifications, and heavy processing handled asynchronously using **BullMQ**  
* **Scalable Architecture:** Designed to handle thousands of concurrent users with real-time features  

---

## 💳 Subscription-Based Model

A flexible **subscription system** that enables both **Free** and **Premium** plans (e.g., Monthly or 6-Month subscriptions).  
This allows users to access advanced features such as premium job postings, unlimited applications, and priority chat access.

### 🧩 Plan Types

| Plan | Duration | Description | Price |
|------|-----------|-------------|--------|
| **Free** | Unlimited | Basic job access and limited applications | $0 |
| **Monthly** | 30 Days | Full premium access for one month | $9.99 |
| **6-Months** | 180 Days | Long-term premium access with discounts | $49.99 |

### ⚙️ Key Features

* **Subscription Plans** — Free, Monthly, and 6-Month plans  
* **User Subscriptions** — Tracks active plan, renewal date, and expiration  
* **Automatic Renewal & Expiration** — Managed using **BullMQ** background jobs  
* **Redis Caching** — For fast subscription validation and performance  
* **Access Control** — Restrict premium-only features via guards/decorators  
* **Payment Integration (Optional)** — Supports **Stripe**, **PayPal**, or manual plans  

### 🔄 Subscription Flow

1. User selects a plan (Free, Monthly, or 6-Month)  
2. Subscription is activated and stored in the database  
3. BullMQ schedules reminders and handles expiration  
4. Expired subscriptions automatically revert to **Free** tier  
5. Premium routes are only accessible to active subscribers  

### 🧠 Future Enhancements

* Integration with **Stripe** for recurring billing and invoices  
* **Admin Dashboard** to monitor active subscribers  
* **Analytics** for plan popularity and revenue tracking  

---

## 🪪 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---
