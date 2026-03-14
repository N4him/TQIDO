// resources/js/app.tsx
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'TQido';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
    // Páginas de auth y otras fuera de features
    const directPages = import.meta.glob('./pages/**/*.tsx');
    if (directPages[`./pages/${name}.tsx`]) {
        return resolvePageComponent(
            `./pages/${name}.tsx`,
            directPages,
        );
    }

    // Páginas de features (ej: "landing_page/Home")
    const parts = name.split('/');
    const feature = parts[0];
    const page = parts[1];

    return resolvePageComponent(
        `./features/${feature}/pages/${page}.tsx`,
        import.meta.glob('./features/**/pages/*.tsx'),
    );
},
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();