import { motion } from 'framer-motion';

const services = [
  { id: 'cut', name: 'Haircut', duration: 30, price: 25 },
  { id: 'cut-beard', name: 'Haircut + Beard', duration: 45, price: 35 },
  { id: 'beard', name: 'Beard Trim', duration: 20, price: 15 },
  { id: 'fade', name: 'Skin Fade', duration: 40, price: 30 },
  { id: 'kids', name: 'Kids Cut', duration: 25, price: 20 },
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-3xl md:text-5xl font-semibold">Services</motion.h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{opacity:0, y: 10}}
              whileInView={{opacity:1, y:0}}
              viewport={{ once: true }}
              transition={{duration:0.5, delay: i*0.05}}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium">{s.name}</h3>
                  <p className="text-white/60 text-sm">{s.duration} min</p>
                </div>
                <div className="text-lg">${s.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
