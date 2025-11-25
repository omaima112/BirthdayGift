# BirthdayGift

This is a personalized Vite + React site (a birthday gift). It includes small interactive pages, a sticky audio player, and a handwritten-style letter modal.

How to run locally

1. Install dependencies:

```powershell
cd "C:\Users\Nexgen\Desktop\Personalized Website"
npm ci
```

2. Start the dev server (LAN accessible):

```powershell
npm run dev -- --host 0.0.0.0
```

3. Build for production:

```powershell
npm run build
```

Deploying

This repository includes a GitHub Actions workflow that builds the project and publishes the `dist/` folder to GitHub Pages on pushes to the `main` branch.

If you prefer Vercel or Netlify, connect the repository and set the build command to `npm run build` and the publish directory to `dist`.

Notes

- The site serves static assets from `public/`. If you add an audio file, place it in `public/audio/` and reference it as `/audio/your-file.mp3`.
- For quick testing on your phone, run the dev server with `--host` and open the LAN URL shown by Vite.

Enjoy! 🎉
