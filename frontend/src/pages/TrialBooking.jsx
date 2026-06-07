import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { bookingAPI, gymInfoAPI } from '../services/api';
import SectionTitle from '../components/common/SectionTitle';

export default function TrialBooking() {
  const [gymInfo, setGymInfo] = useState(null);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', preferredDate: '', preferredTime: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    gymInfoAPI.get().then((res) => setGymInfo(res.data.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.preferredDate || !form.preferredTime) {
      toast.error('All fields are required');
      return;
    }
    if (form.phone.length < 10) { toast.error('Invalid phone number'); return; }
    setSubmitting(true);
    try {
      await bookingAPI.create(form);
      toast.success('Trial booked! We will confirm your slot shortly.');
      setForm({ name: '', phone: '', email: '', preferredDate: '', preferredTime: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Free Trial" title="Book Your First Session" />
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="card">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-dark-300 mb-1">Full Name</label>
                      <input type="text" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm text-dark-300 mb-1">Email</label>
                      <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-dark-300 mb-1">Phone Number</label>
                    <input type="tel" placeholder="+1 234 567 890" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-dark-300 mb-1">
                        <HiOutlineCalendar className="inline mr-1" /> Preferred Date
                      </label>
                      <input type="date" min={minDate} value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm text-dark-300 mb-1">
                        <HiOutlineClock className="inline mr-1" /> Preferred Time
                      </label>
                      <select value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} className="input-field">
                        <option value="">Select time</option>
                        {['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                    {submitting ? 'Booking...' : 'Book Free Trial'}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4">What You Get</h3>
                <ul className="space-y-3">
                  {[
                    '1 Week Free Gym Access',
                    'Personal Training Session',
                    'Fitness Assessment',
                    'Nutrition Consultation',
                    'Full Facility Tour',
                    'No Commitment Required',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-dark-300 text-sm">
                      <span className="w-2 h-2 bg-gym-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card bg-gym-500/10 border-gym-500/30">
                <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
                <p className="text-dark-300 text-sm">
                  {gymInfo?.address || '123 Fitness Street, Gym City'}<br />
                  {gymInfo?.phone || '+1 234 567 8900'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
