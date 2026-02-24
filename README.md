# Student Group Projects Platform

A React-based web app for managing student group projects: task assignments, progress tracking, and collaboration. Supports **Admin (Teacher)** and **Student** roles.

## Features

- **Admin (Teacher):** Change teacher name, add/edit students, add projects, assign any project to any student on the spot, monitor progress, mark submissions (in progress / submitted / reviewed).
- **Student:** View assigned projects, add tasks, track milestones (progress bar), submit group work.

## Run locally (required to see the app)

**You must use the dev server.** Do not double‑click `index.html` (that will not work).

1. Open **Command Prompt** or **PowerShell**.
2. Go to the project folder:
   ```bash
   cd c:\Users\hamsa\OneDrive\Desktop\student
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
4. In the terminal you should see something like:
   ```
   ➜  Local:   http://localhost:5173/
   ```
5. **Open that link in your browser** (e.g. type `http://localhost:5173` in the address bar).

You should then see the **Student Group Projects** home page with “Teacher / Admin” and student buttons. If the page stays on “Loading…” or is blank, you are likely opening the file directly; use the URL from step 4 instead.

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Deploy (get a live link)

### Option 1: Vercel (recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. From project folder: `vercel`
3. Follow prompts; you’ll get a URL like `https://your-project.vercel.app`

### Option 2: Netlify

1. Run `npm run build`
2. Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop) or connect the repo in Netlify.

All data is stored in React state (no backend). Refresh clears data; for persistence you’d add a backend or localStorage.
