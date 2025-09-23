# 🚀 Job Portal API

<div align="center">
  <img src="https://img.icons8.com/color/200/business.png" alt="Job Portal Logo" width="120"/>
  
  <h3>🌟 Modern Job Portal API with NestJS 🌟</h3>
  <p><em>Complete job portal backend with Google Auth, Real-time notifications & Email system</em></p>

  ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
  ![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

  ![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
  ![License](https://img.shields.io/badge/license-MIT-green.svg)
  ![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

</div>

## 🎯 Features

- 🔐 **Google OAuth 2.0** - Seamless social authentication
- 🔔 **Real-time Notifications** - Socket.io powered instant updates
- 📧 **Email System** - Nodemailer with beautiful templates for password reset
- 👥 **Role-based Access** - Admin, Employer, Job Seeker roles
- 💼 **Job Management** - Complete CRUD with search & filtering
- 🏢 **Company Profiles** - Rich company information management
- 🛠️ **Skills System** - Dynamic skill matching for jobs
- ☁️ **File Upload** - Cloudinary integration for images
- 🧪 **Testing** - Comprehensive Jest test suite

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Backend** | NestJS, Node.js, TypeScript |
| **Database** | PostgreSQL, Prisma ORM, Redis |
| **Authentication** | JWT, Google OAuth 2.0, Passport |
| **Real-time** | Socket.io |
| **Email** | Nodemailer, Handlebars templates |
| **Storage** | Cloudinary |
| **Testing** | Jest, Supertest |

## ⚡ Quick Start

```bash
# Clone repository
git clone https://github.com/your-username/job-portal-api.git
cd job-portal-api

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Setup database
npx prisma generate
npx prisma migrate deploy

# Start development server
npm run start:dev

# API will be running on http://localhost:3000
# Swagger docs: http://localhost:3000/api/docs
```

## 📋 Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/jobportal"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Email (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="JobPortal <noreply@jobportal.com>"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Redis
REDIS_URL="redis://localhost:6379"

# App
PORT=3000
APP_URL="http://localhost:3000"
FRONTEND_URL="http://localhost:3001"
```

## 🔗 API Endpoints

### Authentication
```
POST   /auth/register           # Register new user
POST   /auth/login             # Email/password login
GET    /auth/google            # Google OAuth login
POST   /auth/forgot-password   # Request password reset
POST   /auth/reset-password    # Reset password with token
POST   /auth/refresh           # Refresh JWT token
POST   /auth/verify-email      # Verify email with OTP
```

### Users
```
GET    /users/profile          # Get current user
PUT    /users/profile          # Update profile
POST   /users/upload-avatar    # Upload profile picture
```

### Jobs
```
GET    /jobs                   # Get all jobs (with filters)
POST   /jobs                   # Create job (employer only)
GET    /jobs/:id               # Get job details
PUT    /jobs/:id               # Update job (owner only)
DELETE /jobs/:id               # Delete job (owner only)
POST   /jobs/:id/apply         # Apply for job
```

### Companies
```
GET    /companies              # Get all companies
POST   /companies              # Create company
GET    /companies/:id          # Get company details
PUT    /companies/:id          # Update company
POST   /companies/:id/logo     # Upload company logo
```

### Skills
```
GET    /skills                 # Get all skills
POST   /skills                 # Create skill (admin only)
PUT    /skills/:id             # Update skill
DELETE /skills/:id             # Delete skill
```

## 🔔 Socket.io Events

### Client Events
```javascript
// Join user room
socket.emit('join-room', { userId: 'user-123' });

// Send message
socket.emit('send-message', {
  recipientId: 'user-456',
  message: 'Hello!'
});
```

### Server Events
```javascript
// New job notification
socket.on('new-job-posted', (data) => {
  console.log('New job:', data.job);
});

// Application status update
socket.on('application-status-updated', (data) => {
  console.log('Status:', data.status);
});

// Real-time message
socket.on('message-received', (data) => {
  console.log('Message:', data.message);
});
```

## 📧 Email Templates

The system includes professional email templates:

- **Welcome Email** - User registration confirmation
- **Email Verification** - OTP verification code
- **Password Reset** - Secure password reset link
- **Job Application** - Application confirmation
- **Status Updates** - Application status changes

## 📊 Database Schema

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  password    String?
  googleId    String?
  firstName   String
  lastName    String
  avatar      String?
  role        Role     @default(JOB_SEEKER)
  isVerified  Boolean  @default(false)
  
  profile     Profile?
  jobs        Job[]
  applications Application[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Job {
  id          String   @id @default(cuid())
  title       String
  description String
  salary      Int?
  location    String
  workType    WorkType @default(FULL_TIME)
  
  company     Company  @relation(fields: [companyId], references: [id])
  companyId   String
  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  skills      JobSkill[]
  applications Application[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Role {
  ADMIN
  EMPLOYER
  JOB_SEEKER
}

enum WorkType {
  FULL_TIME
  PART_TIME
  CONTRACT
  FREELANCE
}
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 📁 Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── dto/                 # Data transfer objects
│   ├── guards/              # JWT, Google OAuth guards
│   ├── strategies/          # Passport strategies
│   └── auth.service.ts      # Auth business logic
├── users/                   # User management
├── jobs/                    # Job management  
├── companies/               # Company management
├── skills/                  # Skills management
├── notifications/           # Socket.io notifications
│   └── notifications.gateway.ts
├── mail/                    # Email service
│   ├── templates/           # Email templates
│   └── mail.service.ts      # Nodemailer integration
├── upload/                  # File upload (Cloudinary)
├── common/                  # Shared utilities
└── prisma/                  # Database schema
```

## 🚀 Deployment

### Docker
```bash
# Build image
docker build -t job-portal-api .

# Run with docker-compose
docker-compose up -d
```

### Environment Setup
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 🔒 Security Features

- ✅ JWT with refresh tokens
- 🌐 Google OAuth 2.0 integration
- 🔐 bcrypt password hashing
- 👥 Role-based access control
- 🚦 Rate limiting
- 🔍 Input validation
- 🛡️ CORS protection
- 🪖 Security headers (Helmet)

## 📈 Performance

- ⚡ Database indexing
- 🗃️ Redis caching
- 📦 Response compression
- 🔄 Connection pooling
- 📱 API pagination

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Prisma team for the excellent ORM
- Socket.io for real-time capabilities

---

<div align="center">
  <strong>⭐ Star this repository if you found it helpful! ⭐</strong>
</div>
