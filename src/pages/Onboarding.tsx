import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    title: "Consultez un médecin",
    description: "Accédez à des médecins qualifiés en ligne ou en cabinet en quelques clics.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dad9946f?w=800&q=80",
    color: "#2AC1C8"
  },
  {
    title: "Commandez vos médicaments",
    description: "Achetez vos médicaments en ligne et faites-vous livrer en moins de 2 heures.",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&q=80",
    color: "#1D9BF0"
  },
  {
    title: "Suivez vos livraisons",
    description: "Restez informé de l'état de votre commande en temps réel sur la carte.",
    image: "https://images.unsplash.com/photo-1586762524444-80e0fe900033?w=800&q=80",
    color: "#00B894"
  }
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-between p-8">
      <div className="w-full flex justify-end">
        <button 
          onClick={() => navigate('/login')}
          className="text-slate-400 font-medium hover:text-primary transition-colors"
        >
          Passer
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 rotate-3">
              <img 
                src={steps[current].image} 
                alt={steps[current].title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-slate-900 leading-tight">
                {steps[current].title}
              </h2>
              <p className="text-slate-500 font-normal leading-relaxed max-w-[280px]">
                {steps[current].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex space-x-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNext}
        className="w-full h-16 rounded-2xl medical-gradient text-white font-bold text-lg flex items-center justify-center space-x-2 shadow-lg shadow-primary/25"
      >
        <span>{current === steps.length - 1 ? "Commencer" : "Suivant"}</span>
        <ArrowRight size={20} />
      </motion.button>
    </div>
  );
}
