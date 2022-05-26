import React, { useEffect } from 'react';
import { useState} from 'react';
import {Card}from "react-bootstrap"
import { Slide } from 'react-slideshow-image';
import "./hdrug.css"
import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom';
function HomeDrug() {

    const url = "/MyMediForm/drug/drugs";
    const [Drug, setDrug] = useState([]);
    const [loadingDrug,setLoadingDrug]= useState(true)
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
             setDrug(json)
             setLoadingDrug(false)
            } catch (error) {
                console.log("error", error);
            }
        };
          fetchData();
     
      })

   const listDrugs=Drug.map((Drug) =>
 
    <Card className=''div key={Drug._id} style={{"width": '40%', "height":'-111px' }}>
    <Card.Img variant="top" src={Drug.image}  style={{ 'width': '30%'}} />
    <Card.Body>
      <Card.Title>{Drug.Name}</Card.Title>
      <Card.Text> {Drug.description}</Card.Text>
      <Link variant="primary" to={`/drugs/${Drug._id}`}>المزيد </Link>
    </Card.Body>
  </Card>

  );


  if(loadingDrug)return(<img src='https://www.yanbuweather.com/pages/cloudsat/loading.gif?1'  alt='doctor' width={300}></img>)

    return (
      <div className='Home-Drugs'>
 
        <Slide easing="ease">
     
          <div className="each-slide">
            <div>               
              {listDrugs[listDrugs.length-4]}
            </div>
          </div>
          <div className="each-slide">
            <div>
           {listDrugs[listDrugs.length-3]}
            </div>
          </div>
          <div className="each-slide">
            <div >
             {listDrugs[listDrugs.length-2]}
            </div>
          </div>
          <div className="each-slide">
            <div >
             {listDrugs[listDrugs.length-1]}
            </div>
          </div>
        </Slide>
      </div>
    )
};





export default HomeDrug;