import React from 'react';

interface Post {
  id: number;
  title: string;
}

const ApiData = async () => {
  const res = await fetch('https://api.vercel.app/blog');
  const posts: Post[] = await res.json();
  console.log(posts);

  return (
    <div>
      <h2>This page is about the API data</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiData;
