import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  ShoppingCart, 
  Plus, 
  Minus,
  Star,
  Info
} from 'lucide-react';
import { MEDICINES } from '../constants';
import { formatCurrency, cn } from '../lib/utils';

const categories = ['Tous', 'Anti-douleur', 'Antibiotique', 'Respiratoire', 'Complément', 'Digestion'];

export default function PharmacyMarket() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedicines = MEDICINES.filter(m => 
    (selectedCategory === 'Tous' || m.category === selectedCategory) &&
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const med = MEDICINES.find(m => m.id === id);
    return acc + (med?.price || 0) * qty;
  }, 0);

  const updateCart = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="bg-slate-50 min-h-full pb-32">
      {/* Header */}
      <div className="bg-white p-6 pb-4 sticky top-0 z-20 shadow-sm border-b border-slate-50">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl hover:bg-slate-100">
            <ChevronLeft size={24} />
          </button>
          <h1 className="flex-1 text-center text-xl font-display font-bold mr-10">Pharmacie</h1>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/checkout')}
            className="relative p-2"
          >
            <ShoppingCart size={24} className="text-slate-600" />
            {cartCount > 0 && (
              <div className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </div>
            )}
          </motion.button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un médicament..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-1 focus:ring-primary text-sm font-medium"
            />
          </div>
          <button className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-4 flex space-x-3 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all",
              selectedCategory === cat 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-white text-slate-500 border border-slate-100"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {filteredMedicines.map((med) => (
          <motion.div
            layout
            key={med.id}
            className="card-minimal p-4 flex flex-col"
          >
            <div className="h-32 rounded-[1.5rem] overflow-hidden mb-3 bg-slate-50 relative">
              <img src={med.image} alt={med.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-xl flex items-center space-x-1 shadow-sm">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-bold">4.8</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-sm mb-0.5 line-clamp-1">{med.name}</h4>
              <p className="text-[10px] text-slate-400 font-medium mb-2">{med.category}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-primary font-bold">{formatCurrency(med.price)}</span>
                <div className="flex items-center space-x-1">
                  {cart[med.id] ? (
                    <>
                      <button 
                        onClick={() => updateCart(med.id, -1)}
                        className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center text-sm font-bold">{cart[med.id]}</span>
                    </>
                  ) : null}
                  <button 
                    onClick={() => updateCart(med.id, 1)}
                    className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sticky Cart Summary */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-24 left-6 right-6 z-30"
          >
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full h-16 bg-medical-dark rounded-2xl p-4 flex items-center justify-between text-white shadow-2xl shadow-black/20"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShoppingCart size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{cartCount} articles</p>
                  <p className="text-base font-bold">{formatCurrency(cartTotal)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 font-bold">
                <span>Passer commande</span>
                <ChevronLeft size={18} className="rotate-180" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
