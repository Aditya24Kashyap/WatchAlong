---

## 📁 Project Structure


```
WatchAlong/
│
├── src/                     # Application source code
│   ├── components/          # Reusable React components
│   ├── pages/               # Page-level components (routes/views)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries and helpers
│   ├── App.tsx              # Root React component
│   ├── App.css              # Component-level styles
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Vite environment type definitions
│
├── public/                  # Static assets (images, icons, etc.)
│
├── config/                  # Project configuration files
│   ├── package.json         # Dependencies and scripts
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   ├── tsconfig.json        # Base TypeScript configuration
│   ├── tsconfig.app.json    # App-specific TypeScript config
│   ├── tsconfig.node.json   # Node/build tools TS config
│   ├── vite.config.ts       # Vite build configuration
│   ├── components.json      # shadcn/ui configuration
│   ├── postcss.config.js    # PostCSS pipeline configuration
│   └── eslint.config.js     # ESLint rules
│
├── index.html               # Main HTML entry point
├── .gitignore               # Git ignored files
│
└── locks/                   # Dependency lock files
    ├── package-lock.json    # npm dependency lock
    └── bun.lockb            # Bun dependency lock
```

