# WatchAlong 🎬

A modern, collaborative streaming companion application built with React, TypeScript, and Vite. Watch your favorite content together with synchronized playback, real-time features, and an intuitive user experience.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Project Structure](#project-structure)
- [Configuration Files](#configuration-files)
- [Contributing](#contributing)
- [Roadmap & Future Enhancements](#roadmap--future-enhancements)
- [License](#license)

---

## 🎯 Overview

**WatchAlong** is a collaborative media synchronization platform designed to bring people together for a shared viewing experience. Whether it's movies, shows, or live streams, WatchAlong ensures seamless synchronization across all participants with real-time updates, interactive features, and a modern, responsive UI.

### Key Highlights
- ⚡ **Lightning-fast development** with Vite
- 🎨 **Beautiful UI** powered by Tailwind CSS & shadcn/ui
- 📱 **Fully responsive design** for all devices
- 🔄 **Real-time synchronization** capabilities
- 🛡️ **Type-safe development** with TypeScript
- 🚀 **Production-ready** with best practices

---

## ✨ Features

### Current Features (MVP)
- [x] Modern React-based UI framework
- [x] TypeScript for type safety
- [x] Responsive design system
- [x] Component-driven architecture
- [x] Hot Module Replacement (HMR) for fast development

### Planned Features (Coming Soon)
- [ ] User authentication & authorization
- [ ] Room/Session management
- [ ] Synchronized media playback
- [ ] Real-time chat integration
- [ ] User presence indicators
- [ ] Watch history tracking
- [ ] Playlist creation & sharing
- [ ] Dark mode support
- [ ] Mobile app version
- [ ] Premium features & subscriptions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | Latest | UI framework |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Vite** | 5.x | Ultra-fast build tool |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **shadcn/ui** | Latest | Component library |
| **PostCSS** | Latest | CSS processing |
| **ESLint** | Latest | Code quality & linting |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Bun** | Fast JavaScript runtime & package manager |
| **npm** | Package manager (fallback) |
| **TypeScript Compiler** | Type checking |
| **Vite Dev Server** | Local development & HMR |

### Styling
- **Tailwind CSS** with custom theme extensions
- **PostCSS** for advanced CSS processing
- **CSS Modules** ready (via Tailwind)

---

## 📐 Project Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   WatchAlong App                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │   Pages      │  │  Components  │  │  Hooks   │ │
│  │              │  │              │  │          │ │
│  │ - Home       │  │ - Header     │  │ - useSync│ │
│  │ - Room       │  │ - Player     │  │ - useRoom│ │
│  │ - Profile    │  │ - Chat       │  │ - useMen │ │
│  │ - Settings   │  │ - Controls   │  │ - Custom │ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│         │                │                │         │
│         └────────────────┼────────────────┘         │
│                          │                          │
│              ┌───────────▼──────────────┐           │
│              │    App.tsx (Root)        │           │
│              │  (State Management)      │           │
│              └───────────┬──────────────┘           │
│                          │                          │
│              ┌───────────▼──────────────┐           │
│              │      Utilities (lib/)    │           │
│              │  - API helpers           │           │
│              │  - Constants             │           │
│              │  - Validators            │           │
│              │  - Formatters            │           │
│              └───────────┬──────────────┘           │
│                          │                          │
│              ┌───────────▼──────────────┐           │
│              │    Styling (Tailwind)    │           │
│              │  - Global styles         │           │
│              │  - Theme colors          │           │
│              │  - Responsive breakpoints│           │
│              └──────────────────────────┘           │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Architectural Principles

1. **Component-Driven**: Modular, reusable components
2. **Separation of Concerns**: Pages, components, hooks, utilities
3. **Type Safety**: Full TypeScript coverage
4. **DRY (Don't Repeat Yourself)**: Utilities & hooks for shared logic
5. **Responsive First**: Mobile-first design approach
6. **Performance**: Code splitting, lazy loading ready

---

## 📁 Project Structure

```
WatchAlong/
├── src/
│   ├── pages/                    # Page-level components
│   │   ├── HomePage.tsx         # Landing/home page
│   │   ├── RoomPage.tsx         # Watch room
│   │   ├── ProfilePage.tsx      # User profile
│   │   └── SettingsPage.tsx     # Settings
│   │
│   ├── components/               # Reusable components
│   │   ├── common/              # Shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── player/              # Media player components
│   │   │   ├── MediaPlayer.tsx
│   │   │   ├── Controls.tsx
│   │   │   └── ProgressBar.tsx
│   │   │
│   │   ├── room/                # Room-specific components
│   │   │   ├── RoomHeader.tsx
│   │   │   ├── RoomControls.tsx
│   │   │   └── UserList.tsx
│   │   │
│   │   └── chat/                # Chat components
│   │       ├── ChatBox.tsx
│   │       ├── MessageList.tsx
│   │       └── MessageInput.tsx
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useSync.ts           # Synchronization logic
│   │   ├── useRoom.ts           # Room management
│   │   ├── useAuth.ts           # Authentication
│   │   ├── usePlayer.ts         # Media player control
│   │   └── useTheme.ts          # Theme management
│   │
│   ├── lib/                      # Utility functions & helpers
│   │   ├── api.ts               # API client
│   │   ├── constants.ts         # App constants
│   │   ├── validators.ts        # Input validation
│   │   ├���─ formatters.ts        # Data formatting
│   │   └── storage.ts           # Local storage helpers
│   │
│   ├── App.tsx                   # Root component
│   ├── App.css                   # App-level styles
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Global styles
│   └── vite-env.d.ts            # Vite environment types
│
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── images/
│   └── fonts/
│
├── Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── tailwind.config.ts        # Tailwind CSS theme
│   ├── tsconfig.json             # TypeScript base config
│   ├── tsconfig.app.json         # App TypeScript config
│   ├── tsconfig.node.json        # Build tools TS config
│   ├── vite.config.ts            # Vite build config
│   ├── components.json           # shadcn/ui config
│   ├── postcss.config.js         # PostCSS pipeline
│   └── eslint.config.js          # ESLint rules
│
├── .gitignore                    # Git ignore rules
├── index.html                    # HTML entry point
├── package-lock.json             # npm lock file
├── bun.lockb                     # Bun lock file
└── README.md                     # This file
```

---

## ⚙️ Configuration Files Explained

### `package.json`
Defines project dependencies, scripts, and metadata.
```json
{
  "name": "watchalong",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "vite": "^5.x"
  }
}
```

### `vite.config.ts`
Configures Vite for development and production builds with React plugin support.

### `tailwind.config.ts`
Extended Tailwind theme with custom colors, spacing, typography, and animations for WatchAlong branding.

### `tsconfig.json`
TypeScript configuration for strict type checking and ES modules.

### `eslint.config.js`
Code quality rules for consistent coding standards across the project.

---

## 🚀 Installation

### Prerequisites
- **Node.js** 18.x or higher
- **Bun** 1.x (recommended) OR **npm** 9.x+
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/Aditya24Kashyap/WatchAlong.git
cd WatchAlong
```

### Step 2: Install Dependencies

**Using Bun (Recommended - Faster)**
```bash
bun install
```

**Using npm (Alternative)**
```bash
npm install
```

### Step 3: Verify Installation
```bash
npm run lint
```

---

## 💻 Development

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

#### Features
- 🔥 **Hot Module Replacement (HMR)**: Changes reflect instantly
- 📊 **Fast Refresh**: Preserves component state
- 🐛 **Source Maps**: Easy debugging

### Code Quality

**Run ESLint**
```bash
npm run lint
```

**Fix Linting Issues**
```bash
npm run lint:fix
```

**Type Check**
```bash
npx tsc --noEmit
```

### Adding New Components

#### 1. Create Component File
```bash
# Create a new component in src/components/
touch src/components/MyComponent.tsx
```

#### 2. Component Template
```typescript
import { FC } from 'react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <button onClick={onClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Click me
      </button>
    </div>
  );
};

export default MyComponent;
```

#### 3. Import & Use
```typescript
import MyComponent from '@/components/MyComponent';

export default function App() {
  return <MyComponent title="Hello World" />;
}
```

### Adding Custom Hooks

```bash
touch src/hooks/useMyHook.ts
```

```typescript
import { useState, useCallback } from 'react';

export const useMyHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, setValue, reset };
};
```

---

## 🏗️ Build & Deployment

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` directory.

#### Build Process
1. TypeScript compilation & type checking
2. Vite builds optimized bundles
3. CSS is minified & tree-shaken
4. JavaScript is minified & code-split

### Preview Production Build
```bash
npm run preview
```

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

#### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

---

## 📦 Dependencies Overview

### Core Dependencies
- **react**: UI library
- **react-dom**: React rendering engine

### UI & Styling
- **tailwindcss**: Utility-first CSS
- **postcss**: CSS processing
- **shadcn/ui**: Pre-built components

### Development
- **typescript**: Type safety
- **vite**: Build tool
- **eslint**: Code quality
- **@types/react**: TypeScript definitions

### Optional (To Add)
```json
{
  "react-router-dom": "^6.x",     // Routing
  "zustand": "^4.x",              // State management
  "axios": "^1.x",                // HTTP client
  "socket.io-client": "^4.x",     // Real-time communication
  "date-fns": "^2.x",             // Date utilities
  "zod": "^3.x"                   // Schema validation
}
```

---

## 🎨 Styling Guide

### Tailwind CSS Utilities
```tsx
// Colors
<div className="bg-blue-500 text-white">

// Spacing
<div className="p-4 m-2 mt-8">

// Layout
<div className="flex justify-center items-center">

// Responsive
<div className="text-sm md:text-base lg:text-lg">

// Dark Mode
<div className="dark:bg-gray-800 dark:text-white">
```

### Custom Theme Configuration
Edit `tailwind.config.ts` to customize:
- Color palette
- Typography
- Spacing scale
- Breakpoints
- Animations

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# Third-party Services
VITE_SOCKET_IO_URL=http://localhost:3001
```

Access in your code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🧪 Testing (Ready to Implement)

### Recommended Testing Stack
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Example Test
```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders with title', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Run Tests
```bash
npm run test
```

---

## 🐛 Debugging

### Browser DevTools
- React Developer Tools (Chrome Extension)
- Redux DevTools (if using Redux)
- Network tab for API debugging

### VS Code Extensions
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "wix.vscode-import-cost"
  ]
}
```



---

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and descriptive
- Reference issues in commit messages

### Code Standards
- **TypeScript**: Strict mode enabled
- **Formatting**: Use Prettier
- **Linting**: Pass ESLint
- **Comments**: JSDoc for public APIs
- **Testing**: Minimum 80% coverage goal

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤖 Maintenance

### Regular Tasks
- **Weekly**: Check for security updates
- **Monthly**: Update dependencies
- **Quarterly**: Review architecture
- **Annually**: Plan new features

### Performance Monitoring
- Monitor Core Web Vitals
- Track error rates
- Analyze user behavior
- Optimize bundle size

---


### Community
- ⭐ Star the repository
- 🐦 Follow on Twitter
- 💼 Connect on LinkedIn

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Language** | TypeScript (97.4%) |
| **Repository Size** | 376 KB |
| **Last Updated** | Recently |
| **Node Version** | 18.x+ |
| **Package Manager** | Bun/npm |

---

## 🎓 Learning Resources

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React with TypeScript](https://react-typescript-cheatsheet.netlify.app/)

### React
- [React Documentation](https://react.dev)
- [React Patterns](https://www.patterns.dev/posts/react-patterns/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com)
- [Tailwind UI Components](https://tailwindui.com)

### Vite
- [Vite Guide](https://vitejs.dev)
- [Vite Plugin Development](https://vitejs.dev/guide/api-plugin.html)

---

## 🎯 Quick Reference

### Useful Commands
```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Check code quality
npm run lint:fix         # Fix linting issues

# Type Checking
npx tsc --noEmit         # Type check without emitting
npx tsc --watch          # Watch mode

# Dependencies
npm outdated             # Check for updates
npm audit                # Security audit
npm update               # Update dependencies
```



