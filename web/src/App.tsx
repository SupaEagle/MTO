import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AgencyLayout from './layouts/AgencyLayout';
import ClientLayout from './layouts/ClientLayout';
import AgencyDashboard from './pages/AgencyDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Agency Routes */}
        <Route path="/agency" element={<AgencyLayout />}>
          <Route index element={<AgencyDashboard />} />
          {/* Add more agency routes here */}
        </Route>

        {/* Client Routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          {/* Add more client routes here */}
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
