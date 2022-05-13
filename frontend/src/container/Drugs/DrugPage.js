import React from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import "./DrugStyle.css"
import Comment from './comment/Comment';
import Rate from "./Rate"
import CommentsList from './comment/CommentsList';
import axios from "axios";

function DrugPage() {
 
    const [Drug, setDrug] = useState([]);
    const [errorOnePost, setErrorOnePost] = useState(null)
      const [editShow, setEditShow] = useState(false)
   
    const {id} = useParams();
    
    const getDrug = async () => {
      try {
          const response = await axios.get( `/MyMediForm/drug/${id}`)
          setDrug(response.data)

      } catch (error) {
          if (error.response)
          setErrorOnePost(error.response.data)
          setDrug(null)
      }
  }

  getDrug ()
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
                      <h5>{Drug.ratingAverage}</h5>
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
                <div className="col-sm96 mb-3 ">
                  <div className="card h-100">
                    <div className="card-body">
                    <CommentsList/>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
        </div>
        <div className="col-md-4 mb-9" style={{"margin-top": "-275px"}}>
                  <div className="card " >
                    <div className="card-body">
                    <div className=" align-items-center text-center">
                    
                      <Comment/>
                      
                      </div> </div>
                  </div>
                </div>
               
    </div>

        </div>
    );
}

export default DrugPage;