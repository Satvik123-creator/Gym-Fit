import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { bookingAPI } from '../../services/api';
import DataTable from '../../components/admin/DataTable';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';

export default function TrialBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = (status) => {
    setLoading(true);
    bookingAPI.getAll(status).then((res) => setBookings(res.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (booking, newStatus) => {
    try {
      await bookingAPI.updateStatus(booking._id, newStatus);
      toast.success(`Marked as ${newStatus}`);
      fetchData();
    } catch { toast.error('Update failed'); }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'preferredDate', label: 'Date', render: (v) => v ? new Date(v).toLocaleDateString() : '-' },
    { key: 'preferredTime', label: 'Time' },
    { key: 'status', label: 'Status', render: (v) => {
      const colors = {
        pending: 'bg-yellow-500/10 text-yellow-400',
        confirmed: 'bg-gym-500/10 text-gym-400',
        cancelled: 'bg-red-500/10 text-red-400',
        completed: 'bg-blue-500/10 text-blue-400',
      };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colors[v] || 'bg-dark-700 text-dark-300'}`}>{v}</span>;
    }},
  ];

  const handleEdit = (booking) => {
    const nextStatus = { pending: 'confirmed', confirmed: 'completed', completed: 'cancelled', cancelled: 'pending' };
    updateStatus(booking, nextStatus[booking.status] || 'pending');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-white">Trial Bookings</h1>
        <p className="text-dark-400 text-sm">{bookings.length} bookings</p>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
          <button key={s} onClick={() => fetchData(s === 'all' ? undefined : s)} className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${s === 'all' && !loading ? 'bg-gym-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-6"><TableSkeleton /></div> : (
          <DataTable columns={columns} data={bookings} onEdit={handleEdit} />
        )}
      </div>
    </motion.div>
  );
}
