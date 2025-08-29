// Import hook dari react-redux untuk mengakses dan mengubah state Redux
import { useDispatch, useSelector } from "react-redux";
// Import action untuk counter dari slice Redux
import { decrement, increment, reset } from "../features/counter/counterSlice";

// Komponen halaman Counter
export default function CounterPage() {
  // Ambil nilai count dari state Redux
  const count = useSelector((state) => state.counter.value);
  // Ambil fungsi dispatch untuk mengirim action ke Redux
  const dispatch = useDispatch();

  // Render tampilan counter dengan tombol increment, decrement, dan reset
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh-60px)] bg-zinc-200 gap-6">
      {/* Baris tombol decrement, nilai counter, dan tombol increment */}
      <div className="flex items-center gap-6">
        {/* Tombol untuk mengurangi nilai counter */}
        <button
          onClick={() => dispatch(decrement())}
          className="cursor-pointer p-2 border rounded-md"
        >
          Decrement
        </button>

        {/* Tampilkan nilai counter */}
        <span className="font-bold text-9xl">{count}</span>

        {/* Tombol untuk menambah nilai counter */}
        <button
          onClick={() => dispatch(increment())}
          className="cursor-pointer p-2 border rounded-md"
        >
          Increment
        </button>
      </div>

      {/* Tombol untuk mereset nilai counter ke awal */}
      <button
        onClick={() => dispatch(reset())}
        className="cursor-pointer p-2 border rounded-md"
      >
        Reset
      </button>
    </div>
  );
}
