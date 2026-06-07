import { Link } from 'react-router-dom';
import { IoMdFitness } from 'react-icons/io';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <IoMdFitness className="text-3xl text-gym-500" />
              <span className="text-xl font-display font-bold text-white">
                Fit<span className="text-gym-500">Zone</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed">
              Transform your body, transform your life. Join FitZone today and start your fitness journey with expert trainers and premium equipment.
            </p>
            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-dark-400 hover:bg-gym-500 hover:text-white transition-all">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/plans', label: 'Membership' },
                { to: '/trainers', label: 'Trainers' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-dark-400 hover:text-gym-400 transition text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Programs</h3>
            <ul className="space-y-3 text-sm text-dark-400">
              {['Weight Training', 'Cardio', 'Yoga', 'CrossFit', 'Personal Training', 'Group Classes'].map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li className="flex justify-between"><span>Mon - Fri</span><span className="text-white">6 AM - 10 PM</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="text-white">8 AM - 8 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-white">8 AM - 6 PM</span></li>
            </ul>
            <Link to="/trial-booking" className="btn-primary inline-block mt-6 !px-6 !py-2 text-sm">
              Book Free Trial
            </Link>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-12 pt-8 text-center text-dark-500 text-sm">
          &copy; {new Date().getFullYear()} FitZone Gym. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
