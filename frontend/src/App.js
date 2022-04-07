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
import { useParams } from "react-router-dom";
import NewPosts from './container/posts/NewPost';
import DRAprofile from "./container/profile/DRAProfile"
import CompanyProfile from './container/profile/CompanyProfile';
//import Chat from "./container/Chat/Components/Chat/Chat"
function App() {


  const [errorLogin, setErrorLogin] = useState(null)
  const [profile, setProfile] = useState(null)
  const [Drug, setDrug] = useState([]);
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
      navigate("/profile")
    } catch (error) {
      if (error.response) setErrorLogin(error.response.data)
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
      toast("added post");
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
      toast.success("Comment added")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  ///////////
  const addRate = async (e, Drugid) => {
    e.preventDefault()
    try {
      const form = e.target
      const rateBody = {
        rate: form.elements.rate.value,
      }
      form.reset()
      await axios.post(`/MyMediForm/drug/${Drugid}/rate`, rateBody, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })
      toast.success(" rate added")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
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

  /////////////////////
  const postLike = async (drugId ,commentId) => {
    try {
      const response = await axios.get(`/MyMediForm/drug/${drugId}/${commentId}/likes`, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })
      
      alert.success(response.data)
    } catch (error) {
      if (error.response) alert(error.response.data)
      else console.log(error)
    }
  }
  /////////////////STORE///////////////
  const store = {
    login,
    errorLogin,
    profile,
    addDrug,
    addComment,
    addPost,
    addRate,
    postLike
  }
useEffect (()=>{
  getProfile()
}
)
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
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashbord" element={<DashBord />} />
        <Route path="/drugs" element={<Drugs />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/drugs/:id" element={<DrugPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postssss" element={<NewPosts />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/draprofile" element={<DRAprofile />} />
        <Route path="/Companyprofile" element={<CompanyProfile/>} />
      </Routes>
    </PostsContext.Provider >

  );
}

export default App;