import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { trainerAPI } from '../../services/api';
import SectionTitle from '../common/SectionTitle';
import { CardSkeleton } from '../common/LoadingSkeleton';

export default function FeaturedTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trainerAPI.getAll()
      .then((res) => setTrainers(res.data.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Our Team" title="Meet Expert Trainers" />
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {trainers.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center group"
              >
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-gym-500/30 group-hover:ring-gym-500 transition-all">
                  <img
                    src={t.image || `https://ui-avatars.com/api/?name=${t.name}&background=16a34a&color=fff`}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                <p className="text-gym-400 text-sm mb-2">{t.designation}</p>
                <p className="text-dark-400 text-sm mb-3">{t.experience} years experience</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {(t.specialization || []).slice(0, 3).map((s) => (
                    <span key={s} className="px-3 py-1 bg-dark-700 rounded-full text-xs text-dark-300">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to="/trainers" className="text-gym-400 hover:text-gym-300 inline-flex items-center gap-2 font-medium transition-colors">
            View All Trainers <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
