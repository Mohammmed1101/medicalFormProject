import React from 'react';
import './App.css';
import Home from './container/Home/Home';
import Navbar from './container/Home/header/Navbar'
import Signup from './container/register/SignUp';
import Login from './container/login/Login';
import { Routes, Route } from 'react-router-dom';
import Drugs from './container/Drugs/Drugs';
import DashBord from './container/AdminDashbord/DashBord';
import Posts from './container/posts/Posts';
import DrugPage from './container/Drugs/DrugPage';
import Profile from './container/profile/Profile';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import PostsContext from "./utils/PostsContext"
import CompanyProfile from './container/profile/CompanyProfile';
import Forgetpassword from './container/login/Forgetpassword';
import ResetPassword from "./container/login/ResetPassword"
import EmailVerified from "./container/register/EmailVerified"

function App() {

  const [errorLogin, setErrorLogin] = useState(null)
  const [profile, setProfile] = useState(null)
  const [Drug, setDrug] = useState([]);
  const [Comment, setComment] = useState([]);
  const [errorResetPassword, setErrorResetPassword] = useState(null)
  const [errorForgetPassword, setErrorForgetPassword] = useState(null)
  const [successForgetPassword, setSuccessForgetPassword] = useState(null)
  const navigate = useNavigate();


  const getProfile = async () => {
    const response = await axios.get("/MyMediForm/auth/profile", {
      headers: {
        Authorization: localStorage.tokenSocial
      },
    })
    setProfile(response.data)
  }

  /////////////login
  const login = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const emailORusername = form.elements.emailORusername.value
      let userBody
      if (emailORusername.includes("@")) {
        userBody = {
          email: emailORusername,
          password: form.elements.password.value,
        }
      } else
        userBody = {
          username: emailORusername,
          password: form.elements.password.value,
        }
      const response = await axios.post("/MyMediForm/auth/login", userBody)
      const token = response.data
      localStorage.tokenSocial = token
      getProfile()
      console.log("login success")
      setErrorLogin(null)
      if ( profile.role==='Admin'){
         return navigate("dashbord")}
         else if (profile.role==='DRA'){
         return navigate("orgprofile")}
         else if (profile.role==='Company'){
         return navigate("orgprofile")}
         else if (profile.role==='Consumer'){
         return navigate("profile")}
         else if ( profile.role==='Specialist'){
         return navigate("profile")}
         else
         return navigate("/")
      
   
    } catch (error) {
      if (error.response) setErrorLogin(error.response.data)
      else console.log(error)
    }
  }

//// 

const forgetPassword = async e => {
  e.preventDefault()
  try {
    const form = e.target
    const emailOrUsername = form.elements.emailOrUsername.value
    let userBody
    if (emailOrUsername.includes("@")) {
      userBody = {
        email: emailOrUsername,
      }
    } else
      userBody = {
        username: emailOrUsername,
      }

    await axios.post("/MyMediForm/auth/forgot-password", userBody)
    setErrorForgetPassword(null)
    setSuccessForgetPassword("تم ارسال رابط استعاده كلمه المرور الى البريد الالكتروني الخاص بك ")

  } catch (error) {
    if (error.response) setErrorForgetPassword(error.response.data)
    else console.log(error)
  }
}
/////////////////
const resetPassword = async (e, token) => {
  e.preventDefault()
  try {
    const form = e.target
    const password = form.elements.password.value
    const confirmPassword = form.elements.confirmPassword.value
    if (password !== confirmPassword) setErrorResetPassword("غير متطابقه!")

    const userBody = {
      password: password,
    }

    await axios.post(`/MyMediForm/auth/reset-password/${token}`, userBody)
    console.log("password reset")
    setErrorResetPassword(null)
    navigate("/login")
  } catch (error) {
    if (error.response) setErrorResetPassword(error.response.data)
    else console.log(error)
  }
}
  ///////////////add new drug
  const addDrug = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const drugBody = {
        description: form.elements.description.value,
        image: form.elements.image.value,
        RegisterNo: form.elements.RegisterNo.value,
        Name: form.elements.Name.value,
        termOfUse: form.elements.termOfUse.value,
      }
      form.reset()
      await axios.post("/MyMediForm/drug/", drugBody, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })

      getProfile()
      toast("drug added");
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
      toast.error(error)
    }
  }

  const deleteDrugs = async drugId => {
    try {

      await axios.delete(`/MyMediForm/drug/${drugId}`, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })
      getProfile()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }


  //////////////add new comment 


  const addComment = async (e, Drugid) => {
    e.preventDefault()
    try {
      const form = e.target
      const commentBody = {
        comment: form.elements.comment.value,
      }
      form.reset()
      await axios.post(`/MyMediForm/drug/${Drugid}/comments`, commentBody, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })

    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  ///////////
  const addRate = async (Drugid, rate) => {
    try {
      const ratingBody = {
        rate,
      }
      await axios.post(`/MyMediForm/drug/${Drugid}/rate`, ratingBody, {
        headers: {
          Authorization:localStorage.tokenSocial,
        },
      })
      alert("شكرا لتقييمك هذا الدواء")
      // toast.success("Your rate is added")
    } catch (error) {
      if (error.response)  alert(error.response.data);//toast.error(error.response.data)
      else alert(error)
    }
  }
  
   
 
  //////////
  const addPost = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const postBody = {
        description: form.elements.description.value,
        image: form.elements.image.value,
        title: form.elements.title.value,

      }
      form.reset()
      await axios.post("/MyMediForm/posts/", postBody, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })      
      getProfile()
      toast("added post");
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const deletePost = async postId => {
    try {

      await axios.delete(`/MyMediForm/posts/${postId}`, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })
      getProfile()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  
  /////////////////////



useEffect (()=>{

  getProfile()

}
)

  /////////////////STORE///////////////
  const store = {
    login,
    errorLogin,
    profile,
    addDrug,
    addComment,
    addPost,
    addRate,
    errorForgetPassword, 
    forgetPassword,
     successForgetPassword ,
     resetPassword,
     errorResetPassword,
     Comment
  }

  return (


    <PostsContext.Provider value={store}>
      <ToastContainer position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Navbar />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/drugs" element={<Drugs />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/drugs/:id" element={<DrugPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
       { profile&&  <>{ profile.role==="Admin"?<Route path="/dashbord" element={<DashBord />} />:"غير مسموح لك بالوصول الى هذه الصفحه"} </>}
       { profile&& <>{   profile.role==="Consumer"|| profile.role==="Specialist"?  <Route path="/profile" element={<Profile />} />:"غير مسموح لك بالوصول الى هذه الصفحه"} </>}
        { profile&&<>{  profile.role==="Company"|| profile.role==="DRA"?  <Route path="/orgprofile" element={<CompanyProfile/>} />:"غير مسموح لك بالوصول الى هذه الصفحه"} </>}
        <Route path="/Forgetpassword" element={<Forgetpassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/email_verified/:token" element={<EmailVerified />} />
      </Routes>
    </PostsContext.Provider >

  );
}

export default App;
