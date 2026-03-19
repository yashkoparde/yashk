"use client";

import dynamic from 'next/dynamic';

const ScrollyCanvas = dynamic(
  () => import('@/components/ScrollyCanvas').then((mod) => mod.ScrollyCanvas),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] font-sans selection:bg-white/30">
      <ScrollyCanvas />
    </main>
  );
}
