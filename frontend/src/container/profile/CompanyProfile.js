import React from 'react';
import { useContext} from "react"
import PostsContext from '../../utils/PostsContext';
import AddDrug from '../AdminDashbord/AddDrug';
import Newpost from '../posts/NewPost'

function Profile() {
    const { profile } = useContext(PostsContext)
 if(!profile) return<img src='https://www.yanbuweather.com/pages/cloudsat/loading.gif?1' width={300} alt ="pictuer"></img>
    return (
        <div >
        <div className="container">
          <div className="main-body">
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                        {profile.avatar?<img src={profile.avatar} alt="pr" className="rounded-circle" width="150"/>:""}
                          <div className="mt-3">
                            <h4>{profile.companyName} </h4>
                            <h4>{profile.firstName} </h4>
                          </div>
                        </div>
                      </div>
                    </div>
       
                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body" >
                   
                      <div className="row"  style={{ width:"600px"}}>
                        
                      <Newpost/>
                      <div className="card-body" style={{width:"50%",  margin:"-29px -753px -6px 656px"}}>
                        {profile.role==="DRA"?<AddDrug />:""}
                        </div>
                      </div>
                      </div> </div>
      
                    <div className="row gutters-sm">
                
                <div className="card mb-3">
                      <div className="card-body">
                   
                      <div className="row"  style={{ "width":"800px"}}>
                      المنشورات المشاركه بواسطه هذا الحساب
              {profile.post.map((post) => 
    <div className="col" key={post._id} style={{textAlign:"right"}}>
      <div   className="thedivofthepostcard">
        <div className='postcard' style={{width: "80%"}}>
           
             {post.image?< img src={post.image} className="card-img-top" alt="post"/>:""}
            <div className="card-body">
                <h5 className="card-text">{post.title}</h5>
                <p className="card-text">{post.description}</p>

            </div>
            </div>  </div>
    </div>
    )}
                        </div>
                      </div>
                    </div>
      
                </div> </div>
                </div> </div> </div> </div>
           
    );
}

export default Profile;