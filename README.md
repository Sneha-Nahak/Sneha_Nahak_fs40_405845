# Sneha_Nahak_fs40_405845

This project is a **YouTube Clone Web Application** that allows users to:
- Search for YouTube videos
- View video details
- See related suggestions

It uses **HTML**, **CSS**, **JavaScript**, and the **YouTube Data API v3**.

---

## 🔧 How to Run the Project Locally

1. **Clone the Repository:**

```bash
git clone https://github.com/Sneha-Nahak/Sneha_Nahak_fs40_405845.git
cd sneha_nahak_12345678
```
Open index.html in your browser:

You can double-click the file or use Live Server (VSCode extension).

💡 No build or server is required — it's a pure frontend project.

🧠 How I Implemented the YouTube API
Used YouTube Data API v3 to fetch videos based on user search queries.

Used fetch() with the following endpoint:

bash
Copy
Edit
https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&part=snippet&type=video&q=SEARCH_QUERY
Parsed the API response to dynamically:

Show video thumbnails, titles, and channel names

Load a selected video in a player view

API key was securely stored in a .env (not committed to GitHub), but for local testing you may place it directly in script.js.

📦 Files Included
index.html – Main structure of the site

style.css – Responsive and modern layout styling

script.js – Logic for handling search, video load, and API calls

assets/ – Icons, logos, or other static files
