import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgencyLayout from './layouts/AgencyLayout';
import ClientLayout from './layouts/ClientLayout';
import AgencyDashboard from './pages/AgencyDashboard';
import Analytics from './pages/agency/Analytics';
import GoalSetting from './pages/agency/GoalSetting';
import PersonaBuilder from './pages/agency/PersonaBuilder';
import ContentWizard from './pages/agency/ContentWizard';
import TemplateLibrary from './pages/agency/TemplateLibrary';
import ManagerDashboard from './pages/agency/ManagerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ApprovalLoop from './pages/client/ApprovalLoop';
import Calendar from './pages/client/Calendar';
import Inbox from './pages/client/Inbox';
import BrandVoiceCalibration from './pages/client/BrandVoiceCalibration';
import CoreIdentity from './pages/client/CoreIdentity';
import BrandPersona from './pages/client/BrandPersona';
import StrategicDifferentiation from './pages/client/StrategicDifferentiation';
import ContentPillars from './pages/client/ContentPillars';
import CompetitorRecon from './pages/client/CompetitorRecon';
import BrandReport from './pages/client/BrandReport';
import CreativeStudio from './pages/client/CreativeStudio';
import AudienceDefinition from './pages/client/AudienceDefinition';
import ValuePropBuilder from './pages/client/ValuePropBuilder';
import ScalingFocus from './pages/client/ScalingFocus';
import VisualAssets from './pages/client/VisualAssets';
import VideoOptimization from './pages/client/VideoOptimization';
import SwipeFile from './pages/client/SwipeFile';
import PlatformConfig from './pages/client/PlatformConfig';
import LeadAutomation from './pages/client/LeadAutomation';
import FunnelAnalysis from './pages/client/FunnelAnalysis';
import CompetitorSpy from './pages/client/CompetitorSpy';
import CampaignBuilder from './pages/client/CampaignBuilder';
import BudgetOptimizer from './pages/client/BudgetOptimizer';
import CRMSystem from './pages/client/CRMSystem';
import SupportCenter from './pages/client/SupportCenter';
import TeamSettings from './pages/client/TeamSettings';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import OnboardingWizard from './pages/OnboardingWizard';
import Signup from './pages/Signup';
import DiscoveryWizard from './pages/DiscoveryWizard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Agency Routes */}
        <Route path="/agency" element={<AgencyLayout />}>
          <Route index element={<AgencyDashboard />} />
          <Route path="strategy" element={<GoalSetting />} />
          <Route path="personas" element={<PersonaBuilder />} />
          <Route path="content-wizard" element={<ContentWizard />} />
          <Route path="templates" element={<TemplateLibrary />} />
          <Route path="manager" element={<ManagerDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          {/* Add more agency routes here */}
        </Route>

        {/* Client Routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="approval" element={<ApprovalLoop />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="strategy/voice" element={<BrandVoiceCalibration />} />
          <Route path="strategy/identity" element={<CoreIdentity />} />
          <Route path="strategy/persona" element={<BrandPersona />} />
          <Route path="strategy/differentiation" element={<StrategicDifferentiation />} />
          <Route path="strategy/content-pillars" element={<ContentPillars />} />
          <Route path="strategy/competitors" element={<CompetitorRecon />} />
          <Route path="strategy/reports" element={<BrandReport />} />
          <Route path="creative-studio" element={<CreativeStudio />} />
          <Route path="strategy/audience" element={<AudienceDefinition />} />
          <Route path="strategy/value-prop" element={<ValuePropBuilder />} />
          <Route path="strategy/scaling" element={<ScalingFocus />} />
          <Route path="creative/visuals" element={<VisualAssets />} />
          <Route path="creative/video" element={<VideoOptimization />} />
          <Route path="creative/swipe" element={<SwipeFile />} />
          <Route path="engagement/platforms" element={<PlatformConfig />} />
          <Route path="engagement/automation" element={<LeadAutomation />} />
          <Route path="analytics/funnel" element={<FunnelAnalysis />} />
          <Route path="analytics/competitors" element={<CompetitorSpy />} />
          <Route path="ads/campaigns" element={<CampaignBuilder />} />
          <Route path="ads/budget" element={<BudgetOptimizer />} />
          <Route path="crm" element={<CRMSystem />} />
          <Route path="support" element={<SupportCenter />} />
          <Route path="settings/team" element={<TeamSettings />} />
        </Route>

        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/discovery" element={<DiscoveryWizard />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
