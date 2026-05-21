import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PaymentsPage from './pages/PaymentsPage';
import PayoutsPage from './pages/PayoutsPage';
import ReportsPage from './pages/ReportsPage';
import InvoicesPage from './pages/InvoicesPage';
import SettingsPage from './pages/SettingsPage';
import DeveloperSettingsPage from './pages/DeveloperSettingsPage';
import OrdersPage from './pages/OrdersPage';
import ReconciliationPage from './pages/ReconciliationPage';
import StatementPage from './pages/StatementPage';
import WalletHistoryPage from './pages/WalletHistoryPage';
import HelpSupportPage from './pages/HelpSupportPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardLayout from './components/DashboardLayout';
import { UserProvider } from '@/api/context/UserContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="payouts" element={<PayoutsPage />} />
            <Route path="reconciliation" element={<ReconciliationPage />} />
            <Route path="statement" element={<StatementPage />} />
            <Route path="wallet-history" element={<WalletHistoryPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="developer-settings" element={<DeveloperSettingsPage />} />
            <Route path="help-support" element={<HelpSupportPage />} />
          </Route>

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            background: '#fff',
            color: '#272727',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          success: {
            style: {
              border: '1px solid #124CBE',
              color: '#124CBE',
            },
            iconTheme: {
              primary: '#124CBE',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              border: '1px solid #EF4444',
              color: '#EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </UserProvider>
  );
}

export default App;

