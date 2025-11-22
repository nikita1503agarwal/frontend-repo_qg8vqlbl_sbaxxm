import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
            Future Fade Studio
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70">
            Minimal cuts. Maximum precision. Book your slot in seconds.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#book" className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition">
              Book a cut
            </a>
            <a href="#services" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 hover:bg-white/5 transition">
              View services
            </a>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
    </section>
  );
}
