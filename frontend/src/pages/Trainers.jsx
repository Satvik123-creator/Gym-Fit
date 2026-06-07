import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { trainerAPI } from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import { CardSkeleton } from '../components/common/LoadingSkeleton';

const socialIcons = { facebook: FaFacebookF, instagram: FaInstagram, twitter: FaTwitter, linkedin: FaLinkedinIn };

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trainerAPI.getAll()
      .then((res) => setTrainers(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Our Team" title="Meet Our Expert Trainers" />
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainers.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-dark-400 text-lg">No trainers available yet. Check back soon!</p>
                </div>
              ) : (
                trainers.map((t, i) => (
                  <motion.div
                    key={t._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card group"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={t.image || `https://ui-avatars.com/api/?name=${t.name}&background=16a34a&color=fff&size=400`}
                        alt={t.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {t.socialLinks && (
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-3 pb-4">
                          {Object.entries(socialIcons).map(([key, Icon]) =>
                            t.socialLinks[key] ? (
                              <a key={key} href={t.socialLinks[key]} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gym-500 flex items-center justify-center text-white hover:bg-gym-600 transition-colors">
                                <Icon className="text-sm" />
                              </a>
                            ) : null
                          )}
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white">{t.name}</h3>
                    <p className="text-gym-400 text-sm font-medium">{t.designation}</p>
                    <p className="text-dark-400 text-xs mt-1">{t.experience} years experience</p>
                    <p className="text-dark-300 text-sm mt-3 line-clamp-2">{t.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(t.specialization || []).map((s) => (
                        <span key={s} className="px-3 py-1 bg-dark-700 rounded-full text-xs text-dark-300">{s}</span>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
