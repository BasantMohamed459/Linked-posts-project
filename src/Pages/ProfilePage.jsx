// import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
// import React, { useContext, useEffect, useState } from "react";
// import { getUserPostsApi } from "../Services/postService";
// import { authContext } from "../Context/AuthContext";
// import PostCard from "../Components/PostCard";
// import LoaderSpinner from "../Components/LoaderSpinner";
// import LoadingScreen from "../Components/LoadingScreen";
// import { div } from "framer-motion/client";
// // import profileImage from "../assets/blue-circle-with-white-user_78370-4707.jpg";

// function ProfilePage() {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const { userData } = useContext(authContext);
//   async function getUserPosts() {
//     if (!userData?._id) return;
//     setIsLoading(true);

//     try {
//       const response = await getUserPostsApi(userData?._id);
//       console.log("Token:", localStorage.getItem("token"));

//       console.log("response in profile", response);
//       // setPosts(response?.posts || response?.data || []);

//       // setPosts(response.posts);
//       setPosts(response?.posts || response?.data?.posts || []);
//     } catch (err) {
//       console.log("Error fetching posts:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (userData?._id) {
//       getUserPosts();
//     }
//   }, [userData?._id]);

//   if (!userData) {
//     return (
//       <div className="flex flex-col justify-center items-center gap-10">
//         <p className="text-center mt-10 text-gray-500 text-3xl">
//           Loading user data...
//         </p>
//         <LoaderSpinner></LoaderSpinner>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex items-center justify-center flex-col">
//         <Card className="w-3/4 h-3/4 p-10 ">
//           <div className="flex items-center  gap-10">
//             <img
//               className=" rounded-full w-50 h-50 mr-3"
//               // userData.photo
//               src={userData?.photo}
//               alt={userData?.name}
//             />
//             <div>
//               <h3 className="text-md font-semibold ">Hi {userData.name}</h3>
//               <div className="flex">
//                 <Card className=" mx-auto mt-10 w-200 h-100 p-10">
//                   <CardHeader className="flex items-center justify-center ">
//                     <h2 className="text-center text-2xl text-shadow-black font-bold text-amber-900">
//                       User Information
//                     </h2>
//                   </CardHeader>
//                   <CardBody className="space-y-8 text-sm">
//                     <div>
//                       <span className="font-medium">Name:</span>{" "}
//                       {userData?.name}
//                     </div>
//                     <div>
//                       <span className="font-medium">Email:</span>{" "}
//                       {userData?.email}
//                     </div>
//                     <div>
//                       <span className="font-medium">Gender:</span>{" "}
//                       {userData?.gender}
//                     </div>
//                     <div>
//                       <span className="font-medium">Date of Birth:</span>{" "}
//                       {userData?.dateOfBirth}
//                     </div>
//                     <div>
//                       <span className="font-medium">User ID:</span>{" "}
//                       {userData?._id}
//                     </div>
//                   </CardBody>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {isLoading ? (
//           <div className="w-3/4 h-3/4 p-10">
//             <LoadingScreen />
//           </div>
//         ) : (
//           posts.map((post) => (
//             <PostCard
//               key={post._id}
//               post={post}
//               commentLimit={1}
//               callback={getUserPosts}
//             />
//           ))
//         )}

//         {!isLoading && posts.length === 0 && (
//           <p className="text-gray-500 mt-10 text-xl">No posts found yet 📭</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default ProfilePage;

import { Card, CardHeader, CardBody } from "@heroui/card";
import React, { useContext, useEffect, useState } from "react";
import { getUserPostsApi } from "../Services/postService";
import { authContext } from "../Context/AuthContext";
import PostCard from "../Components/PostCard";
import LoaderSpinner from "../Components/LoaderSpinner";
import LoadingScreen from "../Components/LoadingScreen";

function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(authContext);

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
        <div className="flex items-center gap-10">
          <img
            className="rounded-full w-50 h-50 mr-3"
            src={userData?.photo}
            alt={userData?.name}
          />

          <div>
            <h3 className="text-md font-semibold">Hi {userData.name}</h3>

            <Card className="mx-auto mt-10 w-200 h-100 p-10">
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
