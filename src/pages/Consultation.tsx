import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Send,
  Sparkles,
  FilePlus,
} from 'lucide-react';
import { medicalAssistantChat } from '../services/geminiService';

export default function Consultation() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    {
      role: 'model',
      text: 'Bonjour ! Je suis votre assistant médical IA. Comment puis-je vous aider pendant votre consultation avec le Dr. Martin ?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showChat]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      const response = await medicalAssistantChat(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: 'model', text: "Désolé, j'ai rencontré une erreur. Veuillez réessayer." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-slate-900 relative flex flex-col overflow-hidden">
      {/* Remote Video (Doctor) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
          alt="Doctor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Local Video (Self) */}
      <motion.div
        drag
        dragConstraints={{ left: 20, right: 280, top: 60, bottom: 500 }}
        className="absolute top-16 right-6 w-32 h-44 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl z-20 cursor-move"
      >
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80"
          alt="Me"
          className="w-full h-full object-cover"
        />
        {isVideoOff && (
          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
            <VideoOff size={24} className="text-white/50" />
          </div>
        )}
      </motion.div>

      {/* Header */}
      <div className="relative z-10 p-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-2xl bg-black/20 backdrop-blur-md text-white border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-white font-bold">Dr. Sarah Martin</h2>
          <div className="flex items-center justify-center space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/70 text-[10px] font-bold uppercase tracking-wider">
              En direct • 12:45
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowChat(!showChat)}
          className={`p-3 rounded-2xl transition-all ${showChat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-black/20 backdrop-blur-md text-white border border-white/10'}`}
        >
          <MessageSquare size={24} />
        </button>
      </div>

      {/* AI Assistant Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 top-32 bg-white rounded-t-[3rem] z-30 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles size={16} className="text-primary" />
                </div>
                <h3 className="font-bold text-slate-800">Assistant Médical IA</h3>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-slate-400 font-bold text-sm"
              >
                Fermer
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      m.role === 'user'
                        ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/10'
                        : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 flex space-x-2">
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 safe-area-bottom">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                  placeholder="Posez une question à l'IA..."
                  className="flex-1 h-12 px-4 rounded-xl bg-white border border-slate-200 outline-none focus:border-primary text-sm shadow-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-auto p-10 pb-16 flex items-center justify-center space-x-6 relative z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white border border-white/30'}`}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/home')}
          className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/50 text-white"
        >
          <PhoneOff size={32} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/20 text-white border border-white/30'}`}
        >
          {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
        </motion.button>
      </div>

      {/* Quick Doc Actions */}
      <div className="absolute bottom-40 left-0 right-0 px-6 flex justify-center space-x-3 pointer-events-auto z-10">
        <button className="px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-bold flex items-center space-x-1.5 transition-colors hover:bg-white/20">
          <FilePlus size={14} />
          <span>Générer Ordonnance</span>
        </button>
      </div>
    </div>
  );
}
