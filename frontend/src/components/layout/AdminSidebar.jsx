import { NavLink } from 'react-router-dom';
import { IoMdFitness } from 'react-icons/io';
import {
  HiOutlineViewGrid, HiOutlineUsers, HiOutlineCash, HiOutlinePhotograph,
  HiOutlineStar, HiOutlineSwitchHorizontal, HiOutlineMail,
  HiOutlineCalendar, HiOutlineLogout,
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const items = [
  { to: '/admin', icon: HiOutlineViewGrid, label: 'Dashboard', end: true },
  { to: '/admin/trainers', icon: HiOutlineUsers, label: 'Trainers' },
  { to: '/admin/plans', icon: HiOutlineCash, label: 'Membership Plans' },
  { to: '/admin/gallery', icon: HiOutlinePhotograph, label: 'Gallery' },
  { to: '/admin/testimonials', icon: HiOutlineStar, label: 'Testimonials' },
  { to: '/admin/transformations', icon: HiOutlineSwitchHorizontal, label: 'Transformations' },
  { to: '/admin/enquiries', icon: HiOutlineMail, label: 'Enquiries' },
  { to: '/admin/trial-bookings', icon: HiOutlineCalendar, label: 'Trial Bookings' },
];

export default function AdminSidebar() {
  const { admin, logout } = useAuth();

  return (
    <aside className="w-64 bg-dark-800 border-r border-dark-700 min-h-screen flex flex-col">
      <div className="p-6 border-b border-dark-700">
        <div className="flex items-center gap-2">
          <IoMdFitness className="text-2xl text-gym-500" />
          <span className="text-lg font-display font-bold">Fit<span className="text-gym-500">Zone</span></span>
        </div>
        <p className="text-dark-400 text-xs mt-2">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {items.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gym-500/10 text-gym-400 border-l-2 border-gym-500'
                  : 'text-dark-400 hover:text-white hover:bg-dark-700/50'
              }`
            }
          >
            <Icon className="text-lg" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-700">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gym-500 flex items-center justify-center text-sm font-bold">
            {admin?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{admin?.name}</p>
            <p className="text-xs text-dark-400 capitalize">{admin?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-dark-400 hover:text-red-400 hover:bg-red-500/10 w-full transition-all"
        >
          <HiOutlineLogout className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
}
