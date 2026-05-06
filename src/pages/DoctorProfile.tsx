import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Star,
  Video,
  Award,
  Users,
} from 'lucide-react';
import { DOCTORS } from '../constants';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = DOCTORS.find(d => d.id === id);

  if (!doctor) return <div>Doctor not found</div>;

  return (
    <div className="bg-white min-h-full pb-28">
      {/* Header */}
      <div className="relative">
        <div className="h-80 w-full relative">
          <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-3 rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Info Card */}
      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-slate-900">{doctor.name}</h1>
              <p className="text-primary font-bold">{doctor.speciality}</p>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl flex items-center space-x-1">
              <Star size={14} className="fill-primary" />
              <span className="font-bold text-sm tracking-tight">{doctor.rating}</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-500 py-4 border-t border-slate-100">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-slate-50 rounded-xl mb-2">
                <Users size={20} className="text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-900">{doctor.reviews}+</span>
              <span className="text-[10px] text-slate-400">Patients</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-slate-50 rounded-xl mb-2">
                <Award size={20} className="text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-900">{doctor.experience} ans</span>
              <span className="text-[10px] text-slate-400">Expérience</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-slate-50 rounded-xl mb-2">
                <Star size={20} className="text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-900">{doctor.rating}</span>
              <span className="text-[10px] text-slate-400">Note</span>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="px-6 mt-8">
        <h3 className="text-xl font-bold mb-3">À propos</h3>
        <p className="text-slate-500 leading-relaxed font-normal">
          Le {doctor.name} est un expert reconnu en {doctor.speciality.toLowerCase()} avec plus de{' '}
          {doctor.experience} ans d'expérience clinique. Spécialisé dans les approches
          thérapeutiques modernes.
        </p>
      </div>

      {/* Availability */}
      <div className="mt-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Disponibilités</h3>
          <button className="text-primary font-bold text-sm">Octobre</button>
        </div>
        <div className="flex space-x-3 overflow-x-auto px-6 scrollbar-hide">
          {doctor.availability.map(time => (
            <motion.button
              key={time}
              whileTap={{ scale: 0.95 }}
              className="min-w-[80px] h-12 rounded-xl border border-slate-100 flex items-center justify-center font-bold text-slate-800 hover:border-primary hover:text-primary transition-all"
            >
              {time}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fixed Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex space-x-4 z-20 safe-area-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/consultation')}
          className="flex-1 h-14 rounded-2xl border-2 border-primary text-primary font-bold flex items-center justify-center space-x-2 shadow-sm"
        >
          <Video size={20} />
          <span>Vidéo</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex-[2] h-14 rounded-2xl medical-gradient text-white font-bold flex items-center justify-center shadow-lg shadow-primary/25"
        >
          <span>Réserver un RDV</span>
        </motion.button>
      </div>
    </div>
  );
}
