/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Mandatory backend URL declaration at the top of the code
const BACKEND_URL = "https://qualifications-activists-consumption-concentrate.trycloudflare.com";

import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import SkillsSection from './components/SkillsSection.tsx';
import ProjectsSection from './components/ProjectsSection.tsx';
import ExperienceSection from './components/ExperienceSection.tsx';
import EducationSection from './components/EducationSection.tsx';
import CertificationsSection from './components/CertificationsSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';
import ChatWidget from './components/ChatWidget.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      {/* Floating Chat Assistant in Bottom-Right Corner */}
      <ChatWidget />
    </div>
  );
}
export { BACKEND_URL };
