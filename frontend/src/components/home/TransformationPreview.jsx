import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { transformationAPI } from '../../services/api';
import SectionTitle from '../common/SectionTitle';

export default function TransformationPreview() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    transformationAPI.getAll()
      .then((res) => setStories(res.data.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  if (!stories.length) return null;

  return (
    <section className="py-20 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Success Stories" title="Real Transformations" />
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-red-500/80 text-white text-xs px-2 py-0.5 rounded">Before</span>
                  <img src={s.beforeImage} alt="Before" className="w-full h-36 object-cover rounded-lg" />
                </div>
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-gym-500/80 text-white text-xs px-2 py-0.5 rounded">After</span>
                  <img src={s.afterImage} alt="After" className="w-full h-36 object-cover rounded-lg" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">{s.memberName}</h3>
              {s.duration && <p className="text-dark-400 text-sm">Duration: {s.duration}</p>}
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/transformation" className="text-gym-400 hover:text-gym-300 inline-flex items-center gap-2 font-medium transition-colors">
            View All Stories <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
