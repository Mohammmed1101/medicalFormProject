import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AddDRA(props) {

    const nav = useNavigate();
    const [users, setUser] = useState({
        email: "", firstName: "", password: "", lastName: "", username: ""})
    
    let name , value;
    const hh =(e)=>{
        console.log(e)
        name=e.target.name;
        value=e.target.value;
        setUser({...users,[name]:value})
    }
    
    
    const PostData=async(e)=>{
    e.preventDefault();
    
    const {email,firstName,password,lastName,username}=users
    
    const res = await fetch("/MyMediForm/auth/signup/dra",{
            method:"POST",
            headers:{
             "Content-Type":"application/json"
            },
            body:JSON.stringify({  firstName, lastName, username, email,password      })})
    
    const data = await res.json();
    if(res.status===422 || ! data){
    window.alert("Invalid reg")

    }else{
        window.alert("check your email")
        console.log("done")
        nav('/login');
      }
    console.log(JSON.stringify({
        email, firstName, password, lastName,username
    }))
    }

    return (
        <div className='form-box'>
              <form method='POST'  id="user" className='input'>
                  <label>أضافه حساب لمنظه </label>
                <input type="text" onChange={hh} name="username" className='input-field' placeholder='اسم المستخدم' required></input>
                <input type="text"onChange={hh}  name="firstName" className='input-field' placeholder='أسم المنظمه' required></input>
                <input type="text"onChange={hh}  name="lastName" className='input-field' placeholder='عنوان المنظمه' required></input>
                <input type="email"onChange={hh}  name="email" className='input-field' placeholder='البريد الالكتروني' required></input>
                <input type="password" onChange={hh}  name="password" className='input-field' placeholder='كلمه السر' required></input>
                <button type='submit' className='submit-btn' onClick={PostData} > أنشاء حساب</button>
              
          </form> 
        </div>
    );
}

export default AddDRA;