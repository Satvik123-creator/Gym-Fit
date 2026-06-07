import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { transformationAPI } from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import { CardSkeleton } from '../components/common/LoadingSkeleton';

export default function Transformation() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transformationAPI.getAll()
      .then((res) => setStories(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Success Stories" title="Real People, Real Results" />
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-dark-400 text-lg">No transformation stories yet. Check back soon!</p>
                </div>
              ) : (
                stories.map((s, i) => (
                  <motion.div
                    key={s._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card"
                  >
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="relative">
                        <span className="absolute top-2 left-2 bg-red-500/80 text-white text-xs px-2 py-0.5 rounded">Before</span>
                        <img src={s.beforeImage} alt="Before" className="w-full h-48 object-cover rounded-lg" />
                      </div>
                      <div className="relative">
                        <span className="absolute top-2 left-2 bg-gym-500/80 text-white text-xs px-2 py-0.5 rounded">After</span>
                        <img src={s.afterImage} alt="After" className="w-full h-48 object-cover rounded-lg" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">{s.memberName}</h3>
                    {s.duration && <p className="text-gym-400 text-sm font-medium">{s.duration}</p>}
                    <p className="text-dark-300 text-sm mt-2 leading-relaxed">{s.description}</p>
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
