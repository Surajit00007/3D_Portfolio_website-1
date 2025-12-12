# 3D Portfolio Website 🚀

A stunning 3D portfolio website built with React, TypeScript, Three.js, and GSAP featuring an interactive 3D character model and smooth animations.

![Portfolio Preview](https://github.com/Surajit00007/3D_Portfolio_website-1/blob/main/public/images/Portfolio_preview_1.png)

## ✨ Features

- **3D Character Model**: Interactive 3D character with mouse tracking and animations
- **Smooth Animations**: Powered by GSAP for buttery smooth transitions
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, professional design with gradient effects
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Friendly**: Properly structured for search engines

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP, ScrollTrigger
- **Physics**: React Three Cannon, React Three Rapier
- **Styling**: CSS3 with custom properties
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Surajit00007/3d-Portfolio-website.git
   cd 3d-Portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📝 Configuration

### Personal Information

Edit `src/config.ts` to customize:
- Personal details (name, title, description)
- Social media links
- Skills and projects
- Contact information

### 3D Model

The 3D character model is located in `public/models/`:
- `character.glb` - Main 3D model
- `character.enc` - Encrypted model data
- `char_enviorment.hdr` - Environment lighting

### Styling

Customize colors and themes in:
- `src/index.css` - Global styles and CSS variables
- `src/components/styles/` - Component-specific styles

## 🎯 Usage Guide

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Project Structure

```
src/
├── components/          # React components
│   ├── Character/       # 3D character logic
│   ├── styles/          # Component styles
│   └── utils/           # Utility functions
├── config.ts            # Configuration file
├── context/             # React context providers
├── data/                # Static data files
└── utils/               # Global utilities
```

### Customization Guide

#### Adding New Projects

1. Add project data to `src/config.ts` under the `projects` array
2. Add project images to `public/images/`
3. Update the `Work` component if needed

#### Modifying 3D Model

The 3D character is controlled by:
- `src/components/Character/Scene.tsx` - Main scene setup
- `src/components/Character/utils/animationUtils.ts` - Animation logic
- `src/components/Character/utils/mouseUtils.ts` - Mouse interaction

#### Changing Colors

Update CSS variables in `src/index.css`:
```css
:root {
  --accentColor: #7f40ff;
  --textColor: #ffffff;
  --bgColor: #000000;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```
### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Serve the `dist` folder** using any static server:
   ```bash
   npx serve dist
   ```

## 🔧 Troubleshooting

### 3D Model Not Loading

- Check browser console for WebGL errors
- Ensure the model files are in `public/models/`
- Try disabling browser extensions that might block WebGL

### Animations Not Working

- Check if GSAP is properly loaded
- Ensure ScrollTrigger is registered
- Verify the component is mounted when animations trigger

### Performance Issues

- Reduce texture sizes in 3D models
- Optimize images in `public/images/`
- Consider using `React.memo` for heavy components

## 📄 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **GSAP** for amazing animation capabilities
- **Three.js** for 3D graphics
- **React Three Fiber** for React integration
- **Vite** for fast development experience

---

**Built with ❤️ by Surajit Sahoo**
