import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useActiveSection } from './hooks/useActiveSection';
import { useReferralTracking } from './lib/analytics';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { CredentialsActivity } from './sections/CredentialsActivity';
import { Academics } from './sections/Academics';
import { Contact } from './sections/Contact';
import { siteConfig } from './data/site';
import { Project, Certificate, EventItem, SchoolRecord } from './data/types';
import { schoolRecords, universityRecord } from './data/academics';

// Modals
import { ProjectModal } from './components/modals/ProjectModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { EventModal } from './components/modals/EventModal';
import { SchoolRecordModal } from './components/modals/SchoolRecordModal';
import { UniversityRecordModal } from './components/modals/UniversityRecordModal';

const sectionIds = ['home', 'about', 'projects', 'skills', 'credentials', 'academics', 'contact'];

export const App: React.FC = () => {
  const activeSection = useActiveSection(sectionIds, 'home');

  // Track inbound social media & referral traffic to Vercel Analytics
  useReferralTracking();

  // Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedSchoolRecord, setSelectedSchoolRecord] = useState<SchoolRecord | null>(null);
  const [isUniversityModalOpen, setIsUniversityModalOpen] = useState(false);

  const handleOpenAcademicRecord = (id: 'btech' | '12th' | '10th') => {
    if (id === 'btech') {
      setIsUniversityModalOpen(true);
    } else if (id === '12th' || id === '10th') {
      setSelectedSchoolRecord(schoolRecords[id]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-ivory text-midnight">
      {/* Vercel Analytics Provider */}
      <Analytics />

      {/* Shared Navigation */}
      <Navbar activeId={activeSection} />

      {/* Main Content with 7 Sections */}
      <main id="main-content" className="flex-1">
        <Hero />
        <About onOpenProject={setSelectedProject} />
        <Projects onOpenProject={setSelectedProject} />
        <Skills />
        <CredentialsActivity
          onOpenCertificate={setSelectedCertificate}
          onOpenEvent={setSelectedEvent}
        />
        <Academics onOpenRecord={handleOpenAcademicRecord} />
        <Contact />
      </main>

      {/* Slim Footer */}
      <Footer name={siteConfig.name} location={siteConfig.location} />

      {/* Modals & Bottom Sheets Host */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        isOpen={Boolean(selectedCertificate)}
        onClose={() => setSelectedCertificate(null)}
      />

      <EventModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />

      <SchoolRecordModal
        record={selectedSchoolRecord}
        isOpen={Boolean(selectedSchoolRecord)}
        onClose={() => setSelectedSchoolRecord(null)}
      />

      <UniversityRecordModal
        record={universityRecord}
        isOpen={isUniversityModalOpen}
        onClose={() => setIsUniversityModalOpen(false)}
      />
    </div>
  );
};

export default App;
