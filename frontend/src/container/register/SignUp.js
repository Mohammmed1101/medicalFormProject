import React from 'react';
import "./sign-up.css"
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from "axios";
import { TextField } from '@mui/material';
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

    const [users, setUser] = useState({
        email: "", firstName: "", password: "", lastName: "", username: ""
    })

    let name, value;
    const hh = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setUser({ ...users, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { email, firstName, password, lastName, username } = users

        const res = await fetch("/MyMediForm/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, username, email, password })
        })

        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("Invalid reg")
            console.log("")
        } else {
            window.alert("check your email")
            console.log("done")
            nav('/login');
        }
        console.log(JSON.stringify({
            email, firstName, password, lastName, username
        }))
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
            await axios.post("/MyMediForm/auth/signup/company", userBody)
            console.log("sucesfull")
            nav("/login")
        } catch (error) {
            return ("ERROR!!" + error)
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

                <form method='POST' ref={user} id="user" className='input'>
                    <input type="text" onChange={hh} name="username" required className='input-field' placeholder='اسم المستخدم'></input>
                    <input type="text" onChange={hh} name="firstName" required className='input-field' placeholder='الأسم'></input>
                    <input type="text" onChange={hh} name="lastName" required className='input-field' placeholder='أسم العائله'></input>
                    <input type="email" onChange={hh} name="email" required className='input-field' placeholder='البريد الالكتروني' ></input>
                    <input type="password" onChange={hh} required name="password" className='input-field' placeholder='كلمه السر'></input>
                    <button className='submit-btn' onClick={PostData} > إنشاء حساب</button>
                    <p> لديك حساب مسبقا؟<Link to="/login">تسجيل الدخول </Link></p>
                </form>


                <form method='POST' ref={company} id="company" className='input' onSubmit={signupforCompany} >
                    <input type="text" name="companyName" className='input-field' placeholder='أسم الشركه' required></input>
                    <input type="number" name="company_No" className='input-field' placeholder='رقم الشركه' required></input>
                    <input type="text" name="username" className='input-field' placeholder='اسم المستخدم' required></input>
                    <input type="email" name="email" className='input-field' placeholder='البريد الالكتروني' required></input>
                    <input type="password" name="password" className='input-field' placeholder='كلمه السر' required></input>
                    <button type="submit" name='submit' className='submit-btn'> إنشاء حساب</button>
                </form>

                <p> لديك حساب مسبقا؟<Link to="/login">تسجيل الدخول </Link></p>

            </div>

            <div className='pic'>
                <img className='img' alt='doctor' src={require("../../assets/Home/dr5.png")} />

            </div>

        </div>

    );
}

