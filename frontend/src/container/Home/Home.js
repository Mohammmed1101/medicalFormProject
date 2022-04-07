import React from 'react';
import MyMediform from "./header/MyMediform"
import Footer from "./header/HFooter/Fotter"
import Description from "./description/Description"
import "./2Home.css"
import Navbar from './header/Navbar';
import HomeDrug from './HomeDrug';
import HomePost from '../posts/HomePost';
export default function Home() {
    return (
        <div className='h-c'>
        
                <Navbar/>
                <MyMediform/>
                <Footer/>
                  <Description/>
      <br/>     <br/>     <br/>     <br/>     <br/>     <br/>     <br/>   <br/>     <br/>     <br/>     <br/>     <br/>     <br/>     <br/>   <br/>     <br/>     <br/>     <br/>     <br/>     <br/>     <br/>   <br/>     <br/>     <br/>     <br/>     <br/>     <br/>     <br/>   <br/>     <br/>     <br/>     <br/>     <br/>     <br/>     <br/>   <br/>     <br/>     <br/>   
      <h1 className='lastDrugs'>أخر الأدويه لدينا </h1>
                <HomeDrug/>

                 <br/>     <br/>  
                 <h1 className='lastDrugs'>احدث اخبار ومنشورات الصحه </h1>
                <HomePost/> 
                <br/>     <br/>     <br/>     <br/>     <br/>     <br/>     <br/>   <br/>   <br/>     <br/>     <br/>     <br/>     <br/>     <br/>     <br/>   <br/>  
        </div>
    );
}

