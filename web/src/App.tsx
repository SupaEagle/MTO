import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AgencyLayout from './layouts/AgencyLayout';
import ClientLayout from './layouts/ClientLayout';
import AgencyDashboard from './pages/AgencyDashboard';
import Analytics from './pages/agency/Analytics';
import GoalSetting from './pages/agency/GoalSetting';
import PersonaBuilder from './pages/agency/PersonaBuilder';
import ContentWizard from './pages/agency/ContentWizard';
import TemplateLibrary from './pages/agency/TemplateLibrary';
import ClientDashboard from './pages/ClientDashboard';
import ApprovalLoop from './pages/client/ApprovalLoop';
import Calendar from './pages/client/Calendar';
import Inbox from './pages/client/Inbox';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Agency Routes */}
        <Route path="/agency" element={<AgencyLayout />}>
          <Route index element={<AgencyDashboard />} />
          <Route path="strategy" element={<GoalSetting />} />
          <Route path="personas" element={<PersonaBuilder />} />
          <Route path="content" element={<ContentWizard />} />
          <Route path="templates" element={<TemplateLibrary />} />
          <Route path="analytics" element={<Analytics />} />
          {/* Add more agency routes here */}
        </Route>

        {/* Client Routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="approval" element={<ApprovalLoop />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="inbox" element={<Inbox />} />
          {/* Add more client routes here */}
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
