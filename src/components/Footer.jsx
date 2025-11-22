export default function Footer() {
  return (
    <footer className="bg-black text-white/60 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} Future Fade Studio. All rights reserved.</p>
        <p className="text-sm">Open Tue–Sun • 10:00–20:00</p>
      </div>
    </footer>
  );
}
