import { BrowserRouter as Router, Routes, Route } from "react-router";
import TimePage from "./pages/TimePage";
import Header from "./components/Header";
import YoutubePage from "./pages/YoutubePage";
import ContactPage from "./pages/ContactPage";
import CounterPage from "./pages/CounterPage";
import { Toaster } from "sonner";
import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<TimePage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
        </Routes>
      </main>
      <Toaster richColors />
    </Router>
  );
}
