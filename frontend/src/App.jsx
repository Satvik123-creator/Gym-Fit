import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import Trainers from './pages/Trainers';
import Transformation from './pages/Transformation';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import TrialBooking from './pages/TrialBooking';

import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageTrainers from './pages/admin/ManageTrainers';
import ManagePlans from './pages/admin/ManagePlans';
import ManageGallery from './pages/admin/ManageGallery';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageTransformations from './pages/admin/ManageTransformations';
import Enquiries from './pages/admin/Enquiries';
import TrialBookings from './pages/admin/TrialBookings';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' },
            }}
          />
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/plans" element={<PublicLayout><Membership /></PublicLayout>} />
            <Route path="/trainers" element={<PublicLayout><Trainers /></PublicLayout>} />
            <Route path="/transformation" element={<PublicLayout><Transformation /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/trial-booking" element={<PublicLayout><TrialBooking /></PublicLayout>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="trainers" element={<ManageTrainers />} />
              <Route path="plans" element={<ManagePlans />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
              <Route path="transformations" element={<ManageTransformations />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="trial-bookings" element={<TrialBookings />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}
