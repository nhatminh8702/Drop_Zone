import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from "../storage/FireBaseStorage";
import {
  ref,
  list,
  getMetadata,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export const fetchListFiles = createAsyncThunk(
  "file/fetchList",
  async (param, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const storageRef = ref(storage, "storage/");
    const data = await list(storageRef, { maxResults: 100 });
    const tempArray = [];
    if (Array.isArray(data["items"])) {
      for (const item of data["items"]) {
        const file = await getMetadata(item);
        tempArray.push(file);
      }
    }
    // thunkApi.dispatch(setLoading(false));
    return tempArray;
  }
);

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (param, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const fileList = param;
    for (let i = 0; i < fileList.length; i++) {
      await uploadBytes(
        ref(storage, "storage/" + fileList[i].name),
        fileList[i]
      );
    }
    thunkApi.dispatch(fetchListFiles());
  }
);

export const deleteFile = createAsyncThunk(
  "file/deleteFile",
  async (param, thunkApi) => {
    const fileRef = ref(storage, param);
    deleteObject(fileRef)
      .then(() => {
        thunkApi.dispatch(fetchListFiles());
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
);

export const storageSlice = createSlice({
  name: "storage",
  initialState: {
    fileList: [],
    isLoading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchListFiles.fulfilled, (state, action) => {
      state.fileList = action.payload;
      state.isLoading = false
    });
    
  },
});

export const { setLoading, getLoading } = storageSlice.actions;
export const fileListSelector = (store) => {
  store.storage;
};
