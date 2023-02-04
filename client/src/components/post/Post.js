import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  getUserProfile,
  likeAndUnlikePost,
} from "../../redux/slices/postsSlice";
import { useNavigate, useParams } from "react-router";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import { axiosClient } from "../../utils/axiosClient";
import { RiDeleteBin6Fill } from "react-icons/ri";

function Post({ post }) {
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  async function handlePostLiked() {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "likeorunlike",
      })
    );
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }

  async function handleDeletePost() {
    try {
      const result = await axiosClient.delete("/posts/", {
        data: { postId: post._id },
      });

      dispatch(
        getUserProfile({
          userId: params.userId,
        })
      );
    } catch (e) {
      console.log(e.message);
    }
  }

  async function handleUpdatePost() {
    try {
      const result = await axiosClient.put("/posts", {
        caption,
        postId: post._id,
      });

      console.log("update done", result);
      dispatch(
        getUserProfile({
          userId: params.userId,
        })
      );
    } catch (e) {
      console.log(e.message);
    } finally {
      setCaption("");
    }
  }

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post.owner._id}`)}
      >
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
        <div className="deleteBtnClass">
          <button onClick={handleDeletePost}>
            <RiDeleteBin6Fill className="delete-btn-icon" />
          </button>
        </div>
      </div>

      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLiked}>
          {post.isLiked && (
            <AiFillHeart style={{ color: "red" }} className="icon" />
          )}
          {!post.isLiked && <AiOutlineHeart className="icon" />}
          <h4>{`${post?.likesCount} likes`} </h4>
        </div>
        <div className="update-caption">
          <input
            onSubmit={handleUpdatePost}
            value={caption}
            type="text"
            className="captionInput"
            placeholder="Let's update caption?"
            onChange={(e) => setCaption(e.target.value)}
            style={{ cursor: "crosshair" }}
          />
          <button
            className="btn-primary Update-caption-btn "
            onClick={handleUpdatePost}
          >
            Submit
          </button>
        </div>
        <p className="caption">{post?.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
