# Edina Realty Website

A pixel-perfect, responsive recreation of the Edina Realty real estate website with live editing capabilities.

## Quick Start

### 1. Start the Development Server

Run this command in your terminal:

```bash
npm run dev
```

Or if you don't have npm, you can use:

```bash
npx serve . -l 3000
```

### 2. View Your Website

Open your browser and go to: **http://localhost:3000**

### 3. Make Changes On The Fly

1. **Edit HTML**: Open `index.html` and modify the content
2. **Edit CSS**: Open `styles.css` and change colors, fonts, spacing, etc.
3. **Edit JavaScript**: Open `script.js` to add interactivity

Simply save your changes and refresh your browser to see them instantly!

## Project Structure

```
website-project/
├── index.html      # Main HTML structure
├── styles.css      # All your styles and layout
├── script.js       # JavaScript functionality
├── package.json    # Project configuration
└── README.md       # This file
```

## Customization Guide

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary color */
    --text-color: #1f2937;       /* Text color */
    --bg-color: #ffffff;         /* Background color */
}
```

### Adding New Sections

1. Add a new section in `index.html`:
```html
<section id="your-section" class="section">
    <div class="container">
        <h2>Your Section Title</h2>
        <p>Your content here</p>
    </div>
</section>
```

2. Add a navigation link in the header if needed

### Tips for Live Editing

- Keep the terminal running with `npm run dev`
- Keep your browser open at `http://localhost:3000`
- Make changes in Cursor and save (Cmd+S / Ctrl+S)
- Refresh your browser (or use auto-refresh if available) to see changes

## Features

- ✅ Pixel-perfect Edina Realty design recreation
- ✅ Responsive layout for all devices
- ✅ Header navigation with mobile menu
- ✅ Hero section with property search
- ✅ Service blocks (Finance, Buy, Sell)
- ✅ Local experts section with guide book
- ✅ Interactive property listings carousel
- ✅ Download app section with MyAtlas
- ✅ Neighborhood exploration sections
- ✅ Comprehensive footer with all links
- ✅ Smooth scrolling and animations
- ✅ Mobile-friendly design

## Need Help?

Just ask me to make changes! I can:
- Modify layouts
- Change colors and styling
- Add new sections
- Implement new features
- Fix any issues

Happy coding! 🚀

