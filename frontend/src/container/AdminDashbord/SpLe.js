import React from 'react';
import { useState, useEffect} from 'react';
import { Alert } from 'react-bootstrap';
function SpLe() {
    const [ License,  setLicense] = useState([]);
    const [loadingDrug,setLoadingDrug]= useState(true)
    const url = "/MyMediForm/auth/License";
    useEffect(()=>{
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
    
         setLicense(json)
         setLoadingDrug(false)
        } catch (error) {
            console.log("error", error);
        }
    };
      fetchData();
  })

      function Accept(id)
      {
          fetch(`/MyMediForm/auth/AcceptLicense/${id}`,{
              method:"PUT"
          }).then((result)=>{
              result.json().then((resp)=>{
                 window.alert(resp)
              })
          })
      }


      function deletedrug(id)
      {
          fetch(`/MyMediForm/auth/License/${id}`,{
              method:"DELETE"
          }).then((result)=>{
              result.json().then((resp)=>{
                window.alert(resp)
              })
          })
      }
  
  

      const listLicense = [...License].map((License) => 
      <table className="table" div key={License._id}>
     
      <tbody>
        <tr>
          <th scope="row"></th>
          <td>{License.Licensenumber}</td>
          <td> <i className="bi bi-check-lg"button onClick={()=>Accept(License._id)} /      ></td>
          <td><i className="bi bi-x-lg"        button onClick={()=>deletedrug(License._id)} ></i></td>
        </tr>
       
      </tbody>
    </table>
    
      )

      if(loadingDrug)return(<img src='https://www.yanbuweather.com/pages/cloudsat/loading.gif?1' alt='doctor' width={300}></img>)

    return (
        <div>
        <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">رقم الرخصه</th>
          <th scope="col" >صحيحه اعطاء الصلاحيه</th>
          <th scope="col"  >حذف غير صحيحه</th>
        </tr>
      </thead>
      </table>
         {listLicense}</div>
    );
}

export default SpLe;