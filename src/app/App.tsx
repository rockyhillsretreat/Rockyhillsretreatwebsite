import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { BookingPage } from "./components/BookingPage";
import { ConfirmationPage } from "./components/ConfirmationPage";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
    <a href="/" className="px-6 py-3 bg-primary-brand text-white rounded hover:opacity-90 transition">
      Go Home
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-primary-brand flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
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
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
