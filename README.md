# 🚀 LinkedIn Creator Studio

A premium, offline-first web application designed for developer-creators to craft high-impact LinkedIn slide carousels, technical cheat sheets, code cards, and visual infographics. 

Generate beautiful, high-quality, and readable content that captures attention in the feed, with built-in protections against LinkedIn's image compression algorithm.

---

## ✨ Key Features

### 1. 📄 LinkedIn Slides Carousel Builder
* Create multi-page swipeable slide decks.
* **Branding Presets**: Configure company logo, brand handle (`@username`), custom company names, and footer brand labels.
* **Rich Layout Options**: Select between Title, Content, Code Syntax Highlight, or Call-to-Action slide structures.
* **Rich Text Customization**: Format code snippets and apply highlight colors to important words.

### 2. 📊 Developer Cheat Sheets & Infographics
* **Continuous Vertical Poster**: Ideal for long-form reference sheets, cheat sheets, and architecture diagrams.
* **Cheat Sheet Slides Carousel**: Break cheat sheets down into structured swipeable slides.
* **Pre-loaded Templates**: High-quality preloaded mock data templates for React, Python, Git, JavaScript, Java, Go, Docker, CSS Grid, and SQL.

### 3. 🖼️ Aspect Ratio & Feed Simulator
* Switch between **Square (1:1)**, **Portrait (4:5)**, and **Landscape (16:9)** aspect ratios.
* **Live Feed Preview Simulator**: A real-time preview showing exactly how your post layout and text snippet will look inside a LinkedIn feed container on both desktop and mobile.
* **Smart Performance Recommendations**: Automatic engagement tips based on your selected aspect ratio.

### 4. 🎨 Design Engine & Custom Colors
* Multi-font selection configured with premium Google Fonts (Outfit, Inter, Playfair, JetBrains Mono, Fira Code).
* Curated dark-theme gradients and aesthetics (Obsidian, Cyberpunk, Forest Emerald, Golden Amber, Deep Indigo).
* **"Surprise Me" 🎲 Button**: Instant randomized style generator to test layout and palette variations in one click.

### 5. 🛡️ Anti-Compression Exporter
* **PDF Document Exporter**: (Recommended) Export carousels as high-res PDF files. Uploading PDFs to LinkedIn as "Documents" bypasses image compression completely, keeping text vector-crisp on all screen resolutions.
* **Optimized PNG Exporter**: Exports image slides at a fine-tuned **1.5x scale (1620px width)**. This preserves high-DPI readability while keeping slide files under the 3MB threshold to prevent LinkedIn's server-side image compression from blurring text.

---

## 🛠️ Local Development Setup

### Prerequisites
Make sure you have Node.js (version 16 or higher) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ashler24/linkedin-creator-studio.git
   cd linkedin-creator-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the address shown in your console (usually `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```
   This will compile the optimized web app into the `dist/` directory.

---

## 🧰 Technology Stack
* **Framework**: React 18 with Vite
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Client-side Rendering Engine**: html2canvas
* **Document Compilation**: jsPDF
