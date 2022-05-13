import React from 'react';
import { useState} from 'react';
function SpLe() {

    const [ License,  setLicense] = useState([]);
    const url = "/MyMediForm/auth/License";
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
    
         setLicense(json)
        } catch (error) {
            console.log("error", error);
        }
    };
      fetchData();


      function Accept(id)
      {
          fetch(`/MyMediForm/auth/AcceptLicense/${id}`,{
              method:"PUT"
          }).then((result)=>{
              result.json().then((resp)=>{
                  console.log(resp)
              })
          })
      }


      function deletedrug(id)
      {
          fetch(`/MyMediForm/auth/License/${id}`,{
              method:"DELETE"
          }).then((result)=>{
              result.json().then((resp)=>{
                  console.log(resp)
              })
          })
      }
  
  

      const listLicense = [...License].map((License) => 
      <table class="table">
     
      <tbody>
        <tr>
          <th scope="row"></th>
          <td>{License.Licensenumber}</td>
          <td> <i class="bi bi-check-lg"button onClick={()=>Accept(License._id)} /      ></td>
          <td><i class="bi bi-x-lg"        button onClick={()=>deletedrug(License._id)} ></i></td>
        </tr>
       
      </tbody>
    </table>
    
      )


    return (
        <div>
        <table class="table">
      <thead class="thead-dark">
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