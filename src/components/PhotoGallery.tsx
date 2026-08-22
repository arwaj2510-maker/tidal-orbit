import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Sparkles, X, Plus, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '../types';
import { triggerHeartConfetti } from '../utils/confetti';

interface PhotoGalleryProps {
  recipientName: string;
}

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: '1',
    url: '/images/g1.jpg',
    caption: 'The little things you do make you even more adorable ',
    date: 'cutiee',
    likes: 12,
    category: 'cutiee',
  },
  {
    id: '2',
    url: '/images/g2.jpg',
    caption: 'No matter how much time passes, I won"t forget this moment ✨',
    date: '12/12/22',
    likes: 12,
    category: 'unforgettables',
  },
  {
    id: '3',
    url: '/images/g3.jpg',
    caption: 'Time passes, but beautiful memories remain forever 💖',
    date: 'Beautiful memories',
    likes: 22,
    category: 'memories',
  },
  {
    id: '4',
    url: '/images/g4.jpg',
    caption: 'Your cuteness is simply impossible to ignore 🎈',
    date: 'cutiee',
    likes: 77,
    category: 'cutiee',
  },
  {
    id: '5',
    url: '/images/g5.jpg',
    caption: 'Being yourself is what makes you the cutest 🎈',
    date: 'cutiee',
    likes: 25,
    category: 'cutiee',
  },
  {
    id: '6',
    url: '/images/g6.jpg',
    caption: 'Your smile is my favorite kind of happiness 😊',
    date: 'Cute Smile',
    likes: 10,
    category: 'smiles',
  },
  {
    id: '7',
    url: '/images/g7.jpg',
    caption: 'A smile like yours is impossible to forget 😊',
    date: 'Cute Smile',
    likes: 10,
    category: 'smiles',
  },
  {
    id: '8',
    url: '/images/g8.jpg',
    caption: 'Memories with you will always stay close to my heart 💖',
    date: 'Beautiful memories',
    likes: 9,
    category: 'memories',
  },
  {
    id: '9',
    url: '/images/g9.jpg',
    caption: 'Some moments become memories; you became a beautiful one 💖',
    date: 'Beautiful memories',
    likes: 26,
    category: 'memories',
  },
  {
    id: '10',
    url: '/images/g10.jpg',
    caption: 'Some memories stay with us forever—this is one of them ✨',
    date: 'Unforgettable Memory',
    likes: 85,
    category: 'unforgettables',
  },
  {
    id: '11',
    url: '/images/g11.jpg',
    caption: 'Your smile makes everything feel beautiful 😊',
    date: 'Happy Vibe',
    likes: 80,
    category: 'smiles',
  },
  {
    id: '12',
    url: '/images/g12.jpg',
    caption: 'You are cute in ways you probably don"t even realize 🎈',
    date: 'cutiee',
    likes: 71,
    category: 'cutiee',
  },
  {
    id: '13',
    url: '/images/g13.jpg',
    caption: 'This memory will always have a special place in my heart ✨',
    date: 'Unforgettable Memory',
    likes: 21,
    category: 'unforgettables',
  },
  {
    id: '14',
    url: '/images/g14.jpg',
    caption: 'Some moments are meant to be remembered forever ✨',
    date: '31/10/2024',
    likes: 19,
    category: 'unforgettables',
  },
];

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ recipientName }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
      )
    );
    triggerHeartConfetti();
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl.trim() && newCaption.trim()) {
      const newPhoto: PhotoItem = {
        id: Date.now().toString(),
        url: newUrl,
        caption: newCaption,
        date: 'Just Added',
        likes: 1,
        category: 'memories',
      };
      setPhotos([newPhoto, ...photos]);
      setNewUrl('');
      setNewCaption('');
      setShowAddModal(false);
    }
  };

  const filteredPhotos = photos.filter(
    (photo) => activeCategory === 'all' || photo.category === activeCategory
  );

  return (
    <section id="gallery-section" className="py-20 px-4 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-rose-300/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Camera className="w-4 h-4 text-rose-400" />
          <span>Precious Moments</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-gradient-rose">
          {recipientName}'s Photo Memory Wall 📷
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          A collection of cute polaroid memories, heartfelt smiles, and glowing birthday vibes ✨
        </p>

        {/* Category Filters + Add Photo Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'All Photos ✨' },
            { id: 'memories', label: 'Memories 💖' },
            { id: 'smiles', label: 'Smiles 😊' },
            { id: 'cutiee', label: 'Cutiee 🎈' },
            { id: 'unforgettables', label: 'Unforgettables ✨' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeCategory === cat.id
                ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-md shadow-rose-500/20 scale-105'
                : 'glass-card border border-rose-300/20 text-rose-200/80 hover:text-white'
                }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-950/60 border border-rose-400/40 text-rose-300 text-xs font-bold hover:bg-rose-900/80 hover:text-white transition-all ml-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Photo</span>
          </button>
        </div>
      </div>

      {/* Polaroid Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer p-4 pb-6 bg-slate-900/90 rounded-2xl border border-rose-300/25 shadow-xl hover:shadow-rose-500/20 transition-all flex flex-col justify-between"
          >
            {/* Polaroid Image Wrapper */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-950">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs text-rose-200 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blush-gold" />
                  Click to view full photo
                </span>
              </div>
            </div>

            {/* Polaroid Caption & Likes */}
            <div>
              <p className="font-cursive text-lg text-rose-200 font-semibold leading-snug mb-2 line-clamp-2">
                "{photo.caption}"
              </p>
              <div className="flex items-center justify-between text-xs text-rose-300/70 pt-2 border-t border-rose-300/10">
                <span className="font-mono">{photo.date}</span>
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:text-white hover:border-rose-400 transition-all active:scale-125"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span className="font-bold">{photo.likes}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full p-4 rounded-3xl glass-card-glow border border-rose-300/40 overflow-hidden"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-rose-300 hover:text-white hover:bg-rose-500/40 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="rounded-2xl overflow-hidden mb-4 max-h-[70vh] flex items-center justify-center bg-slate-950">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl"
                />
              </div>

              <div className="p-2 text-center">
                <h4 className="font-cursive text-2xl text-rose-200 mb-1">
                  "{selectedPhoto.caption}"
                </h4>
                <div className="flex items-center justify-center gap-4 text-xs text-rose-300/80">
                  <span>{selectedPhoto.date}</span>
                  <span>•</span>
                  <button
                    onClick={(e) => handleLike(selectedPhoto.id, e)}
                    className="flex items-center gap-1 font-bold text-rose-400 hover:text-rose-300"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{selectedPhoto.likes} Hearts</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Custom Photo Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md p-6 rounded-3xl glass-card-glow border border-rose-300/30 text-left shadow-2xl"
            >
              <h3 className="font-serif text-2xl font-bold text-gradient-rose mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-rose-400" />
                Add a Birthday Memory
              </h3>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-rose-300 mb-1">
                    Photo Image URL:
                  </label>
                  <input
                    type="url"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 text-sm outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-300 mb-1">
                    Cute Photo Caption:
                  </label>
                  <input
                    type="text"
                    required
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Making unforgettable memories together! ✨"
                    className="w-full p-3 rounded-xl bg-slate-900/80 border border-rose-300/30 text-rose-100 text-sm outline-none focus:border-rose-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs text-rose-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    Add to Memory Wall ✨
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
