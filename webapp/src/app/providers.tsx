'use client';

import { ConvexProvider } from 'convex/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ConvexProvider>{children}</ConvexProvider>
    );
}