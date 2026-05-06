import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export function ToastContainer(): ReactNode {
  const { toasts, removeToast } = useToast();

  const iconMap = {
    error: <AlertCircle size={20} className="text-red-500" />,
    success: <CheckCircle2 size={20} className="text-green-500" />,
    warning: <AlertTriangle size={20} className="text-yellow-500" />,
    info: <Info size={20} className="text-blue-500" />,
  };

  const bgMap = {
    error: 'bg-red-50 border-red-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const textMap = {
    error: 'text-red-900',
    success: 'text-green-900',
    warning: 'text-yellow-900',
    info: 'text-blue-900',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border pointer-events-auto shadow-lg ${bgMap[toast.type]}`}
          >
            {iconMap[toast.type]}
            <span className={`flex-1 font-medium ${textMap[toast.type]}`}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className={`ml-2 p-1 hover:bg-white/50 rounded transition-colors ${textMap[toast.type]}`}
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
