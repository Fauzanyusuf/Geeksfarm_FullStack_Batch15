// Import hook useState dan useEffect dari React
import { useState, useEffect } from "react";

// Komponen halaman yang menampilkan jam real-time
export default function TimePage() {
  // State untuk menyimpan waktu saat ini
  const [time, setTime] = useState(new Date());

  // useEffect untuk membuat interval yang update waktu setiap detik
  useEffect(() => {
    // Buat interval yang update state 'time' setiap 1000ms (1 detik)
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // Bersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, []);

  // Render tampilan jam di tengah halaman
  return (
    <div className="flex items-center justify-center h-[calc(100dvh-60px)] bg-zinc-200">
      {/* Tampilkan waktu dalam format jam:menit:detik */}
      <p className="text-gray-800 text-4xl">{time.toLocaleTimeString()}</p>
    </div>
  );
}
