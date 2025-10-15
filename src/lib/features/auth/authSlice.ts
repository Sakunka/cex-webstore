import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getApiUrl = (path: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "http://localhost:3000");

  return `${baseUrl}${path}`;
};

type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  shippingInfo?: {
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    contactNumber?: string;
    country?: string;
    organization?: string;
    postcode?: string;
    townCity?: string;
  };
  _id: string;
};

type State = {
  user: User | null;
  loadingLogin: boolean;
  loadingRegister: boolean;
  loadingAuth: boolean;
  loggedIn: boolean;
  error: string | null;
  registerFinish: boolean;
};

const initialState: State = {
  user: null,
  loggedIn: false,
  loadingLogin: false,
  loadingRegister: false,
  loadingAuth: false,
  error: null,
  registerFinish: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { password: string; emailAddress: string }, thunkAPI) => {
    try {
      const response = await fetch(getApiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.emailAddress,
          password: userData.password,
        }),
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return thunkAPI.rejectWithValue("JSON required");
      }

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = `Error, status: ${response.status}`;
        return thunkAPI.rejectWithValue(errorMessage);
      }

      return {
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: data.user.role,
        shippingInfo: data.user.shippingInfo,
        _id: data.user._id,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Error");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    registerData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await fetch(getApiUrl("/api/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.message ||
          data.error ||
          `HTTP error! status: ${response.status}`;
        return thunkAPI.rejectWithValue(errorMessage);
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Network error");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(getApiUrl("/api/auth/authUser"), {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        return thunkAPI.rejectWithValue(data.message || "Not authenticated");
      }

      const data = await response.json();

      if (!data || !data.email) {
        return thunkAPI.rejectWithValue("User is not authenticated");
      }

      return {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        shippingInfo: data.shippingInfo,
        _id: data._id,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue("User is not signed in");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(getApiUrl("/api/auth/logout"), {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return true;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

export const updateUserShippingInfo = createAsyncThunk(
  "auth/updateShippingInfo",
  async (
    {
      userId,
      shippingData,
    }: {
      userId: string;
      shippingData: {
        organization?: string;
        contactNumber: string;
        address1: string;
        address2?: string;
        country: string;
        townCity: string;
        postcode: string;
      };
    },
    thunkAPI
  ) => {
    try {
      const response = await fetch(getApiUrl(`/api/auth/shipping/${userId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shippingData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to update shipping info"
        );
      }

      return data.user || data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
      state.loadingLogin = false;
      state.loadingAuth = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loadingLogin = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.user = action.payload;
        state.loggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingLogin = false;
        state.loggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loadingRegister = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loadingRegister = false;
        state.registerFinish = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadingRegister = false;
        state.registerFinish = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loadingAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
        state.loadingAuth = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.loggedIn = false;
        state.loadingAuth = false;
        if (
          action.payload !== "Server side rendering" &&
          action.payload !== "User is not signed in"
        ) {
          state.error = action.payload as string;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loggedIn = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateUserShippingInfo.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserShippingInfo.fulfilled, (state, action) => {
        if (action.payload && state.user) {
          state.user = {
            ...state.user,
            ...action.payload,
            shippingInfo:
              action.payload.shippingInfo || state.user.shippingInfo,
          };
        }
        state.error = null;
      })
      .addCase(updateUserShippingInfo.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
