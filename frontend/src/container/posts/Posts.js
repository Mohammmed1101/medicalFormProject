import React from 'react';
import { useState } from 'react';

function Posts() {
    const [post, setpost] = useState([]);
   
        const url = "/MyMediForm/posts/posts";
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
       
             setpost(json)
            } catch (error) {
                console.log("error", error);
            }
        };
          fetchData();

 
   
    function deletedrug(id)
    {
        fetch(`/MyMediForm/posts/${id}`,{
            method:"DELETE"
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp)
            })
        })
    }


    const listpost = [...post].map((post) => 
    <div className="col" key={post.id} style={{textAlign:"right"}}>
        <div className='postcard' style={{width: "18rem;"}}>
           
             {post.image?< img src={post.image} className="card-img-top" alt="post"/>:""}
            <div className="card-body">
                <h5 className="card-text">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <div className="card-body">             <button onClick={()=>deletedrug(post._id)} style={{"float":"right"  ,"border":"0px"}} > <i class="bi bi-trash3-fill"></i></button>
</div>
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