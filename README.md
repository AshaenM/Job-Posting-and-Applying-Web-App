# 💼 TalentHaven – Job Posting & Application Portal

A fully responsive **multi-role job recruitment web application** built using Vue.js and PHP.  
TalentHaven streamlines the hiring process by providing recruiters and applicants with dedicated, role-based portals to manage job postings, applications, and more.

---

## 🚀 Features

### 👩‍💼 Recruiters
- Sign up and log in via recruiter portal
- Post, update, and delete job vacancies (CRUD)
- View and search job applications
- Accept or reject applicants

### 🙋 Applicants
- Sign up and log in via applicant portal
- View and search job listings
- Apply for jobs via dynamic forms
- Track application status
- Shortlist jobs (Like feature)

### 🌐 Shared Features
- Responsive UI for all devices
- News page with category filtering and search
- Role-based route guards & dynamic navigation
- Persistent session state using Pinia
- Pagination for job/news lists
- Accessible forms (WCAG 2.0 Level AA)
- Real-time form validation

---

## 🧠 Innovative Features

- 🔁 **Smart Autocompletion** – Forms auto-fill based on previous entries (e.g., names carried over across components)
- 🔐 **Dynamic Route Guards** – Prevent unauthorized page access by role-checking before routing
- 🧭 **Adaptive Navbar** – Navigation updates in real time based on login state
- 💾 **Session Hydration** – Ensures session state loads before routing occurs
- ✨ **Live Quote API** – Homepage displays motivational quotes via public API

---

## 🛠️ Technical Stack

### Frontend
- **Vue.js 3** + **Vite**
- **Vue Router** – Dynamic routing with custom guards
- **Pinia** – State management with persisted state
- **Bootstrap** – For responsive layout
- **Axios** – For API communication
- **Vue Devtools** – Debugging

### Backend
- **PHP** – Handles all server-side logic
- **JSON files** – Used for data persistence (users, jobs, news, applications, shortlists)

---

## 📸 Demo

[![Watch the video](https://img.youtube.com/vi/CavDsJqLZ1w/0.jpg)](https://youtu.be/CavDsJqLZ1w)

---

## 🛠️ Setup & Installation

### 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 🚀 Getting Started

1. **Clone the Repository**

```bash
git clone https://github.com/AshaenM/Job-Posting-and-Applying-Web-App.git
cd Job-Posting-and-Applying-Web-App
```

2. **Install Dependencies**

```bash
npm install
```

3. Run the Development Server

```bash
npm run dev
```

4. Build for Production

```bash
npm run build
```

5. Preview the Production Build

```bash
npm run preview
```

## 📄 License

**All rights reserved.**  
This project is not open source and may not be copied, reused, or distributed without written permission from the author.

---
