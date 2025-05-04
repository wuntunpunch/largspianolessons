"use client";

import Header from "@/components/header";
import RelativeKeysGame from "@/components/relative-keys";
import Footer from "@/components/footer";

export default function GamePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <RelativeKeysGame />
      <Footer />
    </main>
  );
}
