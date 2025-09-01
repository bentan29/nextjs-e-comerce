import { Footer, NavbarShop } from "@/components";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col h-screen bg-secondary">
      {/* Header fijo */}
      <NavbarShop />

      {/* Main ocupa lo que queda, permite scroll */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      {/* Footer fijo abajo */}
      <Footer />
      </main>

    </div>
  );
}
