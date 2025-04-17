import React from 'react'
import axios from "axios"
import { useQuery } from '@tanstack/react-query'
const ApiData = () => {
    const postQuery=useQuery({
        queryKey:['posts'],
        queryFn: async()=>{
            const response= await axios.get("https://jsonplaceholder.typicode.com/posts");
            console.log(response.data);
            return response.data;
        }
        
    })
    if (postQuery.isLoading) return <h1>Loading....</h1>;
    if (postQuery.isError) return <h1>Error loading data!!!</h1>;
  
  return (
    <>
    <div>
        {
            postQuery.data.map((post)=>(
                <div className='ml-5 mt-1' key={post.id}>{post.title}</div>
            ))
        }
    </div>
    </>
  )
}

export default ApiData
