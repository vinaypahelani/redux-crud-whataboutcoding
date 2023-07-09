import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action

export const createUser = createAsyncThunk(
  "userDetail/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://64aa64fa0c6d844abede6902.mockapi.io/crud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//read action
export const showUser = createAsyncThunk(
  "userDetail/showUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://64aa64fa0c6d844abede6902.mockapi.io/crud"
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete action
export const deleteUser = createAsyncThunk(
  "userDetail/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://64aa64fa0c6d844abede6902.mockapi.io/crud/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.json();
      console.log("result is", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update action

export const updateUser = createAsyncThunk(
  "userDetail/updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updatedata", data);
    try {
      const response = await fetch(
        `https://64aa64fa0c6d844abede6902.mockapi.io/crud/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      console.log("rejected", action);
      state.loading = false;
      state.error = action.payload.message;
    },
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      console.log("rejected", action);
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("deleteuser", action.payload);
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((ele) => ele.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      console.log("rejected", action);
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updateUser.rejected]: (state, action) => {
      console.log("rejected", action);
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;
