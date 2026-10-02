# Connie Frances Fumar — Portfolio

Personal portfolio for Connie Frances Fumar, a Junior IT Support and UI/UX Designer from Alcantara, Romblon, Philippines. It presents selected projects, technical and design skills, work history, education, certifications, recognition, and contact details.

## Open the portfolio

On Windows, double-click [`start.bat`](start.bat). It starts the local site and opens it in your browser. Leave the command window open while viewing the site; closing it stops the local server. Double-click `start.bat` again whenever you want to open the portfolio.

Node.js 18.18 or newer must be installed. The launcher installs the project's locked dependencies automatically if they are missing, so you do not need to type an npm command.

## Portfolio assistant

The floating assistant uses a Vercel serverless function and Gemini with Google Search grounding. The API key stays on the server and must never use a `VITE_` variable.

1. Revoke any Gemini key that has been shared publicly, then create a replacement in Google AI Studio.
2. For local use, copy `.env.example` to `.env` and set `GEMINI_API_KEY` to the replacement key. `.env` is ignored by Git. Start the app with `start.bat`; Vite serves the local `/api/chat` endpoint.
3. In Vercel project settings, add `GEMINI_API_KEY` as an Environment Variable for Production and Preview, then redeploy.

The assistant answers general questions, searches the web, and describes Connie's portfolio, tools, and technology stack. It declines source-code and coding requests. Its in-memory request limit helps reduce accidental bursts; set an appropriate Gemini API quota in Google AI Studio for production use.

The assistant API is served at `/api/chat`, so it works when this repository is deployed on Vercel. A static GitHub Pages deployment does not run this server function.

## Portfolio content

- **Projects:** E-Barangay ni Kap, ARCHIVIA, Romantic Music Player, and ResuMay!
- **Experience:** Chowking and Eboy's Catering Services
- **Education:** ACLC College of Tacloban, Tanauan School of Craftsmanship and Home Industries, Alcantara National High School, and Sacred Heart School
- **Credentials:** Google UX Design Professional Certificate and TESDA certifications
- **Contact:** Email, phone, Facebook, and Instagram
- **Documents:** Resume and Google UX Design certificate PDFs in `public/documents/`

Personal details and page content are maintained in `src/data/profile.ts` and `src/data/portfolio.ts`. Images and documents are in `public/`.

## Built with

Vite, React, TypeScript, CSS, Three.js, GSAP, Lenis, React Router, Phosphor icons, and Poppins.

## License

See [LICENSE](LICENSE).
