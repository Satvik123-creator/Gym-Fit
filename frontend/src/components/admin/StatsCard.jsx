import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, label, value, color = 'gym' }) {
  const colors = {
    gym: 'from-gym-500 to-gym-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex items-center gap-4"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}>
        <Icon className="text-2xl text-white" />
      </div>
      <div>
        <p className="text-dark-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}
