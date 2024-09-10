'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const{ data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    //we don't want to edit it immediately, we want to navigate the user to a nice looking form to edit it
    router.push(`/update-prompt?id=${post._id}`) // we are navigating to a dynamic route page and get the id of the particular post saved as 'id'
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this Prompt?') // this line is a confirm prompt built into the browser api
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
  }


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`); //we only want to fetch the post of that particular user if the user is logged in
      const data = await res.json();

      setPosts(data)
    }

    if(session?.user.id) fetchPosts()
  }, []);

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile