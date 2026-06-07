import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { enquiryAPI } from '../../services/api';
import DataTable from '../../components/admin/DataTable';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = (status) => {
    setLoading(true);
    enquiryAPI.getAll(status).then((res) => setEnquiries(res.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (enquiry, newStatus) => {
    try {
      await enquiryAPI.updateStatus(enquiry._id, newStatus);
      toast.success(`Marked as ${newStatus}`);
      fetchData();
    } catch { toast.error('Update failed'); }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'message', label: 'Message', render: (v) => v?.length > 60 ? v.slice(0, 60) + '...' : v },
    { key: 'status', label: 'Status', render: (v) => {
      const colors = { pending: 'bg-yellow-500/10 text-yellow-400', contacted: 'bg-blue-500/10 text-blue-400', resolved: 'bg-gym-500/10 text-gym-400' };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[v] || 'bg-dark-700 text-dark-300'}`}>{v}</span>;
    }},
  ];

  const handleEdit = (enquiry) => {
    const nextStatus = { pending: 'contacted', contacted: 'resolved', resolved: 'pending' };
    updateStatus(enquiry, nextStatus[enquiry.status] || 'pending');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-white">Enquiries</h1>
        <p className="text-dark-400 text-sm">{enquiries.length} enquiries</p>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'pending', 'contacted', 'resolved'].map((s) => (
          <button key={s} onClick={() => fetchData(s === 'all' ? undefined : s)} className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${s === 'all' && !loading ? 'bg-gym-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-6"><TableSkeleton /></div> : (
          <DataTable columns={columns} data={enquiries} onEdit={handleEdit} />
        )}
      </div>
    </motion.div>
  );
}
