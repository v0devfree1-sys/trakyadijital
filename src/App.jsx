import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import SiteLayout from '@/components/SiteLayout';
import { LanguageProvider } from '@/lib/i18n';
import Home from '@/pages/Home';
import Sectors from '@/pages/Sectors';
import CaseStudies from '@/pages/CaseStudies';
import CaseStudyDetail from '@/pages/CaseStudyDetail';
import Paketler from '@/pages/Paketler';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import Contact from '@/pages/Contact';
import Isletmeler from '@/pages/Isletmeler';
import AIChat from '@/pages/AIChat';
import GizlilikPolitikasi from '@/pages/GizlilikPolitikasi';
import CerezPolitikasi from '@/pages/CerezPolitikasi';
import KullanimKosullari from '@/pages/KullanimKosullari';
import Hakkimizda from '@/pages/Hakkimizda';
import SSS from '@/pages/SSS';
import HizmetDetay from '@/pages/HizmetDetay';
import TrakyaWebTasarim from '@/pages/TrakyaWebTasarim';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import AdminLayout from '@/pages/admin/AdminLayout';
import Hesabim from '@/pages/Hesabim';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminBlog from '@/pages/admin/AdminBlog';
import AdminCases from '@/pages/admin/AdminCases';
import AdminLeads from '@/pages/admin/AdminLeads';
import AdminQuotes from '@/pages/admin/AdminQuotes';
import AdminBusinesses from '@/pages/admin/AdminBusinesses';
import AdminAppointments from '@/pages/admin/AdminAppointments';
import Randevu from '@/pages/Randevu';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/sektorler" element={<Sectors />} />
      <Route path="/iz-biraktiklarimiz" element={<CaseStudies />} />
      <Route path="/iz-biraktiklarimiz/:id" element={<CaseStudyDetail />} />
      <Route path="/paketler" element={<Paketler />} />
      <Route path="/dijital-izler" element={<Navigate to="/iz-biraktiklarimiz" replace />} />
    <Route path="/dijital-izler/:id" element={<Navigate to="/iz-biraktiklarimiz" replace />} />
    <Route path="/vaka-analizleri" element={<Navigate to="/iz-biraktiklarimiz" replace />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/iletisim" element={<Contact />} />
      <Route path="/randevu" element={<Randevu />} />
      <Route path="/isletmeler" element={<Isletmeler />} />
      <Route path="/ai-asistan" element={<AIChat />} />
      <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
      <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
      <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
      <Route path="/hakkimizda" element={<Hakkimizda />} />
      <Route path="/sss" element={<SSS />} />
      <Route path="/hizmetler/:slug" element={<HizmetDetay />} />
      <Route path="/trakya-web-tasarim" element={<TrakyaWebTasarim />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
      <Route path="/hesabim" element={<Hesabim />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="vakalar" element={<AdminCases />} />
        <Route path="talepler" element={<AdminLeads />} />
        <Route path="teklifler" element={<AdminQuotes />} />
        <Route path="randevular" element={<AdminAppointments />} />
        <Route path="isletmeler" element={<AdminBusinesses />} />
      </Route>
    </Route>
    <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <LanguageProvider>
            <AuthenticatedApp />
          </LanguageProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App