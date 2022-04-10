import React from 'react';
import { useContext} from "react"
import PostsContext from '../../utils/PostsContext';
import SpecialistLicense from './SpecialistLicense';
import { useRef } from 'react';
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
                            <button className="btn btn-outline-primary" onClick={Specialist} >الترقيه الى حساب طبيب</button>
                            <SpecialistLicense ref ={show}/>
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
                            <a className="btn btn-info " target="__blank" href="/">Edit</a>
                          </div>
                        </div>
                      </div>
                    </div>
      
                    <div className="row gutters-sm">
                    <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                  {profile.comments?
                    <div className="card">
                    <div className="card-body">
                  <br/>   التعليقات اللي قمت بنشرها 
                     {profile.comments }
                      </div>
                      </div> 
         :""}
                  </div>
               
                </div>
      
                </div> </div>
                </div> </div> </div> </div>
           
    );
}

export default Profile;