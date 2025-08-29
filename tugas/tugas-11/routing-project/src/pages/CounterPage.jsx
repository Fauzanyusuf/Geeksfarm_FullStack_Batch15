import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../utils/counter/counterSlice";

export default function CounterPage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh-60px)] bg-zinc-200 gap-6">
      <div className="flex items-center gap-6">
        <button
          onClick={() => dispatch(decrement())}
          className="cursor-pointer p-2 border rounded-md"
        >
          Decrement
        </button>

        <span className="font-bold text-9xl">{count}</span>

        <button
          onClick={() => dispatch(increment())}
          className="cursor-pointer p-2 border rounded-md"
        >
          Increment
        </button>
      </div>

      <button
        onClick={() => dispatch(reset())}
        className="cursor-pointer p-2 border rounded-md"
      >
        Reset
      </button>
    </div>
  );
}
