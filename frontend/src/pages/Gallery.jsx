import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { galleryAPI } from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import { CardSkeleton } from '../components/common/LoadingSkeleton';

const categories = ['all', 'gym', 'equipment', 'transformation', 'event'];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const params = active === 'all' ? undefined : active;
    galleryAPI.getAll(params)
      .then((res) => setImages(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Gallery" title="Our Gym in Pictures" />

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setLoading(true); }}
                className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  active === cat ? 'bg-gym-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-dark-400 text-lg">No images in this category yet.</p>
                </div>
              ) : (
                images.map((img, i) => (
                  <motion.div
                    key={img._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative group cursor-pointer rounded-xl overflow-hidden"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img.imageUrl} alt={img.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-semibold">{img.title}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="absolute -top-10 right-0 text-white text-2xl hover:text-gym-500 transition-colors">&times;</button>
            <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <p className="text-white text-center mt-4 text-lg font-semibold">{selectedImage.title}</p>
            <p className="text-dark-400 text-center text-sm capitalize">{selectedImage.category}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
