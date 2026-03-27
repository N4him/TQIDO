// resources/js/app.tsx
import '../js/css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'TQido';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const parts = name.split('/');

        // Soporta:
        // auth/login -> ./features/auth/pages/login.tsx
        // dashboard/carer/dashboard -> ./features/dashboard/carer/pages/dashboard.tsx
        // dashboard/customer/dashboard -> ./features/dashboard/customer/pages/dashboard.tsx
        if (parts.length >= 2) {
            const [feature, ...rest] = parts;

            const page = rest[rest.length - 1];
            const subPath = rest.slice(0, -1).join('/');

            const path = subPath
                ? `./features/${feature}/${subPath}/pages/${page}.tsx`
                : `./features/${feature}/pages/${page}.tsx`;

            return resolvePageComponent(
                path,
                import.meta.glob('./features/**/*.tsx'),
            );
        }

        // Página raíz
        return resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
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