import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Package,
  Users,
  TrendingUp,
  Settings,
  Pill,
  ShoppingBag,
  Truck,
  MapPin,
  ChevronRight,
  Stethoscope,
  CalendarCheck,
} from 'lucide-react';

const AdminOverview = () => (
  <div className="p-8 space-y-8 bg-[#F0F4F8] min-h-full">
    <h2 className="text-2xl font-display font-bold text-slate-900 px-2">Tableau de Bord Admin</h2>
    <div className="grid grid-cols-2 gap-6">
      {[
        { label: 'Utilisateurs', val: '12.4k', icon: Users, color: 'bg-blue-50 text-[#1D9BF0]' },
        {
          label: 'Commandes',
          val: '845',
          icon: ShoppingBag,
          color: 'bg-purple-50 text-purple-600',
        },
        { label: 'Pharmacies', val: '56', icon: Pill, color: 'bg-teal-50 text-[#2AC1C8]' },
        { label: 'Docteurs', val: '124', icon: Stethoscope, color: 'bg-orange-50 text-orange-600' },
      ].map((s, i) => (
        <div key={i} className="card-minimal p-6 flex flex-col items-center text-center">
          <div
            className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mb-4 shadow-sm font-bold`}
          >
            <s.icon size={28} />
          </div>
          <p className="text-2xl font-display font-bold text-slate-900 tracking-tight">{s.val}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {s.label}
          </p>
        </div>
      ))}
    </div>

    <div className="card-minimal p-8 space-y-6">
      <h3 className="font-bold text-lg border-b border-slate-50 pb-4">Actions Récentes</h3>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                <Settings size={16} />
              </div>
              <span className="text-sm font-medium text-slate-600 italic">
                Mise à jour système API Gateway
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">2m ago</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PharmacyDashboard = () => (
  <div className="p-8 space-y-8 bg-[#F0F4F8] min-h-full">
    <h2 className="text-2xl font-display font-bold text-slate-900">Espace Pharmacie</h2>
    <div className="bg-white p-8 rounded-[2.5rem] shadow-clean border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">
          Chiffre d'affaires (Jour)
        </p>
        <p className="text-3xl font-display font-bold text-[#1D9BF0]">1 245,60 €</p>
      </div>
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1D9BF0] flex items-center justify-center shadow-sm">
        <TrendingUp size={32} />
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-900">Commandes à préparer</h3>
        <span className="text-[10px] font-bold text-primary uppercase">Voir historique</span>
      </div>
      {[1, 2].map(i => (
        <div key={i} className="card-minimal p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3.5 rounded-2xl bg-teal-50 text-[#2AC1C8]`}>
              <Package size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm italic">RDV-#ORD-892</p>
              <p className="text-[10px] text-slate-400 font-medium">
                3 articles • Patient: P. Amavi
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-primary text-white font-bold text-[10px] rounded-xl shadow-md shadow-primary/20 uppercase tracking-wider"
          >
            Préparer
          </motion.button>
        </div>
      ))}
    </div>
  </div>
);

const DeliveryDashboard = () => (
  <div className="p-8 space-y-8 bg-[#F0F4F8] min-h-full">
    <h2 className="text-2xl font-display font-bold text-slate-900">Espace Livreur</h2>
    <div className="relative h-56 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white mb-8">
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
        className="w-full h-full object-cover grayscale-[20%] opacity-80"
        alt="Map"
      />
      <div className="absolute inset-0 bg-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-10 h-10 bg-primary rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white"
        >
          <Truck size={16} />
        </motion.div>
        <div className="mt-2 bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md">
          Votre position
        </div>
      </div>
    </div>

    <div className="card-minimal p-8 space-y-8 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Nouvelle Mission</h3>
        <span className="px-3 py-1 bg-[#EEF2FF] text-[#4F46E5] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#E0E7FF]">
          Prioritaire
        </span>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2AC1C8] flex items-center justify-center shadow-sm">
            <Pill size={20} />
          </div>
          <div className="h-10 w-0.5 bg-slate-100 rounded-full" />
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D9BF0] flex items-center justify-center shadow-sm">
            <MapPin size={20} />
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              Point de collecte
            </p>
            <p className="font-bold text-slate-800 italic">Pharmacie du Centre</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              Destinataire
            </p>
            <p className="font-bold text-slate-800 italic">Patrick Amavi - Paris 15è</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-display font-bold text-primary tracking-tight">8,50 €</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">12 mins</p>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full h-16 rounded-[1.5rem] bg-medical-dark text-white font-bold shadow-2xl shadow-medical-dark/20 flex items-center justify-center gap-3"
      >
        <Truck size={20} />
        <span>Accepter la livraison</span>
      </motion.button>
    </div>
  </div>
);

const DoctorDashboard = () => (
  <div className="p-8 space-y-8 bg-[#F0F4F8] min-h-full">
    <h2 className="text-2xl font-display font-bold text-slate-900">Espace Médecin</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="card-minimal p-6 bg-white">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
          Rdv Aujourd'hui
        </p>
        <p className="text-3xl font-display font-bold text-[#1D9BF0]">08</p>
      </div>
      <div className="card-minimal p-6 bg-white">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
          Nouveaux Messages
        </p>
        <p className="text-3xl font-display font-bold text-[#00B894]">03</p>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900 px-2">Prochains Rendez-vous</h3>
      {[1, 2].map(i => (
        <div key={i} className="card-minimal p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm ring-2 ring-slate-50">
              <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Patient" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm italic">Jean Dupont</p>
              <div className="flex items-center gap-2">
                <CalendarCheck size={12} className="text-primary" />
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                  14:30 - Consultation
                </p>
              </div>
            </div>
          </div>
          <button className="text-[#1D9BF0] font-bold text-[10px] border border-blue-100 px-3 py-1.5 rounded-lg uppercase">
            Détails
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default function Dashboards() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-full">
      <Routes>
        <Route
          index
          element={
            <div className="p-8 space-y-6">
              <h1 className="text-3xl font-display font-bold mb-10">Espaces Dédiés</h1>
              <div className="grid gap-4">
                {[
                  {
                    name: 'Administration',
                    to: 'admin',
                    icon: LayoutDashboard,
                    color: 'bg-medical-dark',
                  },
                  { name: 'Pharmacie', to: 'pharmacy', icon: Pill, color: 'bg-primary' },
                  { name: 'Médecin', to: 'doctor', icon: Stethoscope, color: 'bg-secondary' },
                  { name: 'Livreur', to: 'delivery', icon: Truck, color: 'bg-accent' },
                ].map(d => (
                  <Link
                    key={d.to}
                    to={d.to}
                    className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex items-center justify-between hover:border-primary/30 transition-all border-l-8 border-l-transparent hover:border-l-primary"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 rounded-2xl ${d.color} text-white flex items-center justify-center shadow-lg`}
                      >
                        <d.icon size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{d.name}</h3>
                        <p className="text-xs text-slate-400 font-medium tracking-tight">
                          Accéder à votre espace professionnel
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-slate-300" />
                  </Link>
                ))}
              </div>

              <button
                onClick={() => navigate('/home')}
                className="w-full h-16 rounded-2xl border-2 border-slate-200 text-slate-400 font-bold flex items-center justify-center mt-10"
              >
                Retour à l'Espace Patient
              </button>
            </div>
          }
        />
        <Route path="admin" element={<AdminOverview />} />
        <Route path="pharmacy" element={<PharmacyDashboard />} />
        <Route path="delivery" element={<DeliveryDashboard />} />
        <Route path="doctor" element={<DoctorDashboard />} />
      </Routes>
    </div>
  );
}
