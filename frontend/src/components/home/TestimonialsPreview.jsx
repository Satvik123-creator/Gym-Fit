import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { testimonialAPI } from '../../services/api';
import SectionTitle from '../common/SectionTitle';
import { CardSkeleton } from '../common/LoadingSkeleton';

export default function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialAPI.getAll()
      .then((res) => setTestimonials(res.data.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Testimonials" title="What Our Members Say" />
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <HiStar key={idx} className={idx < t.rating ? 'text-yellow-500' : 'text-dark-600'} />
                  ))}
                </div>
                <p className="text-dark-300 text-sm leading-relaxed mb-4">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.memberImage || `https://ui-avatars.com/api/?name=${t.memberName}&background=16a34a&color=fff`}
                    alt={t.memberName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-white text-sm font-semibold">{t.memberName}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
