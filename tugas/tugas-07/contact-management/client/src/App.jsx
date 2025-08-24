import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import ContactPage from "./pages/ContactPage";
import { Toaster } from "sonner";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactPage />} />
        </Routes>
      </main>
      <Toaster richColors position="top-center" />
    </Router>
  );
}
