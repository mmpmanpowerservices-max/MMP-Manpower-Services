import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { PaymentModal } from './components/common/PaymentModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FindJobsPage } from './pages/FindJobsPage';
import { WorkforceDirectoryPage } from './pages/WorkforceDirectoryPage';
import { CandidateRegisterPage } from './pages/CandidateRegisterPage';
import { CandidateMembershipPage } from './pages/CandidateMembershipPage';
import { JobAlertsPage } from './pages/JobAlertsPage';
import { FastTrackPage } from './pages/FastTrackPage';
import { SkillAssessmentsPage } from './pages/SkillAssessmentsPage';
import { CandidateDashboardPage } from './pages/CandidateDashboardPage';
import { EmployersPage } from './pages/EmployersPage';
import { ClientMembershipPage } from './pages/ClientMembershipPage';
import { PostVacancyPage } from './pages/PostVacancyPage';
import { RecruitmentServicesPage } from './pages/RecruitmentServicesPage';
import { EmployerDashboardPage } from './pages/EmployerDashboardPage';
import { RecruitSaathiPage } from './pages/RecruitSaathiPage';
import { MmpShieldPage } from './pages/MmpShieldPage';
import { FranchisePage } from './pages/FranchisePage';
import { ContactPage } from './pages/ContactPage';
import { AdminErpPage } from './pages/AdminErpPage';
import { PolicyPages } from './pages/PolicyPages';

import {
  CandidateMembershipPlan,
  ClientMembershipPlan,
  JobAlertPlan,
  PaymentTransaction,
} from './types';

