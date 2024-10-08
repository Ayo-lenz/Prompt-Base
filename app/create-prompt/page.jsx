"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react'; // it's going to allow us to know which user is currently logged in
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {

  const router = useRouter();
  const { data: session } = useSession();


  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        // now we will create our API endpoint as we did in the tutorial
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/');
      }
      
    } catch (error) {
      console.log(error);
    } finally{
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt