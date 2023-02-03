import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosClient } from "../../utils/axiosClient";

import { likeAndUnlikePost } from "./postsSlice";

export const getFeedData = createAsyncThunk("user/getFeedData", async () => {
  try {
    const response = await axiosClient.get("/user/getFeedData");
    console.log("feeddata", response);
    return response.result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const followAndUnfollowUser = createAsyncThunk(
  "user/followAndUnfollowUser",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/follow", body);

      console.log(response.result.user);
      return response.result.user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );

        if (index !== undefined && index !== -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings?.findIndex(
          (item) => item._id === user._id
        );
        if (index !== -1) {
          state?.feedData?.followings?.splice(index, 1);
        } else {
          state?.feedData?.followings?.push(user);
        }
      });
  },
});

export default feedSlice.reducer;
