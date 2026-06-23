# QuickBlog

QuickBlog is a full-stack blogging platform with a public blog experience and a protected admin dashboard for creating, publishing, managing, and moderating blog content. It uses a React + Vite frontend, an Express backend, MongoDB for persistence, ImageKit for blog thumbnails, and Gemini AI for blog content generation.

## ✨ Features

- Public home page with blog listing
- Blog search by title or category
- Category filtering for `Technology`, `Startup`, `Lifestyle`, and `Finance`
- Individual blog detail pages
- Rich-text blog content rendering
- Comment submission on blog posts
- Approved comments shown publicly
- Admin login using email and password credentials
- JWT-protected admin routes
- Admin dashboard with total blogs, comments, drafts, and latest blogs
- Add blog posts with title, subtitle, category, thumbnail image, rich-text description, and publish status
- Generate blog content with Gemini AI from the blog title
- Upload and optimize blog thumbnails through ImageKit
- Publish and unpublish blog posts
- Delete blog posts and associated comments
- View all blogs in the admin panel
- View, approve, filter, and delete comments in the admin panel
- Toast notifications for user feedback
- Responsive UI built with Tailwind CSS
- Vercel deployment configuration for both client and server

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite 7
- Tailwind CSS 4
- React Router DOM
- Axios
- Quill rich-text editor
- Marked
- Moment.js
- Motion
- React Hot Toast

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Token authentication
- Multer for file uploads
- ImageKit for image hosting and optimization
- Google Gemini via `@google/genai`
- CORS
- Dotenv

### Database

- MongoDB
- Database name used by the server: `quickblog`
- Main collections/models:
  - `blog`
  - `Comment`

## 📁 Project Structure

```text
QuickBlog/
+-- .gitignore
+-- README.md
+-- client/
|   +-- README.md
|   +-- eslint.config.js
|   +-- index.html
|   +-- package.json
|   +-- vite.config.js
|   +-- vercel.json
|   +-- public/
|   |   +-- favicon.svg
|   |   +-- vite.svg
|   +-- src/
|       +-- App.jsx
|       +-- index.css
|       +-- main.jsx
|       +-- assets/
|       |   +-- assets.js
|       |   +-- blog images
|       |   +-- icons
|       |   +-- logos
|       +-- components/
|       |   +-- BlogCard.jsx
|       |   +-- BlogList.jsx
|       |   +-- Footer.jsx
|       |   +-- Header.jsx
|       |   +-- Loader.jsx
|       |   +-- Navbar.jsx
|       |   +-- Newsletter.jsx
|       |   +-- admin/
|       |       +-- BlogTableItem.jsx
|       |       +-- CommentTableItem.jsx
|       |       +-- Login.jsx
|       |       +-- Sidebar.jsx
|       +-- context/
|       |   +-- AppContext.jsx
|       +-- pages/
|           +-- Blog.jsx
|           +-- Home.jsx
|           +-- admin/
|               +-- AddBlog.jsx
|               +-- Comments.jsx
|               +-- Dashboard.jsx
|               +-- Layout.jsx
|               +-- ListBlog.jsx
+-- server/
    +-- package.json
    +-- server.js
    +-- vercel.json
    +-- configs/
    |   +-- db.js
    |   +-- gemini.js
    |   +-- imageKit.js
    +-- controllers/
    |   +-- adminController.js
    |   +-- blogController.js
    +-- middleware/
    |   +-- auth.js
    |   +-- multer.js
    +-- models/
    |   +-- Blog.js
    |   +-- Comment.js
    +-- routes/
        +-- adminRoutes.js
        +-- blogRoutes.js
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/AnkitKumar61/QuickBlog.git
cd QuickBlog
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
GEMINI_API_KEY=your_gemini_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
PORT=3000
```

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string. The server appends `/quickblog` to this value. |
| `JWT_SECRET` | Secret key used to sign and verify admin JWT tokens. |
| `ADMIN_EMAIL` | Email address required for admin login. |
| `ADMIN_PASSWORD` | Password required for admin login. |
| `GEMINI_API_KEY` | API key used by `@google/genai` for Gemini content generation. |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key for image uploads. |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key for authenticated uploads. |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint used to generate optimized image URLs. |
| `PORT` | Optional backend port. Defaults to `3000` if not provided. |

Create a `.env` file inside the `client` folder:

```env
VITE_BASE_URL=http://localhost:3000
```

| Variable | Description |
| --- | --- |
| `VITE_BASE_URL` | Backend API base URL used by Axios in the React app. |

## 🚀 Running the Project

Start the backend server:

```bash
cd server
npm run server
```

The backend runs on `http://localhost:3000` by default.

Start the frontend development server:

```bash
cd client
npm run dev
```

The Vite app will start on the local URL shown in the terminal, commonly `http://localhost:5173`.

### Available Scripts

#### Client

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the frontend for production. |
| `npm run lint` | Runs ESLint. |
| `npm run preview` | Serves the production build locally. |

#### Server

| Script | Description |
| --- | --- |
| `npm run server` | Starts the backend with Nodemon. |
| `npm start` | Starts the backend with Node.js. |

## 📡 API Endpoints

Protected endpoints require the JWT token in the `Authorization` request header.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Health check endpoint that returns `API is working`. |
| `POST` | `/api/admin/login` | Authenticates admin credentials and returns a JWT token. |
| `GET` | `/api/admin/blogs` | Returns all blogs for the admin, including published and unpublished posts. |
| `GET` | `/api/admin/comments` | Returns all comments with populated blog data. |
| `POST` | `/api/admin/delete-comment` | Deletes a comment by ID. |
| `POST` | `/api/admin/approve-comment` | Approves a comment by ID. |
| `GET` | `/api/admin/dashboard` | Returns dashboard stats and recent blogs. |
| `POST` | `/api/blog/add` | Creates a blog post with uploaded thumbnail image. |
| `GET` | `/api/blog/all` | Returns all published blogs. |
| `GET` | `/api/blog/:blogId` | Returns a single blog by ID. |
| `POST` | `/api/blog/delete` | Deletes a blog by ID and removes its comments. |
| `POST` | `/api/blog/toggle-publish` | Toggles a blog between published and unpublished states. |
| `POST` | `/api/blog/add-comment` | Adds a new comment for review. |
| `POST` | `/api/blog/comments` | Returns approved comments for a blog. |
| `POST` | `/api/blog/generate` | Generates blog content from a prompt using Gemini AI. |

## 🖼️ Screenshots

The project includes image assets in `client/src/assets/`, including blog thumbnails, icons, logos, and background images. Screenshots for the README can be added in a dedicated folder such as:

```text
client/src/assets/screenshots/
```

or

```text
screenshots/
```

Example Markdown:

```md
![QuickBlog Home](screenshots/home.png)
```

## 🔮 Future Improvements

- Add user-facing validation and loading states for more forms.
- Connect the newsletter form to a backend endpoint or email service.
- Add edit support for existing blog posts.
- Add pagination for blog lists and comments.
- Add role-based admin permissions if multiple admins are needed.
- Add refresh-token based authentication or token expiry handling.
- Add automated tests for controllers, routes, and key React workflows.
- Add image cleanup when a blog is deleted.
- Improve accessibility for buttons, forms, and admin tables.
- Add production logging and centralized error handling.

## 👤 Author

**Name:** Ankit Kumar  
**GitHub:** [https://github.com/AnkitKumar61](https://github.com/AnkitKumar61)
