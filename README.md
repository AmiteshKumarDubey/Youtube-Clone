# 🔴 YouTube Clone — Full-Stack Web Application

A modern, responsive, full-stack **YouTube Clone** built with **React 18, Vite, Node.js, Express, MongoDB, and Tailwind CSS**. Features authentic YouTube dark-mode aesthetics, vertical Shorts player, user authentication, Watch History, Watch Later, Liked Videos, custom playlists, channel pages, interactive comments, and video upload capabilities.

---

## ✨ Features Implemented

### 🔐 Day 1: Authentication & User Profile System
- **JWT & Auth System**: Register and sign in with email/password or 1-Click Demo Login.
- **User Profile Menu**: Dynamic Navbar profile dropdown menu with avatar badge and direct links to History, Watch Later, Liked Videos, and Sign Out.
- **Resilient Storage**: Seamless authentication persistence via `localStorage` with node backend API fallback.

### 🎬 Day 2: YouTube Shorts Experience
- **9:16 Vertical Reel Player**: Full vertical video player with touch/click play-pause, smooth swipe navigation, and keyboard arrow key controls (`Up`, `Down`, `Space`).
- **Interactive Action Sidebar**: Like button with real-time counter increment, dislike toggle, share-to-clipboard button with toast notifications, and rotating audio vinyl disc animation.
- **Comments Slide-Over Drawer**: Interactive drawer to read and post comments live on short reels.

### 🕒 Day 3: Watch History & Watch Later System
- **Real-Time Watch Tracking**: Automatically records watched videos upon opening video pages.
- **Searchable History Page**: Filter watch history by title or channel, pause history recording, or clear history.
- **Quick Watch Later**: Hovering over any video card presents a one-click clock icon to save/remove videos from Watch Later.
- **Play All Playlist**: Binge-watch saved Watch Later videos with a single click.

### 🔴 Day 4: Subscriptions Feed & Channel Pages
- **Subscriptions Avatars Bar**: Scrollable top channel bar displaying followed channels with online/unread indicators.
- **Dedicated Channel Pages (`/channel/:name`)**: Full cover banner, channel avatar badge, verified badge, handle, total subscribers, and channel tabs (**Videos**, **Shorts**, **Playlists**, **About**).
- **Subscribe Button**: Real-time subscriber counter increment/decrement upon subscribing.

### ❤️ Day 5: Liked Videos & Custom Playlists
- **Liked Videos Collection**: Dedicated page listing all user-liked videos with one-click unlike removal.
- **Create Playlist Modal**: Interactive modal dialog allowing users to create custom playlists with title, description, and Public / Private settings.
- **Playlists Management**: View, play, and delete custom user playlists.

### 📤 Day 6: Video Upload & Interactive Comments API
- **Video Upload Page (`/upload`)**: Publish new videos with title, description, category selector, thumbnail live image preview, and autofill sample MP4 preset.
- **Interactive Comments API**: Full commenting section on video pages with real-time comment submission, comment like counter, and comment deletion.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router DOM v6, React Icons, Axios, CSS3 / Tailwind CSS.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS, CORS, Dotenv.
- **Data Persistence**: MongoDB Atlas URI / LocalStorage fallback for instant Vercel demo deployment.

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/AmiteshKumarDubey/Youtube-Clone.git
cd Youtube-Clone
```

### 2. Install Dependencies
```bash
# Install root, frontend, and backend dependencies
cd frontend && npm install
cd ../Backend && npm install
```

### 3. Run the Development Servers
```bash
# Start Frontend (Vite)
cd frontend
npm run dev

# Start Backend (Node/Nodemon)
cd Backend
npm run dev
```
- Open `http://localhost:5173` in your browser to explore the YouTube Clone!

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
