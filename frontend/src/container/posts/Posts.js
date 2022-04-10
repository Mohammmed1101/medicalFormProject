import React from 'react';
import { useState, useEffect } from 'react';
function Posts() {
    const [post, setpost] = useState([]);
    useEffect(() => {
        const url = "/MyMediForm/posts/posts";
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
             console.log(JSON.stringify(json));
             setpost(json)
            } catch (error) {
                console.log("error", error);
            }
        };
          fetchData();
         
    
    }, []);
   
    const listpost = [...post].map((post) => 
    <div className="col" key={post.id} style={{textAlign:"right"}}>
        <div className='postcard' style={{width: "18rem;"}}>
           
             {post.image?< img src={post.image} className="card-img-top" alt="post"/>:""}
                 
            <div className="card-body">
                <h5 className="card-text">{post.title}</h5>
                <p className="card-text">{post.description}</p>
            </div>
        </div>
    </div>
    );
  

    return (
        <div className='row'>
        <div className='drugs'>
        <div className='posts'>
            {listpost}
            
        </div></div></div>
    );
}

export default Posts;