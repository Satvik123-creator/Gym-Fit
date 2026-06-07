import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { testimonialAPI } from '../../services/api';
import DataTable from '../../components/admin/DataTable';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';

const emptyForm = { memberName: '', review: '', rating: 5, memberImage: null };

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    testimonialAPI.getAll().then((res) => setTestimonials(res.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (t) => { setEditing(t); setForm({ memberName: t.memberName, review: t.review, rating: t.rating, memberImage: null }); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.memberName || !form.review) { toast.error('Required fields missing'); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('memberName', form.memberName);
      fd.append('review', form.review);
      fd.append('rating', String(form.rating));
      if (form.memberImage instanceof File) fd.append('memberImage', form.memberImage);
      if (editing) { await testimonialAPI.update(editing._id, fd); toast.success('Updated'); }
      else { await testimonialAPI.create(fd); toast.success('Created'); }
      setModal(false); fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); } finally { setSubmitting(false); }
  };

  const handleDelete = async (t) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try { await testimonialAPI.delete(t._id); toast.success('Deleted'); fetchData(); } catch { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'memberName', label: 'Name' },
    { key: 'review', label: 'Review', render: (v) => v?.length > 50 ? v.slice(0, 50) + '...' : v },
    { key: 'rating', label: 'Rating', render: (v) => <span className="text-yellow-500">{'★'.repeat(v)}{'☆'.repeat(5 - v)}</span> },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-display font-bold text-white">Testimonials</h1><p className="text-dark-400 text-sm">{testimonials.length} testimonials</p></div>
        <button onClick={openCreate} className="btn-primary !py-2 !px-4 text-sm">+ Add Testimonial</button>
      </div>
      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-6"><TableSkeleton /></div> : <DataTable columns={columns} data={testimonials} onEdit={openEdit} onDelete={handleDelete} />}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-dark-800 border border-dark-700 rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-white mb-4">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-sm text-dark-300 mb-1">Member Name*</label><input type="text" value={form.memberName} onChange={(e) => setForm({ ...form, memberName: e.target.value })} className="input-field" /></div>
                <div><label className="block text-sm text-dark-300 mb-1">Review*</label><textarea rows={4} value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} className="input-field resize-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-dark-300 mb-1">Rating</label>
                    <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="input-field">
                      {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                  </div>
                  <div><label className="block text-sm text-dark-300 mb-1">Image</label><input type="file" accept="image/*" onChange={(e) => setForm({ ...form, memberImage: e.target.files[0] })} className="input-field text-sm" /></div>
                </div>
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
