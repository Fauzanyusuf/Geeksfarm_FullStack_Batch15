// Import createSlice dari Redux Toolkit untuk membuat slice state
import { createSlice } from "@reduxjs/toolkit";

// Membuat slice untuk fitur user
const userSlice = createSlice({
  // Nama slice
  name: "user",
  // State awal, userData berisi data user (default null)
  initialState: {
    userData: null,
  },
  // Reducers berisi fungsi untuk mengubah state
  reducers: {
    // Menyimpan data user ke state
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

// Export action untuk digunakan di komponen
export const { saveUserData } = userSlice.actions;
// Export reducer untuk digabungkan ke store Redux
export default userSlice.reducer;
