import React from 'react';
import Fotter from "../../assets/Fotter.png"
function HomeFotter(props) {
    return (
        <div>
          <img src= {Fotter} width="60%" style={{"margin-left":"199px"}} alt="doctors"></img>
      <p style={{"textAlign":"center","color":"#9A9A9A","margin-top":"-47px"}}>This Platform <br/>  made with <i className="bi bi-heart"></i> by Abeer Hanash </p> 
        </div>
    );
}

export default HomeFotter;