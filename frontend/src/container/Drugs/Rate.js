import React from 'react';
import { useState } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { AiFillStar } from "react-icons/ai"
import OneStar from "./OneStar"

export default function Rate(props) {
    const [show, setShow] = useState(false)
    const [fill, setFill] = useState(0)
    const { Drugid } = props
   
return (
 
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip>
          <div style={{ padding: 15 }} onMouseLeave={() => setFill(0)}>
            <OneStar fill={fill} setFill={setFill} starNumber={1} Drugid={Drugid} setShow={setShow} />
            <OneStar fill={fill} setFill={setFill} starNumber={2} Drugid={Drugid} setShow={setShow} />
            <OneStar fill={fill} setFill={setFill} starNumber={3} Drugid={Drugid} setShow={setShow} />
            <OneStar fill={fill} setFill={setFill} starNumber={4} Drugid={Drugid} setShow={setShow} />
            <OneStar fill={fill} setFill={setFill} starNumber={5} Drugid={Drugid} setShow={setShow} />
          </div>
        </Tooltip>
      }
      show={show}
    >
      <Button variant="dark" onClick={() => setShow(!show)}>
        <AiFillStar />
      </Button>
    </OverlayTrigger>
  )
}
