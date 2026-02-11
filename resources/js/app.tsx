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
        // name viene como "landing_page/Home" desde la ruta
        // Necesitamos transformarlo a la ruta correcta del archivo
        const parts = name.split('/');
        const feature = parts[0]; // "landing_page"
        const page = parts[1]; // "Home"
        
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