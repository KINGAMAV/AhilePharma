import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  MapPin,
  CreditCard,
  Truck,
  Building,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('card');

  const handleOrder = () => {
    setStep(3);
    setTimeout(() => {
      navigate('/tracking');
    }, 2500);
  };

  if (step === 3) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 text-center bg-white">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-32 h-32 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-10"
        >
          <CheckCircle2 size={64} />
        </motion.div>
        <h1 className="text-3xl font-display font-bold mb-4">Commande Confirmée !</h1>
        <p className="text-slate-500 leading-relaxed italic mb-10 font-normal">
          Votre commande a été transmise à la Pharmacie du Centre. Un livreur sera assigné
          prochainement.
        </p>
        <div className="w-full bg-slate-50 rounded-3xl p-6 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Clock className="text-primary" size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Livraison estimée</p>
              <p className="text-xs text-slate-400">Arrivée dans 25-35 mins</p>
            </div>
          </div>
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <Truck className="text-primary" size={24} />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-full pb-32">
      <div className="bg-white p-6 pb-4 flex items-center border-b border-slate-50">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-xl font-display font-bold mr-10">Paiement</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col items-center space-y-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}
            >
              1
            </div>
            <span className="text-[10px] uppercase tracking-tighter font-bold text-slate-500">
              Adresse
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-slate-200 mx-2" />
          <div className="flex flex-col items-center space-y-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}
            >
              2
            </div>
            <span className="text-[10px] uppercase tracking-tighter font-bold text-slate-500">
              Paiement
            </span>
          </div>
        </div>

        {/* Address */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold">Adresse de livraison</h3>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-50 flex items-start space-x-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <MapPin size={22} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">Maison</h4>
              <p className="text-xs text-slate-500 font-normal">
                14 Avenue des Marronniers, Paris 75015
              </p>
            </div>
            <button className="text-primary text-xs font-bold underline">Changer</button>
          </div>
        </section>

        {/* Pharmacy Info */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold">Pharmacie sélectionnée</h3>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-50 flex items-center space-x-4">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
              <Building size={22} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">Pharmacie du Centre</h4>
              <p className="text-xs text-slate-500 font-normal">À 1.2 km de vous</p>
            </div>
            <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-[10px] font-bold">
              OUVERT
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold">Méthode de paiement</h3>
          <div className="space-y-3">
            {[
              { id: 'card', name: 'Carte Bancaire', icon: CreditCard, color: 'bg-blue-500' },
              {
                id: 'apple',
                name: 'Apple Pay',
                icon: () => (
                  <img
                    src="https://www.svgrepo.com/show/475638/apple-color.svg"
                    className="w-5 h-5"
                    alt="Apple"
                  />
                ),
                color: 'bg-black',
              },
              { id: 'cash', name: 'Espèces à la livraison', icon: Truck, color: 'bg-green-500' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPayment(p.id)}
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${selectedPayment === p.id ? 'border-primary bg-primary/5' : 'border-white bg-white shadow-sm'}`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${p.color}`}
                  >
                    {typeof p.icon === 'function' ? p.icon({ size: 20 }) : null}
                  </div>
                  <span className="font-bold text-slate-800">{p.name}</span>
                </div>
                {selectedPayment === p.id && <CheckCircle2 className="text-primary" size={20} />}
              </button>
            ))}
          </div>
        </section>

        {/* Total */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 space-y-3 mt-4">
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Sous-total</span>
            <span>18,50 €</span>
          </div>
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Livraison</span>
            <span>2,99 €</span>
          </div>
          <div className="h-px bg-slate-100 my-1" />
          <div className="flex justify-between text-slate-900 font-bold text-xl">
            <span>Total</span>
            <span>21,49 €</span>
          </div>
        </div>
      </div>

      {/* Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 z-20 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleOrder}
          className="w-full h-16 rounded-2xl medical-gradient text-white font-bold text-lg shadow-lg shadow-primary/25"
        >
          Confirmer et Payer
        </motion.button>
      </div>
    </div>
  );
}
