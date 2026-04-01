export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <main className="w-full max-w-3xl py-12">
        <div className="bg-white/80 dark:bg-black/60 rounded-xl p-8">
          <h1 className="text-3xl font-semibold mb-4">Kids Learning — Migrated React Pages</h1>
          <p className="text-zinc-600 mb-6">This Next.js app now contains simple pages converted from the CRA example. Use the links below to open them.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a className="block text-center p-4 bg-rose-100 rounded-lg" href="/telugu">📖 Telugu</a>
            <a className="block text-center p-4 bg-sky-100 rounded-lg" href="/maths">🔢 Maths</a>
            <a className="block text-center p-4 bg-emerald-100 rounded-lg" href="/english">🔤 English</a>
          </div>
        </div>
      </main>
    </div>
  );
}
