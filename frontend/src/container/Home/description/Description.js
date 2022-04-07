import React from 'react';
import "./description.css"

export default function Description() {
    return (

        <div>
                   <div className='herodes'>
            <div className='form-boxdes'> 
                <h4>منصة دوائي </h4>
                
                        <p>
                        هي منصة عربية مصممة لتوفير معلومات شاملة <br></br>وموثوقة عن الأدوية ، كما أنها تُمكّن الأطراف <br></br>المختلفة المهتمة بالأدوية من <br></br>التواصل وتبادل المعلومات والخبرات حول هذه الأدوية.
                        </p>
    
              <div className='picdes'>
             <img  className='imgdes' src={require("../../../assets/Home/dr1.png") } alt="doctor"/>
             </div>
            </div>
            </div>  </div>
    );
}


