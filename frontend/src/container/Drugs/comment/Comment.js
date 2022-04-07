
import React from 'react';
import "./commentStyle.css"
import { useContext } from "react";
import PostsContext from '../../../utils/PostsContext';
import { useParams } from "react-router-dom";
function Comment() {
    const { addComment, Drug } = useContext(PostsContext)
    const {id} = useParams();

    return (
        <div>
                 <form id="algin-form" onSubmit={e => addComment(e, id)}>
                    <div className="form-group">
                        <h4>أترك تعليق</h4>  <textarea  id="" msg cols="30" rows="5" name="comment" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                    </div>
                    <input required type="checkbox"/ >
                     اتعهد ان جميع ما كتبته اعلاه صحيح واتحمل مسوليه ذلك

                    <div className="form-group"> <button type="Submit" id="post" className="btn">أرسال التعليق</button> </div>
                </form>
        </div>
    );
}

export default Comment;