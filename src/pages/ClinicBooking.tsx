import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Building2,
  MapPin,
  Star,
  Clock,
  Stethoscope,
  HeartPulse,
  Syringe,
  Microscope,
} from 'lucide-react';
import { CLINICS } from '../constants';

const services = [
  { name: 'Urgence', icon: HeartPulse, color: 'bg-red-100 text-red-500' },
  { name: 'Radiologie', icon: Microscope, color: 'bg-blue-100 text-blue-500' },
  { name: 'Vaccination', icon: Syringe, color: 'bg-green-100 text-green-500' },
  { name: 'Généraliste', icon: Stethoscope, color: 'bg-purple-100 text-purple-500' },
];

export default function ClinicBooking() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-full pb-12 p-6">
      <div className="flex items-center mb-10">
        <button
          onClick={() => navigate('/home')}
          className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-2xl font-display font-bold mr-10">Cliniques</h1>
      </div>

      <div className="space-y-8">
        {/* Featured Specialities */}
        <section>
          <h3 className="text-lg font-bold mb-5">Services disponibles</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {services.map((s, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                className="min-w-[100px] bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex flex-col items-center space-y-3"
              >
                <div className={`p-3 rounded-2xl ${s.color}`}>
                  <s.icon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide">{s.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Clinics List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Cliniques autour de vous</h3>
            <button className="text-primary text-xs font-bold uppercase">Sur la carte</button>
          </div>

          <div className="space-y-6">
            {CLINICS.map(clinic => (
              <motion.div
                key={clinic.id}
                whileTap={{ scale: 0.98 }}
                className="card-minimal p-6 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden shadow-md ring-4 ring-slate-50">
                    <img
                      src={clinic.photo}
                      alt={clinic.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 ml-5">
                    <h4 className="text-lg font-bold text-slate-900 leading-tight mb-1">
                      {clinic.name}
                    </h4>
                    <div className="flex items-center text-xs text-slate-500 font-bold tracking-tight mb-3">
                      <MapPin size={12} className="mr-1 text-primary" />
                      <span>{clinic.distance}</span>
                      <span className="mx-2 opacity-20">|</span>
                      <Star size={12} className="mr-1 text-yellow-400 fill-yellow-400" />
                      <span>{clinic.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {clinic.services.map(s => (
                        <span
                          key={s}
                          className="px-2.5 py-1 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-bold uppercase tracking-wider"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4">
                  <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-wide">
                    <Clock size={14} />
                    <span>Ouvert jusque 21h</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20"
                  >
                    Réserver RDV
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Promotion */}
        <div className="bg-medical-dark p-8 rounded-[3rem] text-white relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <h3 className="text-2xl font-bold">Téléconsultation</h3>
            <p className="text-sm opacity-60 font-normal leading-relaxed">
              Consultez nos spécialistes depuis chez vous. Rapide, sécurisé et efficace.
            </p>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl text-sm font-bold mt-4 hover:bg-white/20 transition-all">
              Démarrer maintenant
            </button>
          </div>
          <Building2 size={150} className="absolute -right-12 -bottom-10 opacity-10 rotate-12" />
        </div>
      </div>
    </div>
  );
}
