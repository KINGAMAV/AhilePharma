import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Stethoscope, 
  Pill, 
  FileText, 
  Building2, 
  Bell, 
  ChevronRight,
  Star,
  MapPin
} from 'lucide-react';
import { cn } from '../lib/utils';
import { DOCTORS, PHARMACIES } from '../constants';

const QuickAction = ({ icon: Icon, label, bgColor, textColor, onClick }: { icon: any, label: string, bgColor: string, textColor: string, onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex flex-col items-center space-y-4 p-5 card-minimal min-w-[90px] flex-1"
  >
    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm", bgColor, textColor)}>
      <Icon size={28} />
    </div>
    <span className="text-[10px] font-bold text-slate-800 text-center leading-tight uppercase tracking-tighter">{label}</span>
  </motion.button>
);

export default function PatientHome() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F0F4F8] min-h-full pb-24">
      {/* Header */}
      <div className="p-8 pb-4 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Bonjour,</p>
          <h1 className="text-2xl font-display font-bold text-slate-900">Patrick Amavi 👋</h1>
        </div>
        <div className="flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-xl bg-white shadow-clean border border-slate-100 flex items-center justify-center relative"
          >
            <Bell size={20} className="text-slate-500" />
            <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-[#FF4757] border-2 border-white rounded-full" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/profile')}
            className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm"
          >
            <img src="https://ui-avatars.com/api/?name=Patrick+Amavi&background=2AC1C8&color=fff" alt="Profile" />
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-8 mb-8">
        <div className="flex items-center bg-white rounded-full px-6 py-2 shadow-clean border border-slate-100 focus-within:border-primary/30 transition-all">
          <Search className="text-slate-400 mr-3" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher médecins, pharmacies..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full h-10 font-medium text-slate-600 outline-none"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-8 mb-10">
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-900">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          Actions Rapides
        </h2>
        <div className="flex gap-4">
          <QuickAction icon={Stethoscope} label="Rdv" bgColor="bg-blue-50" textColor="text-[#1D9BF0]" onClick={() => navigate('/clinics')} />
          <QuickAction icon={Pill} label="Med" bgColor="bg-teal-50" textColor="text-[#2AC1C8]" onClick={() => navigate('/marketplace')} />
          <QuickAction icon={FileText} label="Scan" bgColor="bg-green-50" textColor="text-[#00B894]" onClick={() => navigate('/prescription')} />
          <QuickAction icon={Building2} label="Clinique" bgColor="bg-slate-50" textColor="text-slate-600" onClick={() => navigate('/clinics')} />
        </div>
      </div>

      {/* Banner */}
      <div className="px-8 mt-8">
        <div className="bg-medical-dark p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-medical-dark/20">
          <div className="relative z-10 w-2/3 space-y-4">
            <span className="bg-[#00B894] px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">Offre Limitée</span>
            <h3 className="text-2xl font-bold leading-tight">Bilan de santé annuel à -30%</h3>
            <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl text-xs font-bold shadow-xl">
              Consulter plus
            </button>
          </div>
          <Building2 size={160} className="absolute -right-16 -bottom-10 opacity-10 pointer-events-none rotate-12" />
        </div>
      </div>

      {/* Nearby Pharmacies */}
      <div className="mt-12">
        <div className="px-8 flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">En ce moment</h3>
          <button onClick={() => navigate('/marketplace')} className="text-sm font-bold text-primary">Tout voir</button>
        </div>
        <div className="flex space-x-6 overflow-x-auto px-8 pb-4 scrollbar-hide">
          {PHARMACIES.map((pharmacy) => (
            <motion.div 
              key={pharmacy.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/marketplace')}
              className="min-w-[280px] card-minimal p-5 cursor-pointer"
            >
              <div className="h-40 rounded-[1.5rem] overflow-hidden mb-4 shadow-sm">
                <img src={pharmacy.photo} alt={pharmacy.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-1">{pharmacy.name}</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-slate-400 font-bold tracking-tight">
                  <MapPin size={14} className="mr-1 text-primary" />
                  <span>{pharmacy.distance}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-slate-800">{pharmacy.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Doctors */}
      <div className="mt-10 px-8 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Médecins Disponibles</h3>
          <button onClick={() => navigate('/clinics')} className="text-sm font-bold text-primary">Tout voir</button>
        </div>
        <div className="space-y-4">
          {DOCTORS.map((doctor) => (
            <motion.button 
              key={doctor.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              className="w-full card-minimal p-5 flex items-center space-x-5"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm ring-4 ring-slate-50">
                <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{doctor.speciality}</p>
                <h4 className="font-bold text-slate-900 text-lg leading-tight mb-2">{doctor.name}</h4>
                <div className="flex items-center justify-between pr-4">
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">{doctor.rating}</span>
                    <span className="text-[10px] text-slate-400">({doctor.reviews})</span>
                  </div>
                  <span className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded-lg font-bold">DISPONIBLE</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
