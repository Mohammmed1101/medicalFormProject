import React from 'react';
import {Form, Button} from "react-bootstrap"
import { useContext} from "react"
import PostsContext from '../../utils/PostsContext';
export default function AddDrug() {

    const { addDrug } = useContext(PostsContext)

    return (
    <div className='Adddrug form-box' >
  <Form onSubmit={addDrug}>
  <Form.Label  className="mb-3" > اضافه دواء </Form.Label>

         <Form.Group className="mb-3" controlId="formBasicNumber">
         <Form.Control type="Number" name='RegisterNo'  placeholder="رقم تسجيل الدواء " /> </Form.Group>

         <Form.Group className="mb-3" controlId="formBasicName">
         <Form.Control type="text" name='Name'  placeholder="أسم الدواء " /></Form.Group>

         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
         <Form.Label>وصف الدواء</Form.Label>
         <Form.Control   name="description" as="textarea"  rows={3} /></Form.Group>


         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
         <Form.Label>استخدامات الدواء</Form.Label>
         <Form.Control as="textarea" name='termOfUse'  rows={3} /></Form.Group>

            
         <Form.Group className="mb-3" controlId="formBasicName">
         <Form.Control type="text" name='image'  placeholder="رابط الصوره عنوان url  " /></Form.Group>


         <Form.Group className="mb-3" controlId="formBasicCheckbox">
         <Form.Check required type="checkbox"  label="أتعهد ان جميع البيانات اعلاه صحيحه" /> </Form.Group>

          <Button  type="submit">  نشر </Button>
</Form>
        </div>
    );


}
