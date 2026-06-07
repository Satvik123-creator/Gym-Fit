import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { planAPI } from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import { CardSkeleton } from '../components/common/LoadingSkeleton';

const ComparisonTable = ({ plans }) => {
  if (!plans?.length) return null;
  const allFeatures = [...new Set(plans.flatMap((p) => p.features))];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-dark-700">
            <th className="text-left py-4 px-4 text-dark-400 font-medium">Features</th>
            {plans.map((p) => (
              <th key={p._id} className="py-4 px-4 text-white font-bold text-center">{p.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, i) => (
            <tr key={i} className="border-b border-dark-700/50">
              <td className="py-3 px-4 text-dark-300">{feature}</td>
              {plans.map((p) => (
                <td key={p._id} className="py-3 px-4 text-center">
                  {p.features.includes(feature) ? (
                    <HiOutlineCheck className="text-gym-500 mx-auto text-lg" />
                  ) : (
                    <HiOutlineX className="text-dark-600 mx-auto text-lg" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Membership() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    planAPI.getAll(true)
      .then((res) => setPlans(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Pricing" title="Choose Your Membership" />
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card relative"
                >
                  {i === 1 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gym-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
                  <p className="text-sm text-dark-400 mb-4">{plan.duration}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-dark-300 text-sm">
                        <HiOutlineCheck className="text-gym-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/trial-booking" className={`block text-center py-3 rounded-lg font-semibold transition-all ${i === 1 ? 'btn-primary' : 'btn-dark'}`}>
                    Join Now
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Compare" title="Plan Comparison" />
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <ComparisonTable plans={plans} />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
