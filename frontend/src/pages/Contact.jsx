import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { gymInfoAPI, enquiryAPI } from '../services/api';
import SectionTitle from '../components/common/SectionTitle';

export default function Contact() {
  const [gymInfo, setGymInfo] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    gymInfoAPI.get().then((res) => setGymInfo(res.data.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error('All fields are required');
      return;
    }
    setSubmitting(true);
    try {
      await enquiryAPI.create(form);
      toast.success('Enquiry submitted! We will get back to you.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappNumber = gymInfo?.whatsappNumber?.replace(/[^0-9]/g, '') || '';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Contact Us" title="Get In Touch" />
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                  <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                </div>
                <textarea placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" />
                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <HiOutlineLocationMarker className="text-gym-500 text-xl mt-1" />
                    <div>
                      <p className="text-white font-medium">Address</p>
                      <p className="text-dark-400 text-sm">{gymInfo?.address || '123 Fitness Street'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <HiOutlinePhone className="text-gym-500 text-xl mt-1" />
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-dark-400 text-sm">{gymInfo?.phone || '+1 234 567 8900'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <HiOutlineMail className="text-gym-500 text-xl mt-1" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-dark-400 text-sm">{gymInfo?.email || 'info@gym.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <HiOutlineClock className="text-gym-500 text-xl mt-1" />
                    <div>
                      <p className="text-white font-medium">Opening Hours</p>
                      <div className="text-dark-400 text-sm space-y-1">
                        <p>Mon - Fri: {gymInfo?.openingHours?.monday?.split('-')[0]?.trim() || '6:00 AM'} - {gymInfo?.openingHours?.friday?.split('-')[1]?.trim() || '10:00 PM'}</p>
                        <p>Sat: {gymInfo?.openingHours?.saturday || '8:00 AM - 8:00 PM'}</p>
                        <p>Sun: {gymInfo?.openingHours?.sunday || '8:00 AM - 6:00 PM'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi!%20I'm%20interested%20in%20joining%20FitZone%20Gym.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[#20bd5a] transition-all"
              >
                <FaWhatsapp className="text-2xl" />
                Chat on WhatsApp
              </a>

              {gymInfo?.googleMapLink && (
                <div className="rounded-xl overflow-hidden border border-dark-700 h-64">
                  <iframe
                    title="Gym Location"
                    src={gymInfo.googleMapLink.replace('&output=embed', '').includes('?') ? gymInfo.googleMapLink + '&output=embed' : gymInfo.googleMapLink}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
