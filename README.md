# 💌 Ivan & Aileen Wedding Invitation

Online wedding invitation for Ivan & Aileen · December 20, 2026.

## 🚀 Local Development

Simply double-click `index.html` or run a local web server:

```bash
# Optional local server
npx serve .
# or
python -m http.server 8080
```

## 🌐 Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `wedding` or `ivan-aileen`).
2. Push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In GitHub, go to **Settings** → **Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. In 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/<repo-name>/`

## 💌 Personalised Guest Links

Add `?to=Guest+Name` to the URL:
```
https://<your-username>.github.io/<repo-name>/?to=Daniel+Landicho
```

## 📝 RSVP Responses

RSVPs post directly to the connected Google Sheet via Google Apps Script (`apps-script.gs`).
