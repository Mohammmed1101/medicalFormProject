import React, { useRef } from 'react';
import { useState ,useEffect} from 'react';
import "./drug.css"
import { TextField } from '@mui/material';
import { useContext} from "react"
import PostsContext from '../../utils/PostsContext';
import { Link } from 'react-router-dom'

export default  function Drugs() {
//fetch all drugs
const { profile } = useContext(PostsContext)
        const url = "/MyMediForm/drug/drugs";
        const [Drug, setDrug] = useState([]);
        const [loadingDrug,setLoadingDrug]= useState(true)
        const testing= useRef()
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
    
// function to delet
function TestDeleteing(){

    testing.current.style.display="block"
   
}

function dontdelete(){

    testing.current.style.display="none"
   
}

function deletedrug(id)
{
    fetch(`/MyMediForm/drug/${id}`,{
        method:"DELETE"
        
    }).then((result)=>{
        result.json().then((resp)=>{
           alert(resp)
        })
    })
}


        //drug card 
        const [key, setkey] = useState("")

        const listDrug = [...Drug].filter((drug) => {
            if(key === '') {
                return drug;
            } else if(drug.Name.toLowerCase().includes(key.toUpperCase())) {
                return drug;
            }
        }).map((Drug) =>
            <div className="col-12 col-md-4 col-lg-3" key={Drug._id}>
            <div className='card' style={{width:" 18rem;"}}>
               {Drug.image? <img src={Drug.image} className="card-img-top" alt="Drug "/>:""}
                <div className="card-body">
          
                    <p className="card-text">{Drug.Name}</p>

                {profile&&
                <>
              { profile.role==="Admin" ?

<div>
                <button onClick={TestDeleteing} style={{"float":"right"  ,"border":"0px"}} > <i className="bi bi-trash3-fill"></i></button>
              

              <div >
                <div ref={testing}  style={{ "display":"none"}}>
            <h6>are u sure u want to delete </h6>
      <button onClick={()=>deletedrug(Drug._id)} >yes</button>
<button onClick={dontdelete}>no</button>
        </div>
        </div>
                </div>
                :""}
                </>}

                    <p className="card-text">{Drug.ratingAverage}</p>
                    <Link  to={`/drugs/${Drug._id}`} >المزيد</Link>
                    
                </div>
            </div>
        </div>
        );
    
        if(loadingDrug)return(<img src='https://www.yanbuweather.com/pages/cloudsat/loading.gif?1'  alt='doctor' width={300}></img>)
    return (
        <div className='drugs'>
       <div className="main">
         <div className="search">
        <TextField id="outlined-basic"   name='key' onChange={(event)=>{setkey(event.target.value)}} fullWidth variant="outlined" label="بحث" />     
        </div>
    </div> 
         <div className="row">
         {listDrug}
        
            </div> 
            </div>
     )
    }
