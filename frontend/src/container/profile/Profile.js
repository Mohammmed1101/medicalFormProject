import React from 'react';
import { useContext} from "react"
import PostsContext from '../../utils/PostsContext';
import SpecialistLicense from './SpecialistLicense';
import { useRef } from 'react';
import "./profile.css"
function Profile() {
  const show= useRef("");  

  function Specialist(){
    show.current.style.display="block"

  }
    const { profile } = useContext(PostsContext)
    if(!profile) return<img src='https://www.yanbuweather.com/pages/cloudsat/loading.gif?1' width={300}></img>
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
                            <h4>{profile.firstName} {profile.lastName}</h4>
                            {profile.role.toString()=="Consumer"?
                            <div>
                            <button className="btn btn-outline-primary" onClick={Specialist} >الترقيه الى حساب طبيب</button> 
                            <SpecialistLicense ref ={show}/>
                            </div>
                            :""}
                    
                          </div>
                        </div>
                      </div>
                    </div>
             
                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body">
                      <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0"> الاسم الكامل</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          {profile.firstName} {profile.lastName}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0"> أسم المستخدم</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          {profile.username}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">البريد الالكتروني</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                           {profile.email}
                          </div>
                        </div>
                        <hr/>

                        <div className="row">
                          <div className="col-sm-12">
                          
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-15">
                    <div className="card mb-3">
                      <div className="card-body">
                      <div className="row">
                          <div className="col-sm-3">
                  <br/>   التعليقات اللي قمت بنشرها 
     {  profile.comments.map(usercomment=>(
    <div>
      <link href={profile.avatar} rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
      <div class="container">
      <div class="row">
          <div class="col-md-8">
              <div class="media g-mb-30 media-comment">
                  <img class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src={profile.avatar} alt="IDescription"/>
                  <div class="media-body u-shadow-v18 g-bg-secondary g-pa-1" >
                    <div class="g-mb-15">
                      <h5 class="h5 g-color-gray-dark-v1 mb-0">{profile.username}</h5>
                      <span class="g-color-gray-dark-v4 g-font-size-12">{usercomment.Date}</span>
                    </div>
              
                    <p> {usercomment.comment}</p>
                    <ul class="list-inline d-sm-flex my-0">
                      <li class="list-inline-item g-mr-20">
                        <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"  href="#!">
                          <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                         {usercomment.comment.like}
                        </a>
                      </li>
                      <li class="list-inline-item g-mr-20">
                        <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                          <i class="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                         {usercomment.comment.dislikes}
                        </a>
                      </li>
                    </ul>
                  </div>
              </div>
          </div>
      </div>
      </div>
       
              </div>

    ))}


                      </div>
                      </div> 
         
                  </div>
               
                </div>
      
                </div> </div>
                </div> </div> </div> </div>
           
    );
}

export default Profile;