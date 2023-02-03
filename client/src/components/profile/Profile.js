import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Profile.scss";
import { useNavigate } from "react-router";
import CreatePost from "../createPost/CreatePost";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMyprofile, setIsMyProfile] = useState(false);

  const params = useParams();

  const feedData = useSelector((state) => state.feedReducer.feedData);
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );

    setIsMyProfile(myProfile?._id === params.userId);

    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [myProfile, params.userId, feedData]);

  function handleUserFollow() {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: params.userId,
      })
    );
  }
  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          {isMyprofile && <CreatePost />}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>

        <div className="right-part">
          <div className="profile-card">
            <img className="user-img" src={userProfile?.avatar?.url} alt="" />
            <h3 className="user-name">{userProfile?.name}</h3>
            <p className="bio">{userProfile?.bio}</p>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`}</h4>
              <h4>{`${userProfile?.followings?.length} Following`}</h4>
            </div>
            {!isMyprofile && (
              <h5
                onClick={handleUserFollow}
                style={{
                  marginTop: "10px",
                }}
                className={
                  isFollowing ? "hover-link follow-link" : "btn-primary"
                }
              >
                {isFollowing ? "Unfollow" : "follow"}
              </h5>
            )}
            {isMyprofile && (
              <button
                className="update-profile btn-secondary"
                onClick={() => navigate("/updateProfile")}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
