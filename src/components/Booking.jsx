import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function Booking() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const today = useMemo(() => new Date().toISOString().slice(0,10), []);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service_id: '',
    date: today,
    time: '10:00',
    notes: ''
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then(r => r.json())
      .then(setServices)
      .catch(() => setServices([]));
  }, []);

  const selected = services.find(s => s.id === form.service_id);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...form,
        service_name: selected?.name || ''
      };
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to book');
      setSuccess('Booking confirmed!');
      setForm(prev => ({...prev, name:'', phone:'', notes:''}));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="book" className="relative py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} transition={{duration:0.6}} className="text-3xl md:text-5xl font-semibold">Book a slot</motion.h2>
          <p className="mt-4 text-white/70 max-w-prose">Pick a service, choose a date and time, and you’re set. We’ll have the chair ready.</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Name</label>
                  <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-1 w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/30" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Phone</label>
                  <input required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="mt-1 w-full rounded-xl bgblack/60 bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/30" placeholder="(+1) 555-555" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-sm text-white/70">Service</label>
                  <select required value={form.service_id} onChange={e=>setForm({...form, service_id:e.target.value})} className="mt-1 w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/30">
                    <option value="" disabled>Select…</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name} — ${s.price}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/70">Time</label>
                  <input required type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} className="mt-1 w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Date</label>
                  <input required type="date" min={today} value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="mt-1 w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Notes</label>
                  <input value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="mt-1 w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 outline-none focus:border-white/30" placeholder="Optional" />
                </div>
              </div>

              {selected && (
                <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/70">
                  <div className="flex items-center justify-between">
                    <span>{selected.name}</span>
                    <span>${'{'}selected.price{'}'}</span>
                  </div>
                </div>
              )}

              {error && <p className="text-red-400 text-sm">{error}</p>}
              {success && <p className="text-emerald-400 text-sm">{success}</p>}

              <button disabled={loading} className="w-full rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition disabled:opacity-50">
                {loading ? 'Booking…' : 'Confirm booking'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:pl-8">
          <motion.h3 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} transition={{duration:0.6}} className="text-2xl font-medium">Today’s availability</motion.h3>
          <Availability date={form.date} />
        </div>
      </div>
    </section>
  );
}

function Availability({ date }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/bookings?date=${date}`)
      .then(r => r.json())
      .then(setItems)
      .catch(()=>setItems([]));
  }, [date]);

  return (
    <div className="mt-6 space-y-3">
      {items.length === 0 && <div className="text-white/60 text-sm">No bookings yet for this date.</div>}
      {items.map(b => (
        <div key={b._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">{b.time}</span>
            <span>{b.name}</span>
            <span className="text-white/60">{b.service_name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