function AppContent() {
  const { currentCandidateId, currentEmployerId, candidates, employers } = useApp();
  const [activePage, setActivePage] = useState<string>('home');

  // Payment modal state
  const [paymentConfig, setPaymentConfig] = useState<{
    userType: 'Candidate' | 'Employer';
    userId: string;
    userName: string;
    serviceType: PaymentTransaction['serviceType'];
    planName: string;
    amount: number;
    durationDays?: number;
    features?: string[];
  } | null>(null);

  // Active candidate and employer objects
  const activeCandidate =
    candidates.find((c) => c.id === currentCandidateId) || candidates[0];
  const activeEmployer =
    employers.find((e) => e.id === currentEmployerId) || employers[0];

  const handleSelectCandidatePlan = (plan: CandidateMembershipPlan) => {
    setPaymentConfig({
      userType: 'Candidate',
      userId: activeCandidate?.id || 'MMP-CAN-100234',
      userName: activeCandidate?.fullName || 'Candidate Member',
      serviceType: 'Candidate Membership',
      planName: `${plan.name} (${plan.duration})`,
      amount: plan.price,
      durationDays: plan.duration.includes('Year') ? 365 : plan.duration.includes('6') ? 180 : 90,
      features: plan.features,
    });
  };

  const handleSelectAlertPlan = (plan: JobAlertPlan) => {
    const priceNum = typeof plan.price === 'number' ? plan.price : 499;
    setPaymentConfig({
      userType: 'Candidate',
      userId: activeCandidate?.id || 'MMP-CAN-100234',
      userName: activeCandidate?.fullName || 'Candidate Member',
      serviceType: 'Job Alerts',
      planName: `Job Alert ${plan.name} (${plan.frequency})`,
      amount: priceNum,
      durationDays: 90,
      features: plan.features,
    });
  };

  const handleOpenFastTrackPayment = () => {
    setPaymentConfig({
      userType: 'Candidate',
      userId: activeCandidate?.id || 'MMP-CAN-100234',
      userName: activeCandidate?.fullName || 'Candidate Member',
      serviceType: 'Fast Track',
      planName: 'MMP Fast Track Service (Expedited Screening & Placement)',
      amount: 3400,
      durationDays: 180,
    });
  };

  const handleSelectClientPlan = (plan: ClientMembershipPlan) => {
    setPaymentConfig({
      userType: 'Employer',
      userId: activeEmployer?.id || 'MMP-CLI-800121',
      userName: activeEmployer?.companyName || 'Corporate Client',
      serviceType: 'Client Membership',
      planName: `Client ${plan.name} Plan (${plan.duration})`,
      amount: plan.price,
      durationDays: plan.duration.includes('Year') || plan.duration.includes('12') ? 365 : 180,
      features: plan.features,
    });
  };

  const handleOpenEmployerFeePayment = (empData: any) => {
    setPaymentConfig({
      userType: 'Employer',
      userId: empData.userId,
      userName: empData.userName,
      serviceType: 'Employer Registration Fee',
      planName: 'Annual Employer Registration & Verification (1-Year Validity)',
      amount: 3000,
      durationDays: 365,
    });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'about':
        return <AboutPage setActivePage={setActivePage} />;
      case 'find-jobs':
        return <FindJobsPage setActivePage={setActivePage} />;
      case 'workforce-directory':
        return <WorkforceDirectoryPage setActivePage={setActivePage} />;
      case 'candidate-register':
        return <CandidateRegisterPage setActivePage={setActivePage} />;
      case 'candidate-membership':
        return (
          <CandidateMembershipPage
            setActivePage={setActivePage}
            onSelectPlan={handleSelectCandidatePlan}
          />
        );
      case 'job-alerts':
        return (
          <JobAlertsPage
            setActivePage={setActivePage}
            onSelectAlertPlan={handleSelectAlertPlan}
          />
        );
      case 'fast-track':
        return (
          <FastTrackPage
            setActivePage={setActivePage}
            onOpenFastTrackPayment={handleOpenFastTrackPayment}
          />
        );
      case 'skill-assessments':
        return <SkillAssessmentsPage setActivePage={setActivePage} />;
      case 'candidate-dashboard':
        return <CandidateDashboardPage setActivePage={setActivePage} />;
      case 'employers':
        return (
          <EmployersPage
            setActivePage={setActivePage}
            onOpenEmployerFeePayment={handleOpenEmployerFeePayment}
          />
        );
      case 'client-membership':
        return (
          <ClientMembershipPage
            setActivePage={setActivePage}
            onSelectClientPlan={handleSelectClientPlan}
          />
        );
      case 'post-vacancy':
        return <PostVacancyPage setActivePage={setActivePage} />;
      case 'recruitment-services':
        return <RecruitmentServicesPage setActivePage={setActivePage} />;
      case 'employer-dashboard':
        return <EmployerDashboardPage setActivePage={setActivePage} />;
      case 'recruit-saathi':
        return <RecruitSaathiPage setActivePage={setActivePage} />;
      case 'mmp-shield':
        return <MmpShieldPage setActivePage={setActivePage} />;
      case 'franchise':
        return <FranchisePage setActivePage={setActivePage} />;
      case 'contact':
        return <ContactPage setActivePage={setActivePage} />;
      case 'admin-erp':
        return <AdminErpPage setActivePage={setActivePage} />;
      case 'terms':
        return <PolicyPages pageType="terms" setActivePage={setActivePage} />;
      case 'privacy':
        return <PolicyPages pageType="privacy" setActivePage={setActivePage} />;
      case 'refund':
        return <PolicyPages pageType="refund" setActivePage={setActivePage} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1">{renderPage()}</main>

      <Footer setActivePage={setActivePage} />

      {/* Global Payment Checkout Modal */}
      {paymentConfig && (
        <PaymentModal
          userType={paymentConfig.userType}
          userId={paymentConfig.userId}
          userName={paymentConfig.userName}
          serviceType={paymentConfig.serviceType}
          planName={paymentConfig.planName}
          amount={paymentConfig.amount}
          durationDays={paymentConfig.durationDays}
          features={paymentConfig.features}
          onClose={() => setPaymentConfig(null)}
          onSuccess={() => {
            // keep open for invoice view, handled within modal
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
