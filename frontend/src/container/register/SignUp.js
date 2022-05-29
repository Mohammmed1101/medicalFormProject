import React from 'react';
import "./sign-up.css"
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from "axios";

//slid  
export default function SignUp() {
    const user = useRef(null);
    const company = useRef(null);
    const btn = useRef(null);
    const nav = useNavigate();


    function userreg() {
        user.current.style.left = "-400px"
        company.current.style.left = "50px"
        btn.current.style.left = "110px"
    }


    function companyreg() {
        user.current.style.left = "50px"
        company.current.style.left = "450px"
        btn.current.style.left = "0px"
    }

    // link with backend for useer

    const [gender, setGender] = React.useState('');

    const signupforConsumer = async e => {
        e.preventDefault()
        try {
            const form = e.target
            const userBody = {
                firstName: form.elements.firstName.value,
                lastName: form.elements.lastName.value,
                username: form.elements.username.value,
                email: form.elements.email.value,
                password: form.elements.password.value,
                gender:gender
            
            }
            await axios.post("/MyMediForm/auth/signup", userBody)
            console.log("sucesfull")
            nav("/login")
            return alert("تم تسجيلك بنجاح يرجى التحقق من البريد الالكتروني الخاص بك ")
           

        } catch (error) {
            return alert("ERROR!!" + error.response.data)
          
        }
    }




    // for company 
  
    const signupforCompany = async e => {
        e.preventDefault()
        try {
            const form = e.target
            const userBody = {
                companyName: form.elements.companyName.value,
                company_No: form.elements.company_No.value,
                username: form.elements.username.value,
                email: form.elements.email.value,
                password: form.elements.password.value,
              
            }
            console.log(form.elements.gender)
            await axios.post("/MyMediForm/auth/signup/company", userBody)
            console.log("sucesfull")
            nav("/login")
        } catch (error) {
            return alert("ERROR!!" + error.response.data)
        }
    }

    return (
        <div className='hero'>
            {/* <p>أنظم الينا الان</p> */}
            <div className='form-box'>
                <div className='b-x'>
                    <div ref={btn} id="btn"></div>
                    <button type='button' className='t-b' onClick={companyreg}>الافراد</button>
                    <button type='button' className='t-b' onClick={userreg}>الشركات</button>
                </div>

                <form method='POST' ref={user} id="user" className='input' onSubmit={signupforConsumer}>
                    <input type="text" name="username" required className='input-field' placeholder='اسم المستخدم'></input>
                    <input type="text" name="firstName" required className='input-field' placeholder='الأسم'></input>
                    <input type="text"  name="lastName" required className='input-field' placeholder='أسم العائله'></input>                    
                    <input type="email"  name="email" required className='input-field' placeholder='البريد الالكتروني' ></input>
                    <input type="password"  required name="password" className='input-field' placeholder='كلمه السر'></input>
                    <label>انثى</label> <input id='fmale' type="radio" onClick={() => setGender('fmale')} name="gender"  value="fmale"/>  
                    <label >ذكر</label> <input id='male' type="radio" onClick={() => setGender('male')}  name="gender"   value="male"/> 
                    <button className='submit-btn' type="submit" name='submit' > إنشاء حساب</button>
                    
                    <p> لديك حساب مسبقا؟<Link to="/login">تسجيل الدخول </Link></p>
                </form>


                <form method='POST' ref={company} id="company" className='input' onSubmit={signupforCompany} >
                    <input type="text" name="companyName" className='input-field' placeholder='أسم الشركه' required></input>
                    <input type="number" name="company_No" className='input-field' placeholder='رقم الشركه' required></input>
                    <input type="text" name="username" className='input-field' placeholder='اسم المستخدم' required></input>
                    <input type="email" name="email"  className='input-field' placeholder='البريد الالكتروني' required></input>
                    <input type="password" name="password" className='input-field' placeholder='كلمه السر' required></input>
                    <button type="submit" name='submit' className='submit-btn'> إنشاء حساب</button>
                    <p> لديك حساب مسبقا؟<Link to="/login">تسجيل الدخول </Link></p>  
                </form>

             

            </div>

            <div className='pic'>
                <img className='img' alt='doctor' src={require("../../assets/Home/dr5.png")} />

            </div>

        </div>

    );
}

