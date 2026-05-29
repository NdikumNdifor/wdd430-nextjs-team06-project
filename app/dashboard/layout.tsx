export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f5dc] px-6 py-8 text-[#3a302a] md:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        {children}
      </div>
    </main>
  );
}
