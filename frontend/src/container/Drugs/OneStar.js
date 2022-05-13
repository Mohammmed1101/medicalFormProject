import React from 'react';
import { useContext } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { toast } from "react-toastify"
import PostsContext from '../../utils/PostsContext';
import { useParams } from "react-router-dom";
function OneStar(props) {
  const { fill, setFill, starNumber, setShow } = props
  const { addRate} = useContext(PostsContext)
  const {id} = useParams();
  return fill >= starNumber ? (
    <AiFillStar
      size="25"
      onMouseOver={() => setFill(starNumber)}
      onClick={() => {
        if (localStorage.tokenSocial) addRate(id, starNumber)
        else toast.error("please login first")
        setShow(false)
      }}
    />
  ) : (
    <AiOutlineStar size="25" onMouseOver={() => setFill(starNumber)} />
  )
}

export default OneStar
