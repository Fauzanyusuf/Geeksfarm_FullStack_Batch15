import { BrowserRouter as Router, Routes, Route } from "react-router";
import TimePage from "./pages/TimePage";
import Header from "./components/Header";
import YoutubePage from "./pages/YoutubePage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<TimePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
        </Routes>
      </main>
    </Router>
  );
}
