# WhatsApp Web Clone - Full Stack Developer Evaluation Task

## Overview
This project is a **WhatsApp Web Clone** built as part of a Full Stack Developer evaluation task.
It includes a complete backend with webhook payload processing, APIs for chat and message data, and a responsive frontend interface built in React.

---

## Features

### Backend (Node.js + Express + MongoDB)
- Webhook payload processor to insert/update messages in MongoDB.
- APIs to:
  - Get all conversations grouped by `wa_id`.
  - Get messages for a selected chat.
  - Send new messages (demo feature).
  - Update message status.
- MongoDB Atlas integration.
- Socket.IO for real-time updates.

### Frontend (React + Tailwind CSS)
- Responsive chat interface.
- Left sidebar with chat list and last message preview.
- Right chat window with:
  - Sent/received message bubbles.
  - Status icons (sent, delivered, read).
  - Date separators.
- Send message input & button.
- Mobile & desktop responsive design.

---

## Tech Stack
**Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO  
**Frontend:** React, Tailwind CSS, Axios  
**Database:** MongoDB Atlas  
**Deployment (Planned):** Render (Backend), Vercel (Frontend)

---

## Folder Structure

```
backend/
  ├── config/
  │   └── db.js
  ├── controllers/
  │   └── messageController.js
  ├── models/
  │   └── Message.js
  ├── routes/
  │   └── payloadRoutes.js
  ├── scripts/
  │   └── importPayloads.js
  ├── app.js
  ├── server.js
  └── package.json

frontend/
  ├── src/
  │   ├── components/
  │   │   ├── Sidebar.js
  │   │   ├── ChatWindow.js
  │   │   ├── MessageBubble.js
  │   │   └── ChatInput.js
  │   ├── pages/
  │   │   └── Home.js
  │   ├── services/
  │   │   └── api.js
  │   └── App.js
  ├── public/
  └── package.json
```

---

## API Endpoints

### **POST** `/api/messages/process`
Process and insert a new message payload.

### **PATCH** `/api/messages/status`
Update the status of a message by `meta_msg_id`.

### **GET** `/api/messages/conversations`
Fetch all conversations grouped by `wa_id`.

### **GET** `/api/messages/:wa_id`
Fetch all messages for a given `wa_id`.

### **POST** `/api/messages/send`
Send a new message.

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/RoopTeja04/whats_App_Clone.git
cd project-folder
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create `.env` file:
```
MONGO_URI="mongodb+srv://LMS:LMS@cluster0.ptaoj2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT=5000
```
Run backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## Deployment Plan
- **Backend:** Deploy to Render with MongoDB Atlas connection.
- **Frontend:** Deploy to Vercel with backend API base URL configured.
- **Environment Variables:** Ensure `.env` files are configured for both.

---

## Author
Developed by Roop Teja as part of the Full Stack Developer evaluation task.
