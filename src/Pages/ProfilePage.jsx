import { Card, CardHeader, CardBody } from "@heroui/card";
import React, { useContext, useEffect, useState } from "react";
import { getUserPostsApi } from "../Services/postService";
import { authContext } from "../Context/AuthContext";
import PostCard from "../Components/PostCard";
import LoaderSpinner from "../Components/LoaderSpinner";
import LoadingScreen from "../Components/LoadingScreen";
import { Button, Input } from "@heroui/react";
import {
  changePasswordApi,
  uploadProfilePhotoApi,
} from "../Services/authServices";

function ProfilePage({ callback }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(authContext);
  const [profileImage, setProfileImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [changedPassword, setChangedPassword] = useState(null);

  async function getUserPosts() {
    if (!userData?._id) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("User Token:", token);

      const response = await getUserPostsApi(userData._id);
      console.log("Response from getUserPosts:", response);

      const extractedPosts = response?.posts || response?.data?.posts || [];

      setPosts(extractedPosts);
    } catch (err) {
      console.log("Error fetching posts:", err);
    } finally {
      setIsLoading(false);
    }
  }
  async function uploadProfilePhoto(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", profileImage);
    let response = await uploadProfilePhotoApi(formData);
    console.log("files", profileImage);

    if (response.message) {
      await callback();

      console.log("profile image", response);
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    const data = {
      password: currentPassword,
      newPassword: changedPassword,
    };

    const response = await changePasswordApi(data);
    console.log("response", response);

    if (response.message) {
      await callback();
    }
  }

  useEffect(() => {
    if (userData?._id) {
      getUserPosts();
    }
  }, [userData?._id]);

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center gap-10">
        <p className="text-center mt-10 text-gray-500 text-3xl">
          Loading user data...
        </p>
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <Card className="w-3/4 h-3/4 p-10">
        <div className="flex   items-start justify-center gap-10">
          <h3 className="text-md font-semibold text-center">
            Hi {userData.name}
          </h3>

          <img
            className="rounded-full w-50 h-50 mr-3"
            src={userData?.photo}
            alt={userData?.name}
          />

          <div>
            <Card className="mx-auto mt-10 w-150 h-90 p-10">
              <CardHeader className="flex items-center justify-center">
                <h2 className="text-center text-2xl text-amber-900 font-bold">
                  User Information
                </h2>
              </CardHeader>

              <CardBody className="space-y-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {userData?.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {userData?.email}
                </div>
                <div>
                  <span className="font-medium">Gender:</span>{" "}
                  {userData?.gender}
                </div>
                <div>
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {userData?.dateOfBirth}
                </div>
                <div>
                  <span className="font-medium">User ID:</span> {userData?._id}
                </div>
              </CardBody>
            </Card>
            <Card className="mx-auto mt-10 w-150 h-130 p-10">
              <CardHeader className="flex items-center justify-center">
                <h2 className="text-center text-2xl text-amber-900 font-bold">
                  Update current Information
                </h2>
              </CardHeader>

              <CardBody className="space-y-4 text-sm">
                <form action="" onSubmit={uploadProfilePhoto}>
                  <span className="font-medium">Choose profile photo:</span>
                  <Input
                    type="file"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                    placeholder="choose image ..."
                    className="mt-3"
                  />
                  <Button
                    type="submit"
                    className="mt-3"
                    variant="bordered"
                    color="success"
                  >
                    Save
                  </Button>
                </form>
                <form onSubmit={changePassword}>
                  <div>
                    <span className="font-medium">Password:</span>{" "}
                    <Input
                      type="password"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="current password ..."
                      className="mt-3"
                    />
                  </div>
                  <div>
                    <span className="font-medium">new Password:</span>{" "}
                    <Input
                      type="password"
                      onChange={(e) => setChangedPassword(e.target.value)}
                      placeholder="change password ..."
                      className="mt-3"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-3"
                    variant="bordered"
                    color="success"
                  >
                    Save
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div className="w-3/4 h-3/4 p-10">
          <LoadingScreen />
        </div>
      ) : (
        posts.map((post) => (
          <div className="w-4/6 mx-auto">
            <PostCard
              key={post._id}
              post={post}
              commentLimit={1}
              callback={getUserPosts}
            />
          </div>
        ))
      )}

      {!isLoading && posts.length === 0 && (
        <p className="text-gray-500 mt-10 text-xl">No posts found yet 📭</p>
      )}
    </div>
  );
}

export default ProfilePage;
