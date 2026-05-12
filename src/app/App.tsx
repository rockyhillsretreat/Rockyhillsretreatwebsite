import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { BookingPage } from "./components/BookingPage";
import { RetreatPage } from "./components/RetreatPage";
import { ProvisionsPage } from "./components/ProvisionsPage";
import { ExperiencesPage } from "./components/ExperiencesPage";
import { LocationPage } from "./components/LocationPage";
import { ContactPage } from "./components/ContactPage";
import { PackagesPage } from "./components/PackagesPage";
import { GoDarkPage } from "./components/GoDarkPage";
import { GalleryPage } from "./components/GalleryPage";
import { JournalPage } from "./components/JournalPage";
import { FAQsPage } from "./components/FAQsPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-primary-brand">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/retreat" element={<RetreatPage />} />
            <Route path="/provisions" element={<ProvisionsPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/go-dark" element={<GoDarkPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
