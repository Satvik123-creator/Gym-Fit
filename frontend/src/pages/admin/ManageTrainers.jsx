import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { trainerAPI } from '../../services/api';
import DataTable from '../../components/admin/DataTable';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';

const emptyForm = { name: '', designation: '', specialization: '', experience: '', description: '', socialLinks: '{}', image: null };

export default function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    trainerAPI.getAll().then((res) => setTrainers(res.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (t) => {
    setEditing(t);
    setForm({
      name: t.name, designation: t.designation, specialization: (t.specialization || []).join(', '),
      experience: t.experience, description: t.description || '',
      socialLinks: JSON.stringify(t.socialLinks || {}), image: null,
    });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.designation || !form.specialization || !form.experience) {
      toast.error('Required fields missing'); return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('designation', form.designation);
      fd.append('specialization', form.specialization);
      fd.append('experience', String(form.experience));
      fd.append('description', form.description);
      fd.append('socialLinks', form.socialLinks);
      if (form.image instanceof File) fd.append('image', form.image);

      if (editing) {
        await trainerAPI.update(editing._id, fd);
        toast.success('Trainer updated');
      } else {
        await trainerAPI.create(fd);
        toast.success('Trainer created');
      }
      setModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete trainer "${t.name}"?`)) return;
    try {
      await trainerAPI.delete(t._id);
      toast.success('Trainer deleted');
      fetchData();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const columns = [
    { key: 'image', label: 'Image', render: (_, row) => (
      <img src={row.image || `https://ui-avatars.com/api/?name=${row.name}&background=16a34a&color=fff`} alt="" className="w-10 h-10 rounded-full object-cover" />
    )},
    { key: 'name', label: 'Name' },
    { key: 'designation', label: 'Designation' },
    { key: 'experience', label: 'Experience', render: (v) => `${v} yrs` },
    { key: 'specialization', label: 'Specialization', render: (v) => (v || []).slice(0, 2).join(', ') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-display font-bold text-white">Manage Trainers</h1><p className="text-dark-400 text-sm">{trainers.length} trainers</p></div>
        <button onClick={openCreate} className="btn-primary !py-2 !px-4 text-sm">+ Add Trainer</button>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-6"><TableSkeleton /></div> : <DataTable columns={columns} data={trainers} onEdit={openEdit} onDelete={handleDelete} />}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-dark-800 border border-dark-700 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-white mb-4">{editing ? 'Edit Trainer' : 'Add Trainer'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-dark-300 mb-1">Name*</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" /></div>
                  <div><label className="block text-sm text-dark-300 mb-1">Designation*</label><input type="text" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="input-field" /></div>
                </div>
                <div><label className="block text-sm text-dark-300 mb-1">Specializations* (comma separated)</label><input type="text" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className="input-field" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-dark-300 mb-1">Experience (years)*</label><input type="number" min="0" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="input-field" /></div>
                  <div><label className="block text-sm text-dark-300 mb-1">Image</label><input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} className="input-field text-sm" /></div>
                </div>
                <div><label className="block text-sm text-dark-300 mb-1">Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" /></div>
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
