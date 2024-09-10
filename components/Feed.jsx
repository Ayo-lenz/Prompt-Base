'use client';
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return(
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        )
        
      })}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt') //Again we have to create this api endpoint
      const data = await res.json();

      setPosts(data)
    }

    fetchPosts()
  }, []);
  
  return (
    <section className="feed">
      <form action="" className='relative w-full text-center'>
        <input 
          type="text"
          placeholder= 'Search for a tag or a username'
          value={searchText}
          onchange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}} 
      />
    </section>
  )
}

export default Feed

