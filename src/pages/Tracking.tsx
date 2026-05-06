import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  Navigation,
  Star,
  Truck
} from 'lucide-react';

export default function Tracking() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-100 relative overflow-hidden">
      {/* Fake Map */}
      <div className="h-2/3 w-full bg-slate-200 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
          className="w-full h-full object-cover opacity-60 grayscale-[40%]" 
          alt="Map" 
        />
        
        {/* Path Simulation */}
        <div className="absolute inset-0 p-20 flex flex-col justify-between items-center rotate-12">
           <div className="w-10 h-10 bg-secondary rounded-full border-4 border-white shadow-xl flex items-center justify-center relative">
              <div className="absolute -top-10 bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md whitespace-nowrap">Pharmacie du Centre</div>
              <MapPin size={18} className="text-white fill-white" />
           </div>
           
           <motion.div 
             animate={{ 
               y: [0, 400], 
               x: [0, 50] 
             }}
             transition={{ duration: 30, repeat: Infinity }}
             className="w-12 h-12 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center relative z-10"
           >
             <Truck size={20} className="text-white" />
           </motion.div>

           <div className="w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center relative">
              <div className="absolute -bottom-10 bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md">Ma Maison</div>
              <MapPin size={18} className="text-white fill-white" />
           </div>
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="absolute top-6 left-6 p-3 rounded-2xl bg-white shadow-xl text-slate-800"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Driver Info Card */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        className="absolute inset-x-0 bottom-0 bg-white rounded-t-[3rem] p-8 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-20"
      >
        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" alt="Driver" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Jean Pierre</h3>
              <div className="flex items-center text-sm text-slate-500 font-medium">
                <Star size={14} className="mr-1 text-yellow-400 fill-yellow-400" />
                <span>4.9 • Livreur Gold</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="p-4 bg-slate-50 text-primary rounded-2xl border border-slate-100 shadow-sm">
              <Phone size={22} />
            </button>
            <button className="p-4 bg-slate-50 text-secondary rounded-2xl border border-slate-100 shadow-sm">
              <MessageSquare size={22} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm uppercase tracking-widest font-bold text-slate-400">
            <span>Temps restant</span>
            <span>Progression</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center space-x-3">
              <Clock size={40} className="text-primary" />
              <div>
                <span className="text-3xl font-display font-bold">12</span>
                <span className="text-sm font-bold text-slate-500 ml-1">mins</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-display font-medium text-slate-400">{progress}%</span>
            </div>
          </div>
          
          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 medical-gradient rounded-full"
            />
          </div>

          <div className="flex items-center space-x-3 text-slate-500 text-xs py-4 border-t border-slate-50">
            <Navigation size={16} className="text-primary" />
            <p className="font-medium italic">En route pour 14 Avenue des Marronniers...</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
