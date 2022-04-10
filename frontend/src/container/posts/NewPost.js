import React from 'react';
import {Form, Button} from "react-bootstrap"
import { useContext} from "react"
import PostsContext from '../../utils/PostsContext';
function NewPost(props) {
    const { addPost } = useContext(PostsContext)

    return (
        <div className='form-box' style={{"margin-left":"-1px", "width":"40%"}}>
        <Form onSubmit={addPost}>
        <Form.Label  className="mb-3" > أضافه منشور جديد </Form.Label>
      
      
               <Form.Group className="mb-3" controlId="formBasicName">
               <Form.Control type="text" name='title'  placeholder="العنوان " /></Form.Group>
      
               <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>الوصف </Form.Label>
               <Form.Control   name="description" as="textarea"  rows={3} /></Form.Group>
                  
               <Form.Group className="mb-3" controlId="formBasicName">
               <Form.Control type="text" name='image'  placeholder="رابط الصوره عنوان url  " /></Form.Group>

                <Button  type="submit"> نشر</Button>
      </Form>
              </div>
    );
}

export default NewPost;