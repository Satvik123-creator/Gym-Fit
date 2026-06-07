import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import MembershipHighlights from '../components/home/MembershipHighlights';
import FeaturedTrainers from '../components/home/FeaturedTrainers';
import TestimonialsPreview from '../components/home/TestimonialsPreview';
import TransformationPreview from '../components/home/TransformationPreview';
import ContactCTA from '../components/home/ContactCTA';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <MembershipHighlights />
      <FeaturedTrainers />
      <TestimonialsPreview />
      <TransformationPreview />
      <ContactCTA />
    </motion.div>
  );
}
