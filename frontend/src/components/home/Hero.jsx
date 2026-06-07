import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { IoMdFitness } from 'react-icons/io';
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,197,94,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,197,94,0.1),transparent_50%)]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gym-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gym-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gym-500 font-semibold tracking-wider uppercase mb-4">
              Transform Your Body
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              Build Your{' '}
              <span className="gradient-text">Dream Physique</span>
              <br />With Expert Trainers
            </h1>
            <p className="text-dark-300 text-lg mb-8 max-w-lg leading-relaxed">
              Join FitZone and unlock your full potential with world-class equipment, 
              expert personal trainers, and a supportive community that pushes you to be your best.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/trial-booking" className="btn-primary inline-flex items-center gap-2">
                Start Free Trial <HiArrowRight />
              </Link>
              <Link to="/plans" className="btn-outline">
                View Plans
              </Link>
            </div>

            <div className="flex gap-8 mt-12">
              {[
                { value: '500+', label: 'Active Members' },
                { value: '15+', label: 'Expert Trainers' },
                { value: '5+', label: 'Years Experience' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-dark-400 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-gym-500/30 to-gym-600/10 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-gym-500/20 to-transparent flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gym-500/10 to-transparent flex items-center justify-center">
                    <IoMdFitness className="text-8xl text-gym-500/40" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gym-500 flex items-center justify-center shadow-lg shadow-gym-500/50">
                <p className="text-white font-bold text-center text-xs">
                  BEST<br/>GYM
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
