import { createSlice } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: {
    visible: false,
    timeout: 3000,
    message: "",
    type: "success",
  },
  reducers: {
    snackBar: (state, action) => {
      state.visible = true;
      state.timeout = action.payload.timeout;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    setDisableSnackBar: (state) => {
      state.visible = false;
    },
  },
});

let timeoutInstance = null;

export const disableSnackBar = () => (dispatch) => {
  dispatch(setDisableSnackBar());
  clearTimeout(timeoutInstance);
};

export const setSnackBar =
  (type, message, timeout = 2000) =>
  (dispatch) => {
    dispatch(snackBar({ type, message, timeout }));

    timeoutInstance = setTimeout(() => {
      dispatch(setDisableSnackBar());
    }, timeout);
  };

export const { snackBar, setDisableSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
