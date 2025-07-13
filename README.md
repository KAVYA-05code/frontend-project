# 💻 Peer Project Hub – Frontend

This is the **React.js** frontend for the **Peer Project Hub** – a full-stack web application that allows students to share, explore, rate, and review coding projects.

---

## 🚀 Features

- 🔐 Firebase Authentication (Signup/Login with Google)
- 🔎 Explore, search, and filter projects
- 📝 Create, edit, and delete your own projects
- ❤️ Like, 💬 comment, ⭐ save, and ⭐ rate other projects
- 📊 User profile with analytics and favorites
- 📱 Responsive layout with sticky sidebar navigation

---

## 🛠️ Tech Stack

- **React.js** with Hooks & Functional Components
- **React Router** for routing
- **Firebase Auth** for secure login
- **Axios** for API requests
- **Tailwind CSS** for modern UI styling

---

## 📁 Project Structure

client/
├── public/
├── src/
│ ├── pages/ # Route-specific pages (Explore, MyProjects, etc.)
│ ├── utils/ # Axios instance, helpers
│ ├── App.js # Main app layout and routing
│ └── index.js # App entry point
├── .env # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md

---

## 🧪 Pages & Navigation

| Page             | Route             | Description                         |
|------------------|-------------------|-------------------------------------|
| Home             | `/`               | Landing page or redirect to Explore |
| Explore Projects | `/explore`        | View all projects with filters      |
| My Projects      | `/my-projects`    | View & manage your projects         |
| Create Project   | `/create-project` | Post a new project                  |
| Favorites        | `/favorites`      | View saved (hearted) projects       |
| Profile          | `/profile`        | View your liked/saved/posted data   |
| View Details     | `/projects/:id`   | Detailed view with comments, rating|

---
Push to GitHub

Connect repo on https://vercel.com

Set environment variables on Vercel dashboard

Deploy!

📄 License
This project is licensed under the MIT License.

🧑‍💻 Author
Kavya – GitHub Profile



