import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineCheck } from 'react-icons/hi';
import SectionTitle from '../common/SectionTitle';

const highlights = [
  { title: 'Basic', price: '29', duration: '/month', features: ['Gym Access', 'Cardio Equipment', 'Locker Room'], popular: false },
  { title: 'Standard', price: '49', duration: '/month', features: ['All Basic Features', 'Group Classes', 'Personal Trainer (2x/week)', 'Nutrition Guide'], popular: true },
  { title: 'Premium', price: '79', duration: '/month', features: ['All Standard Features', 'Unlimited PT Sessions', 'Sauna Access', 'Meal Plans', 'Priority Support'], popular: false },
];

export default function MembershipHighlights() {
  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Membership Plans" title="Choose Your Perfect Plan" />
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card relative ${plan.popular ? 'border-gym-500 ring-1 ring-gym-500' : ''}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gym-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
              <p className="text-sm text-dark-400 mb-4">Perfect for beginners</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-dark-400">{plan.duration}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-dark-300 text-sm">
                    <HiOutlineCheck className="text-gym-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/trial-booking" className={`block text-center py-3 rounded-lg font-semibold transition-all ${plan.popular ? 'btn-primary' : 'btn-dark'}`}>
                Join Now
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/plans" className="text-gym-400 hover:text-gym-300 inline-flex items-center gap-2 font-medium transition-colors">
            View All Plans <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
