import { motion } from 'framer-motion';

export default function SectionTitle({ subtitle, title, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
    >
      <p className="text-gym-500 font-semibold tracking-wider uppercase text-sm mb-2">
        {subtitle}
      </p>
      <h2 className="section-title">{title}</h2>
    </motion.div>
  );
}
