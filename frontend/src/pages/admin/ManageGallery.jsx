import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { galleryAPI } from '../../services/api';
import DataTable from '../../components/admin/DataTable';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';

export default function ManageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('gym');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    galleryAPI.getAll().then((res) => setImages(res.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) { toast.error('Title and image are required'); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('category', category);
      fd.append('image', file);
      await galleryAPI.create(fd);
      toast.success('Image uploaded');
      setTitle(''); setCategory('gym'); setFile(null);
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Upload failed'); } finally { setSubmitting(false); }
  };

  const handleDelete = async (img) => {
    if (!window.confirm('Delete this image?')) return;
    try { await galleryAPI.delete(img._id); toast.success('Deleted'); fetchData(); } catch { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'imageUrl', label: 'Image', render: (v) => <img src={v} alt="" className="w-16 h-12 object-cover rounded" /> },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category', render: (v) => <span className="capitalize">{v}</span> },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-6"><h1 className="text-2xl font-display font-bold text-white">Gallery</h1><p className="text-dark-400 text-sm">{images.length} images</p></div>

      <div className="card mb-6">
        <h3 className="text-lg font-bold text-white mb-4">Upload Image</h3>
        <form onSubmit={handleUpload} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-dark-300 mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
          </div>
          <div className="w-40">
            <label className="block text-sm text-dark-300 mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
              {['gym', 'equipment', 'transformation', 'event'].map((c) => <option key={c} className="capitalize" value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-dark-300 mb-1">Image</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="input-field text-sm" />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary !py-2.5 !px-6 text-sm disabled:opacity-50">{submitting ? 'Uploading...' : 'Upload'}</button>
        </form>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-6"><TableSkeleton /></div> : (
          <DataTable columns={columns} data={images} onDelete={handleDelete} />
        )}
      </div>
    </motion.div>
  );
}
