# 🚖 Uber Clone – Full Stack MERN Application

A full-stack Uber-like ride booking application built using the **MERN stack** with real-time ride updates, authentication, and separate flows for **Users** and **Captains (Drivers)**.

---

## 🧰 Tech Stack

### Frontend
- React + Vite
- React Router DOM
- Context API
- Axios
- Socket.IO Client
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO
- Google Maps APIs

---

## ✨ Features

### User
- Signup & Login
- Request a ride
- Fare estimation
- Live ride tracking
- Ride confirmation & completion

### Captain (Driver)
- Signup & Login
- Go online/offline
- Accept or reject rides
- Live location tracking
- Start & end rides

### System
- JWT-based authentication
- Role-based access control
- Real-time updates using Socket.IO
- Secure REST APIs
- MVC backend architecture

---

## 📁 Project Structure

```
uber/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── main.jsx
│
└── README.md


```

---

## 🔐 Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_BASE_URL=http://localhost:4000
```

### Backend (`Backend/.env`)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Do NOT commit real `.env` files. Use `.env.example`.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kapokris/uber.git
cd uber/uber-main
```

### 2️⃣ Install Dependencies

#### Backend
```bash
cd Backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

### 3️⃣ Run the Application

#### Start Backend
```bash
cd Backend
npm run dev
```

#### Start Frontend
```bash
cd ../frontend
npm run dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:4000  

---

## 🔑 Authentication

- JWT tokens generated on login/signup
- Tokens validated via middleware
- Protected routes for authenticated users
- Separate auth flows for Users and Captains

---

## 🧠 API Routes

### User Auth
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/users/register` | Register user |
| POST | `/users/login` | Login user |
| GET  | `/users/profile` | Get user profile |
| GET  | `/users/logout` | Logout user |

---

### Captain Auth
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/captains/register` | Register captain |
| POST | `/captains/login` | Login captain |
| GET  | `/captains/profile` | Get captain profile |
| GET  | `/captains/logout` | Logout captain |

---

### Rides
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/rides/create` | Create ride request |
| POST | `/rides/confirm` | Captain confirms ride |
| POST | `/rides/start-ride` | Start ride |
| POST | `/rides/end-ride` | End ride |

---

### Maps
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/maps/get-coordinates` | Address to coordinates |
| GET | `/maps/get-distance-time` | Distance & duration |
| GET | `/maps/get-suggestions` | Location suggestions |

---

## 🔄 Real-Time Features

- Socket.IO for live communication
- Ride status updates
- Live captain location tracking
- Instant ride acceptance & completion
