# 🔐 FreeAPI Authentication App (React)

This project is a simple authentication system built using **React** and the **FreeAPI Authentication Module**. It demonstrates a complete frontend auth flow including registration, login, logout, and fetching the current logged-in user.

---

## 🚀 Features

- User Registration
- User Login
- Logout Functionality
- Fetch Current Logged-in User
- Session Persistence using `localStorage`
- Protected UI based on authentication state
- Loading states during API calls

---

## 🛠️ Tech Stack

- React (Vite / CRA compatible)
- JavaScript (ES6+)
- Fetch API
- FreeAPI Backend

---

## 🔗 API Endpoints Used

### 1. Register User

**POST** `https://api.freeapi.app/api/v1/users/register`

**Body:**
```json
{
  "email": "user.email@domain.com",
  "password": "test@123",
  "role": "ADMIN",
  "username": "doejohn"
}
```

### 2. Login User

**POST** `https://api.freeapi.app/api/v1/users/login`

**Body:**
```json
{
  "username": "doejohn",
  "password": "test@123"
}
```

### 3. Logout User

**POST** `https://api.freeapi.app/api/v1/users/logout`

**Headers:**
```json
{
  "Authorization": "Bearer <accessToken>"
}
```

### 4. Get Current User

**GET** `https://api.freeapi.app/api/v1/users/current-user`

**Headers:**
```json
{
  "Authorization": "Bearer <accessToken>"
}
```

---

## 🔐 Auth Flow (How it works)

1. User registers using email, username, and password
2. User logs in with username + password
3. API returns:
   - `accessToken`
   - `refreshToken`
   - user data
4. Token is stored in `localStorage`
5. Token is used to fetch current user on refresh
6. Logout clears token and session state

---

## 📁 Project Structure

```
src/
├── App.jsx        # Main authentication logic
├── App.css        # Styling
└── main.jsx       # React entry point
```

---

## ▶️ How to Run This Project

### 1. Clone the repository

```bash
git clone https://github.com/siddhantgorte/freeapi-playground.git
```

### 2. Navigate into the project folder

```bash
cd Freeapi-auth-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in browser

Navigate to: `http://localhost:5173`
