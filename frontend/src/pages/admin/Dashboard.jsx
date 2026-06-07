import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUsers, HiOutlineCash, HiOutlineMail, HiOutlineCalendar } from 'react-icons/hi';
import StatsCard from '../../components/admin/StatsCard';
import { trainerAPI, planAPI, enquiryAPI, bookingAPI } from '../../services/api';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';

export default function Dashboard() {
  const [stats, setStats] = useState({ trainers: 0, plans: 0, enquiries: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      trainerAPI.getAll().catch(() => ({ data: { data: [] } })),
      planAPI.getAll(true).catch(() => ({ data: { data: [] } })),
      enquiryAPI.getAll().catch(() => ({ data: { data: [] } })),
      bookingAPI.getAll().catch(() => ({ data: { data: [] } })),
    ]).then(([trainers, plans, enquiries, bookings]) => {
      setStats({
        trainers: trainers.data.data.length,
        plans: plans.data.data.length,
        enquiries: enquiries.data.data.length,
        bookings: bookings.data.data.length,
      });
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <CardSkeleton />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-dark-400">Welcome to FitZone admin panel</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard icon={HiOutlineUsers} label="Total Trainers" value={stats.trainers} color="gym" />
        <StatsCard icon={HiOutlineCash} label="Membership Plans" value={stats.plans} color="blue" />
        <StatsCard icon={HiOutlineMail} label="Enquiries" value={stats.enquiries} color="purple" />
        <StatsCard icon={HiOutlineCalendar} label="Trial Bookings" value={stats.bookings} color="orange" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Trainer', href: '/admin/trainers' },
              { label: 'New Plan', href: '/admin/plans' },
              { label: 'Upload Gallery', href: '/admin/gallery' },
              { label: 'View Enquiries', href: '/admin/enquiries' },
            ].map((a) => (
              <a key={a.label} href={a.href} className="px-4 py-3 bg-dark-700 rounded-lg text-sm text-dark-300 hover:text-white hover:bg-dark-600 transition-all text-center">
                {a.label}
              </a>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {stats.enquiries > 0 && (
              <div className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 bg-gym-500 rounded-full" />
                <span className="text-dark-300">{stats.enquiries} pending enquiries</span>
              </div>
            )}
            {stats.bookings > 0 && (
              <div className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-dark-300">{stats.bookings} trial bookings</span>
              </div>
            )}
            {stats.trainers === 0 && stats.plans === 0 && (
              <p className="text-dark-400 text-sm">No activity yet. Start by adding trainers and plans.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
