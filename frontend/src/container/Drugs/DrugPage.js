import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "./DrugStyle.css"
import Comment from './comment/Comment';
import Rate from "./Rate"
import CommentsList from './comment/CommentsList';

function DrugPage() {
    const [Drug, setDrug] = useState([]);
    const {id} = useParams();
    console.log(id)
    useEffect(() => {
           const url = `/MyMediForm/drug/${id}`;
          const fetchData = async () => {
               try {
                   const response = await fetch(url);
                   const json = await response.json();
                   console.log(JSON.stringify(json));
                   setDrug(json)
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    },[]);

  //   const DrugComment =[...Drug].map((Drug) => 
  // <div className="row"  key={Drug.comments}>
  // <div className="col-sm-5 col-md-6 col-12 pb-4">
  //     <h1>Comments</h1>
  //     <div className="comment mt-4 text-justify float-left"> <img src="https://i.imgur.com/yTFUilP.jpg" alt="" className="rounded-circle" width="40" height="40"/>
  //     <h6>{Drug.comments.owner}</h6>
  //         <h4></h4> <span>{Drug.comments.Date}</span> <br/>
  //         <p>{Drug.comments.comment}</p>
  //     </div>
  //     </div>  </div>)

 return ( 
      <div >
  <div className="container">
    <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={Drug.image}alt="drug" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{Drug.Name}</h4>
                      <p className="text-secondary mb-1">دواء مصرح من </p>
                      <p className="text-muted font-size-sm">هيئه الدواء والغذاء في السعوديه</p>

                      <p>التقييمات</p>
                      <Rate/>
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
                      <h6 className="mb-0">الاسم </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {Drug.Name}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">الاستخدام</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {Drug.termOfUse}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">الوصف</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {Drug.description}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">رقم تسجيل الدواء </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {Drug.RegisterNo}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                    <CommentsList/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100" >
                    <div className="card-body">
                      <Comment/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
        </div>
    );
}

export default DrugPage;