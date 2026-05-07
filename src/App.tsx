import { ReactNode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Home,
  Truck,
  ShoppingCart,
  Building2,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from './lib/utils';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/ToastContainer';
import { useAuthInit } from './hooks/useAuthInit';

// Pages
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import PatientHome from './pages/PatientHome';
import DoctorProfile from './pages/DoctorProfile';
import Consultation from './pages/Consultation';
import PharmacyMarket from './pages/PharmacyMarket';
import PrescriptionUpload from './pages/PrescriptionUpload';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import ClinicBooking from './pages/ClinicBooking';
import Dashboards from './pages/Dashboards';

const NavItem = ({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: string;
  icon: any;
  label: string;
  active: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate(to)}
      className={cn(
        'flex flex-col items-center justify-center space-y-1.5 transition-all w-16 h-full relative cursor-pointer',
        active ? 'text-primary' : 'text-slate-300'
      )}
    >
      <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[9px] font-bold uppercase tracking-wider leading-none">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="w-1.5 h-1.5 rounded-full bg-primary absolute -bottom-1"
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        />
      )}
    </motion.button>
  );
};

const Navigation = () => {
  const location = useLocation();
  const hideNav = ['/', '/login', '/onboarding', '/consultation'].includes(location.pathname);

  if (hideNav) return null;

  return (
    <nav className="glass-morphism h-20 flex items-center justify-around px-4 relative z-50 safe-area-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
      <NavItem to="/home" icon={Home} label="Home" active={location.pathname === '/home'} />
      <NavItem
        to="/marketplace"
        icon={ShoppingCart}
        label="Pharma"
        active={location.pathname === '/marketplace'}
      />
      <NavItem
        to="/clinics"
        icon={Building2}
        label="Clinics"
        active={location.pathname === '/clinics'}
      />
      <NavItem
        to="/tracking"
        icon={Truck}
        label="Track"
        active={location.pathname === '/tracking'}
      />
      <NavItem
        to="/dashboards"
        icon={LayoutDashboard}
        label="Admin"
        active={location.pathname.startsWith('/dashboards')}
      />
    </nav>
  );
};

function AppContent(): ReactNode {
  const isAuthReady = useAuthInit();

  if (!isAuthReady) {
    return (
      <div className="mobile-container h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Chargement de la session...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="mobile-container">
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PatientHome />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/marketplace" element={<PharmacyMarket />} />
            <Route path="/prescription" element={<PrescriptionUpload />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/clinics" element={<ClinicBooking />} />
            <Route path="/dashboards/*" element={<Dashboards />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Navigation />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}
