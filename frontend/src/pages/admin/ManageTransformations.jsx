import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { transformationAPI } from '../../services/api';
import DataTable from '../../components/admin/DataTable';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';

const emptyForm = { memberName: '', description: '', duration: '', beforeImage: null, afterImage: null };

export default function ManageTransformations() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    transformationAPI.getAll().then((res) => setStories(res.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ memberName: s.memberName, description: s.description, duration: s.duration || '', beforeImage: null, afterImage: null }); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.memberName || !form.description) { toast.error('Required fields missing'); return; }
    if (!editing && (!form.beforeImage || !form.afterImage)) { toast.error('Both images required for new story'); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('memberName', form.memberName);
      fd.append('description', form.description);
      fd.append('duration', form.duration);
      if (form.beforeImage instanceof File) fd.append('beforeImage', form.beforeImage);
      if (form.afterImage instanceof File) fd.append('afterImage', form.afterImage);
      if (editing) { await transformationAPI.update(editing._id, fd); toast.success('Updated'); }
      else { await transformationAPI.create(fd); toast.success('Created'); }
      setModal(false); fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); } finally { setSubmitting(false); }
  };

  const handleDelete = async (s) => {
    if (!window.confirm('Delete this story?')) return;
    try { await transformationAPI.delete(s._id); toast.success('Deleted'); fetchData(); } catch { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'memberName', label: 'Member' },
    { key: 'description', label: 'Description', render: (v) => v?.length > 50 ? v.slice(0, 50) + '...' : v },
    { key: 'duration', label: 'Duration' },
    { key: 'beforeImage', label: 'Images', render: (_, row) => (
      <div className="flex gap-1">
        <img src={row.beforeImage} alt="" className="w-10 h-10 object-cover rounded" />
        <img src={row.afterImage} alt="" className="w-10 h-10 object-cover rounded" />
      </div>
    )},
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-display font-bold text-white">Transformations</h1><p className="text-dark-400 text-sm">{stories.length} stories</p></div>
        <button onClick={openCreate} className="btn-primary !py-2 !px-4 text-sm">+ Add Story</button>
      </div>
      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-6"><TableSkeleton /></div> : <DataTable columns={columns} data={stories} onEdit={openEdit} onDelete={handleDelete} />}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-dark-800 border border-dark-700 rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-white mb-4">{editing ? 'Edit Story' : 'Add Story'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-sm text-dark-300 mb-1">Member Name*</label><input type="text" value={form.memberName} onChange={(e) => setForm({ ...form, memberName: e.target.value })} className="input-field" /></div>
                <div><label className="block text-sm text-dark-300 mb-1">Description*</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" /></div>
                <div><label className="block text-sm text-dark-300 mb-1">Duration (e.g. 3 months)</label><input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input-field" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-dark-300 mb-1">Before Image*</label><input type="file" accept="image/*" onChange={(e) => setForm({ ...form, beforeImage: e.target.files[0] })} className="input-field text-sm" /></div>
                  <div><label className="block text-sm text-dark-300 mb-1">After Image*</label><input type="file" accept="image/*" onChange={(e) => setForm({ ...form, afterImage: e.target.files[0] })} className="input-field text-sm" /></div>
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
