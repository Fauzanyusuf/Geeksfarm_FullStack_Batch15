// Import createSlice dari Redux Toolkit untuk membuat slice state
import { createSlice } from "@reduxjs/toolkit";

// Membuat slice untuk fitur counter
export const counterSlice = createSlice({
  // Nama slice
  name: "counter",
  // State awal
  initialState: {
    value: 0,
  },
  // Reducers berisi fungsi untuk mengubah state
  reducers: {
    // Menambah nilai counter 1
    increment: (state) => {
      state.value += 1;
    },
    // Mengurangi nilai counter 1
    decrement: (state) => {
      state.value -= 1;
    },
    // Mereset nilai counter ke 0
    reset: (state) => {
      state.value = 0;
    },
    // Menambah nilai counter sesuai payload
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Export action untuk digunakan di komponen
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

// Export reducer untuk digabungkan ke store Redux
export default counterSlice.reducer;
