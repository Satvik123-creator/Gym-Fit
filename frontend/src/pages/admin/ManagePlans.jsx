import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { planAPI } from '../../services/api';
import DataTable from '../../components/admin/DataTable';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';

const emptyForm = { title: '', duration: '', price: '', features: '', active: true };

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    planAPI.getAll().then((res) => setPlans(res.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ title: p.title, duration: p.duration, price: p.price, features: (p.features || []).join('\n'), active: p.active });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.duration || !form.price) { toast.error('Required fields missing'); return; }
    setSubmitting(true);
    try {
      const data = {
        title: form.title,
        duration: form.duration,
        price: Number(form.price),
        features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
        active: form.active,
      };
      if (editing) {
        await planAPI.update(editing._id, data);
        toast.success('Plan updated');
      } else {
        await planAPI.create(data);
        toast.success('Plan created');
      }
      setModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete plan "${p.title}"?`)) return;
    try { await planAPI.delete(p._id); toast.success('Plan deleted'); fetchData(); } catch { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'duration', label: 'Duration' },
    { key: 'price', label: 'Price', render: (v) => `$${v}` },
    { key: 'active', label: 'Status', render: (v) => (
      <span className={`px-2 py-1 rounded-full text-xs ${v ? 'bg-gym-500/10 text-gym-400' : 'bg-red-500/10 text-red-400'}`}>
        {v ? 'Active' : 'Inactive'}
      </span>
    )},
    { key: 'features', label: 'Features', render: (v) => `${(v || []).length} features` },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-display font-bold text-white">Membership Plans</h1><p className="text-dark-400 text-sm">{plans.length} plans</p></div>
        <button onClick={openCreate} className="btn-primary !py-2 !px-4 text-sm">+ Add Plan</button>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-6"><TableSkeleton /></div> : <DataTable columns={columns} data={plans} onEdit={openEdit} onDelete={handleDelete} />}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-dark-800 border border-dark-700 rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-white mb-4">{editing ? 'Edit Plan' : 'Add Plan'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-sm text-dark-300 mb-1">Title*</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-dark-300 mb-1">Duration*</label><input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input-field" placeholder="e.g. Monthly" /></div>
                  <div><label className="block text-sm text-dark-300 mb-1">Price*</label><input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" /></div>
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Features (one per line)</label>
                  <textarea rows={5} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="input-field resize-none" />
                </div>
                <label className="flex items-center gap-2 text-sm text-dark-300">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-gym-500" />
                  Active
                </label>
                <div className="flex gap-3 justify-end">
                  <button type="button" onClick={() => setModal(false)} className="btn-dark !py-2 !px-4 text-sm">Cancel</button>
                  <button type="submit" disabled={submitting} className="btn-primary !py-2 !px-4 text-sm disabled:opacity-50">{submitting ? 'Saving...' : 'Save'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
