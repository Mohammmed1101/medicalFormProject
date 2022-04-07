import React from 'react'
//import Typical from 'react-typical'
import "./Home.css"
import { ReactTypical} from '@deadcoder0904/react-typical'
import { Link } from 'react-router-dom'


export default function homepage() {
    return(
<div className='p-c'>
    <div className='p-p'>
        <div className='p-d'>        
        <div className='p-d-n'>
                <span className='primary-text'>
                    {" "}
                    مرحبا في <span className='highlighted-text'>منصة دوائي</span>
                </span>
            </div>
            <div className='p-d-r'>
            <span className='primary-text'>
                    {" "}
                    <h1>
                        {" "}
                        <ReactTypical  
                               steps={[
                                   " أكبر منصة أدوية",
                                   1000,

                                   " تفاصيل عن كل أدويتك باللغه العربيه",
                                   1000,

                                   " أستطلاعات واراء المستخدمين",
                                   1000,

                                   " تجمع لمعظم الاطباء",
                                   1000,

                                   "الشركات والمنظمات ايضا",
                                   1000,
                                   
                                   "اخر الأخبار الطبية",
                                   1000,
                               ]}
                               loop={Infinity}
                               wrapper="span"
                            />
                    </h1>
                    <span className='p-r-t'>
                    جميع معلومات ادويتك تجدها لدينا
                    </span>
                </span>
            </div>
            <div className='p-o'>

            <Link className='btn' to="/signup">أنشاء حساب</Link>
            <Link className='btn' to="/login">تسجيل الدخول</Link>
         </div> 
         </div>
         <div className='p-pic'>
             <div className='p-pic-bg'> </div>
         </div>
   
    </div>
</div>
    )
}
