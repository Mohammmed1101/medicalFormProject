import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "./commentlist.css"

export default  function CommentsList() {
   
  const {id} = useParams();
        const url = `/MyMediForm/drug/${id}/comments`;
        const [Comment, setComment] = useState([]);

     const GetComment= async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
        
                    setComment(json)
                } catch (error) {
                    console.log("error", error);
                }
            };
            GetComment()
      
         
       function postLike (Commentid ) {
      
           fetch(`/MyMediForm/drug/${id}/${Commentid}/likes`, {
              headers: {
                Authorization: localStorage.tokenSocial,
              },
            })          
          }


          function postdisLike (Commentid ) {
      
            fetch(`/MyMediForm/drug/${id}/${Commentid}/dislikes`, {
               headers: {
                 Authorization: localStorage.tokenSocial,
               },
             })          
           }


           // function to delet 
function deletedrug(commentId)
{

    fetch(`/MyMediForm/drug/${id}/comments/${commentId}`,{
        method:"DELETE"
    }).then((result)=>{
        result.json().then((resp)=>{
            console.log(resp)
        })
    })
}



        const listComment = [...Comment].sort((a, b) => b.likes.length - a.likes.length)
        .map((Comment) =>
            <div key={Comment.id}>
          {Comment.Drugid==id?  
          <div>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
<div class="container">
<div class="row">
    <div class="col-md-8">
        <div class="media g-mb-30 media-comment">
            <img class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src={Comment.owner.avatar} alt="IDescription"/>
            <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
              <div class="g-mb-15">
                <h5 class="h5 g-color-gray-dark-v1 mb-0">{Comment.owner.username}</h5>
                <span class="g-color-gray-dark-v4 g-font-size-12">{Comment.Date}</span>
              </div>
        
       
              <p> {Comment.comment}</p>

              <ul class="list-inline d-sm-flex my-0">

                <li class="list-inline-item g-mr-20">
                  
                    <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3" onClick={()=>postLike(Comment._id)} ></i>
                   {Comment.likes.length}
                  
                 </li>

                <li class="list-inline-item g-mr-20">
                   <i class="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"onClick={()=>postdisLike(Comment._id)} ></i>
                    {Comment.dislikes.length}
                 
                </li>
                
        { localStorage.tokenSocial?
                <button onClick={()=>deletedrug(Comment._id)} style={{"float":"right"  ,"border":"0px"}} > <i class="bi bi-trash3-fill"></i></button>
            :""}
              </ul>
            </div>
        </div>
    </div>
</div>

</div></div>
:""}

  </div>
 
        );
    
    return (
        <div className='Comment'>
         <div>
         {listComment}
            </div> 
            </div>
     )
    }