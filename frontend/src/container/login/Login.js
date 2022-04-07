import React from "react";
import "./login.css"

import { Link } from 'react-router-dom'
import { useContext } from "react";
import PostsContext from '../../utils/PostsContext';
import Alert from '@mui/material/Alert';

export default function Login() {

  const { login, errorLogin } = useContext(PostsContext)
  return (
    <div>   
      <div className="herolog"> 
      <div className="form-boxlog">
             <form id="user" className="inputlog"  onSubmit={login}>
             <input type="text"    name="emailORusername" className="input-fieldlog" placeholder="أسم المستخدم او البريد الالكتروني " required></input>
             <input type="password" name="password" className="input-fieldlog" placeholder="كلمه المرور" required></input>
             
          {errorLogin !== null? <Alert severity="error">{errorLogin}</Alert> : null}
             <button type="submit"   className="submit-btnlog" > {" "}تسجيل الدخول</button>
             <p> ليس لديك حساب؟<Link to="/signup">أنشئ حسابك الآن</Link></p>
             <p><Link to="/signup">نسيت كلمه المرور؟</Link></p>
             </form>
        </div>
      
        <div className="">
          <img  className="imglog" alt="no ige"src={require("../../assets/Home/dr4.png")}/>
        </div>
      </div>
    </div>
  );
}
