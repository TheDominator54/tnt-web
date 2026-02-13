# TNT Fitness — Next steps

Use this list to track what's left to do. Each item has a **Location** (where in the project to do it) and space for **Your directions / notes**.

---

## 1. Set PushPress tour signup URL

- **Location:** `index.html` — opening `<body>` tag (around line 16).  
  Set the attribute: `data-pushpress-signup-url="YOUR_FULL_URL"`.

- **Your directions / notes:**



---

## 2. Add testimonial quotes (Charlene, Pam, Josh D)

- **Location:** `index.html` — section `#testimonials`, inside the three `<blockquote class="testimonial">` blocks.  
  Replace `[Testimonial from Charlene]` (and Pam, Josh D) with the real quotes. Update `<cite>` if you want different names/attribution.

- **Your directions / notes:**



---

## 3. Add hero / marketing photos

- **Location:** Create an `images/` (or `assets/`) folder in the project root. Add image files there.  
  Then in `index.html`: hero section (`.hero` or `.hero-bg`), and/or new sections/elements where you want exterior, interior, or action shots.  
  (Image tags are not in the template yet — add `<img>` where you want each photo and point `src` to the file in `images/`.)

- **Your directions / notes:**



---

## 4. Add photo: exterior gym shot

- **Location:** Project folder (e.g. `images/exterior.jpg`) and the spot in `index.html` or `styles.css` where you want it (e.g. hero background or a new "Visit us" block).

- **Your directions / notes:**



---

## 5. Add photo: interior wide shot

- **Location:** Project folder (e.g. `images/interior.jpg`) and the spot in `index.html` you choose for the interior shot.

- **Your directions / notes:**



---

## 6. Add photos: action training + coaching

- **Location:** Project folder (e.g. `images/action.jpg`, `images/coaching.jpg`) and the sections in `index.html` where you want action or coaching photos (e.g. Training block, About block).

- **Your directions / notes:**



---

## 7. Add owner headshot

- **Location:** Project folder (e.g. `images/eli-headshot.jpg`) and the About section in `index.html` (section `#about`, inside `.about-content` or above it). Add an `<img>` and optional caption.

- **Your directions / notes:**



---

## 8. Favicon and social share image

- **Location:**  
  - Favicon: add a `favicon.ico` (or `.png`) in the project root; in `index.html` `<head>` add:  
    `<link rel="icon" href="favicon.ico" type="image/x-icon" />`.  
  - Social image: add an image (e.g. `images/og-image.jpg`), then in `index.html` `<head>` add:  
    `<meta property="og:image" content="FULL_URL_OR_PATH" />`.

- **Your directions / notes:**



---

## 9. Hosting and live URL

- **Location:** N/A (external). After you pick a host (e.g. Netlify, Vercel, your own server), upload the project and set the live URL.  
  Then in `index.html` `<head>` you can add a canonical tag:  
  `<link rel="canonical" href="https://yourdomain.com/" />`  
  and update `og:image` to the full image URL if needed.

- **Your directions / notes:**



---

## 10. Other / custom tasks

- **Location:**

- **Your directions / notes:**



---

*Copy the sections above for any extra tasks. Keep **Location** and **Your directions / notes** so you always know where to work and what to do.*
