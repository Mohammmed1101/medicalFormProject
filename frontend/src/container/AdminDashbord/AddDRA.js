import React from 'react';
import axios from "axios";
function AddDRA(props) {

    const addDRAacc = async (e, Drugid) => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        username : form.elements.username.value,
        firstName : form.elements.firstName.value,
        email : form.elements.email.value,
        password : form.elements.password.value,
      }
      form.reset()
      await axios.post("/MyMediForm/auth/signup/dra",userBody, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })
      window.alert("تم انشاء الحساب بنجاح وتم ارسال رساله تحقق الى البريد الالكتروني الخاص بالهيئه")

    } catch (error) {
      if (error.response) window.alert(error.response.data)
      else console.log(error)
    }
  }
    


    return (
        <div className='form-box'>
              <form method='POST'  id="user" className='input' onSubmit={e => addDRAacc(e)}>
                  <label>أضافه حساب لمنظه </label>
                <input type="text"  name="username" className='input-field' placeholder='اسم المستخدم' required></input>
                <input type="text"  name="firstName" className='input-field' placeholder='أسم المنظمه' required></input>
                <input type="email" name="email" className='input-field' placeholder='البريد الالكتروني' required></input>
                <input type="password"  name="password" className='input-field' placeholder='كلمه السر' required></input>
                <button type='submit' className='submit-btn' > أنشاء حساب</button>
              
          </form> 
        </div>
    );
}

export default AddDRA;