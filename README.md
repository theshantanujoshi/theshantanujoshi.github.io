# My Portfolio - The Re-up

> *The last one was a disaster, so here we are.*

A brutalist, high-performance, kinematics-driven personal portfolio built to showcase a career spanning Generative AI, Quantitative Research, and Frontend Architecture. Designed with extreme attention to scroll physics, layout typography, and interactive aesthetic depth.

## Tech Stack

* **Core**: React 19 + Vite
* **Styling**: TailwindCSS 4 (Utility-first, brutalist design language)
* **Animation**: `motion` (Framer Motion) for fluid enter/exit transitions and physics-based scroll hijacking
* **3D Canvas**: `ogl` for the interactive WebGL line-wave background on the landing page
* **Icons**: `lucide-react` + Custom SVGs

## Architecture & Features

This isn't a standard top-to-bottom website. It's a structured sequence of interconnected spatial environments:

* **Landing Experience**: Features a custom WebGL line-wave interactive canvas (`<LineWaves />`) layered behind a brutally minimal typographic grid and infinite-scroll ticker tapes.
* **Timeline (Experience)**: A chronologically reversed resume mapping out ground operations, AI engineering, and academic progression.
* **Spatial Project Carousels**: The `Projects` page hijacks the native vertical scroll and transforms it into a smooth, spring-damped horizontal carousel, meticulously calibrated to snap one slide per mouse wheel notch using `snap-mandatory` mechanics.
* **The Gallery**: A dense, 50-image visual study grid. The images are strictly cropped to a `1:1` aspect ratio and hit with an aggressive grayscale filter that dynamically reveals the original, vibrant, web-optimized colors on hover.
* **Network**: The terminal point. Clean links, subtle hover interactions, and a custom-integrated Discord SVG.

## Local Setup

1. **Clone the repo**
```bash
git clone https://github.com/theshantanujoshi/portfolio-v2.git
cd portfolio-v2
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the dev server**
```bash
npm run dev
```

## Performance Optimizations

* **Image Compression**: Raw 30MB+ photography assets have been aggressively downsampled to a maximum of `1200px` at `85%` JPEG quality via local Python scripts to preserve retina-crisp visuals while maintaining a negligible network payload.
* **Scroll Physics**: Uses native CSS `scroll-snap-type: y mandatory` combined with React-driven offset calculations to enforce strict alignment without sacrificing browser-native frame rates.
* **Dependency Isolation**: Employs raw WebGL via `ogl` instead of heavier wrappers (like Three.js or R3F) to keep the landing page animation lightweight.
