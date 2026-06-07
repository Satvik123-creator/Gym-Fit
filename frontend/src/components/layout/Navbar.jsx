import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoMdFitness } from 'react-icons/io';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/plans', label: 'Membership' },
  { to: '/trainers', label: 'Trainers' },
  { to: '/transformation', label: 'Transformations' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <IoMdFitness className="text-3xl text-gym-500 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-display font-bold text-white">
              Fit<span className="text-gym-500">Zone</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === l.to
                    ? 'text-gym-400 bg-gym-500/10'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/trial-booking" className="btn-primary ml-4 !px-6 !py-2 text-sm">
              Free Trial
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white text-2xl p-2"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-dark-700"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition ${
                    pathname === l.to
                      ? 'text-gym-400 bg-gym-500/10'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/trial-booking" className="btn-primary w-full text-center mt-4">
                Free Trial
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
