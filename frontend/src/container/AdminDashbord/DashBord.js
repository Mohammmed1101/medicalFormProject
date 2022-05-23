import React from 'react';
import{Row , Nav ,Tab ,Col,Accordion} from "react-bootstrap"
import "./dashbord.css"
import AddDrug from './AddDrug';
import Drugs from '../Drugs/Drugs';
import AddDRA from './AddDRA';
import Posts from "../posts/Posts"
import SpLe from './SpLe';
export default function DashBord(props) {

    return (
     <div className='ma'>
 
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row >
    <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
          <Nav.Link eventKey="first" >الأدوية</Nav.Link>
          </Nav.Item>
                    
          <Nav.Item>
          <Nav.Link eventKey="second">المستخدمين</Nav.Link>

        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="therd">المنشورات</Nav.Link>
        </Nav.Item>

      </Nav>
    </Col>
    <Col sm={9}>
        
      <Tab.Content>

    <Tab.Pane eventKey="first">
     <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
                <Accordion.Header>أضافه دواء </Accordion.Header>
                   <Accordion.Body>
                    <AddDrug/>
                    </Accordion.Body>
                   </Accordion.Item> 
            <Accordion.Item eventKey="1">
                   <Accordion.Header>جميع الأدويه</Accordion.Header>
                   <Accordion.Body>
                     <div className='col'>
                          < Drugs/>
                   
                     </div>
                   </Accordion.Body>
                  </Accordion.Item>
  
  
</Accordion>

          <sonnet />
         </Tab.Pane>
         <Tab.Pane eventKey="second">
           <AddDRA/>
           <SpLe/>
         <sonnet />
         </Tab.Pane>
  
         <Tab.Pane eventKey="therd">
         <Posts>
         </Posts>
         <sonnet />
         </Tab.Pane>

      </Tab.Content>
    </Col>
     </Row>
</Tab.Container>
</div>
    );
}

