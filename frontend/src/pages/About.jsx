import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineGlobe, HiOutlineUserGroup, HiOutlineShieldCheck } from 'react-icons/hi';
import { IoMdFitness } from 'react-icons/io';
import SectionTitle from '../components/common/SectionTitle';

const values = [
  { icon: HiOutlineHeart, title: 'Passion', desc: 'We are passionate about helping you achieve your fitness goals.' },
  { icon: HiOutlineUserGroup, title: 'Community', desc: 'A supportive environment where everyone pushes each other.' },
  { icon: HiOutlineShieldCheck, title: 'Excellence', desc: 'Top-tier equipment and certified trainers for best results.' },
  { icon: HiOutlineGlobe, title: 'Growth', desc: 'Continuous improvement in our facilities and programs.' },
];

const facilities = [
  { title: 'Cardio Zone', desc: 'Latest treadmills, bikes, and ellipticals' },
  { title: 'Weight Training', desc: 'Free weights, machines, and racks' },
  { title: 'Group Classes', desc: 'Yoga, Zumba, HIIT, and more' },
  { title: 'Personal Training', desc: 'One-on-one coaching sessions' },
  { title: 'Sauna & Steam', desc: 'Relax and recover after workouts' },
  { title: 'Nutrition Bar', desc: 'Healthy shakes and supplements' },
];

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gym-500 font-semibold tracking-wider uppercase mb-4">
              About Us
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Our <span className="gradient-text">Story</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-dark-300 text-lg leading-relaxed">
              Founded in 2019, FitZone Gym was born from a simple idea: everyone deserves access to 
              premium fitness facilities and expert guidance. What started as a small 2000 sqft gym 
              has grown into a 10,000 sqft state-of-the-art fitness center serving over 500 active members.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Mission & Vision" title="What Drives Us" />
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card">
              <IoMdFitness className="text-4xl text-gym-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-dark-400 leading-relaxed">
                To empower individuals to transform their lives through fitness by providing 
                world-class equipment, expert training, and a supportive community environment.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card">
              <HiOutlineGlobe className="text-4xl text-gym-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-dark-400 leading-relaxed">
                To become the most trusted fitness brand in the region, known for transforming 
                lives and building a healthier, stronger community one member at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Core Values" title="What We Stand For" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <v.icon className="text-4xl text-gym-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-dark-400 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Facilities" title="What We Offer" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-gym-500/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlineShieldCheck className="text-xl text-gym-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{f.title}</h3>
                  <p className="text-dark-400 text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
