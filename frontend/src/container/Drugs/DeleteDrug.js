import React from "react"
import { useContext } from "react"
import { Button, Modal } from "react-bootstrap"
import PostsContext from "../../utils/PostsContext"


export default function DeletePost(props) {
  const { deletePost } = useContext(PostsContext)
  const { show, setShow, postId } = props
  return (

    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this Post ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => deletePost(postId)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}