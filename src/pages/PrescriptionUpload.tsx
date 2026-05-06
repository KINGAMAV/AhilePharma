import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Upload, 
  Camera, 
  FileText, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { analyzePrescription } from '../services/geminiService';

export default function PrescriptionUpload() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzePrescription(image);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setAnalysisResult("Désolé, une erreur est survenue lors de l'analyse.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-full p-6 pb-12">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-xl font-display font-bold mr-10">Scanner Ordonnance</h1>
      </div>

      <div className="space-y-6">
        {/* Upload Box */}
        {!image ? (
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="h-96 w-full rounded-[2.5rem] border-4 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center p-10 text-center space-y-4 group-hover:border-primary/50 transition-all">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Camera size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Prendre une photo</h3>
              <p className="text-slate-400 text-sm font-normal">Scannez votre ordonnance papier pour commander vos médicaments en un clic.</p>
              <div className="pt-4">
                <span className="text-primary font-bold decoration-2 underline underline-offset-4">Parcourir les fichiers</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden shadow-xl ring-4 ring-white">
              <img src={image} className="w-full h-full object-cover" alt="Ordonnance" />
              <button 
                onClick={() => { setImage(null); setAnalysisResult(null); }}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full backdrop-blur-md"
              >
                <ChevronLeft className="rotate-90" size={20} />
              </button>
            </div>

            {!analysisResult && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full h-16 rounded-2xl medical-gradient text-white font-bold text-lg flex items-center justify-center space-x-3 shadow-lg shadow-primary/25 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>IA analyse votre ordonnance...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={22} />
                    <span>Analyser par l'IA</span>
                  </>
                )}
              </motion.button>
            )}
          </div>
        )}

        {/* AI Results */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-primary/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FileText size={120} className="text-primary" />
              </div>
              
              <div className="flex items-center space-x-2 text-primary mb-6">
                <Sparkles size={18} />
                <span className="font-bold uppercase tracking-wider text-xs">Analyse de l'Assistant IA</span>
              </div>

              <div className="prose prose-sm text-slate-600 leading-relaxed font-normal mb-8">
                {analysisResult.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-slate-500 text-xs bg-slate-50 p-4 rounded-2xl">
                  <AlertCircle size={16} className="text-secondary shrink-0 mt-0.5" />
                  <p>Cette analyse est fournie par une IA. Veuillez confirmer ces médicaments avec le panier final.</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/marketplace')}
                  className="w-full h-14 rounded-xl bg-medical-dark text-white font-bold flex items-center justify-center space-x-2"
                >
                  <span>Passer à la pharmacie</span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="font-bold text-sm">Sécurisé</h4>
            <p className="text-[10px] text-slate-400">Vos données médicales sont cryptées.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col space-y-2">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-500 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="font-bold text-sm">Rapide</h4>
            <p className="text-[10px] text-slate-400">Analyse en moins de 10 secondes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
