import {Form,Button} from 'react-bootstrap';

const ReviewForm = ({handleSubmit}) => {
  return (

    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Write a Review?</Form.Label>
            <Form.Control as="textarea" name="review" rows={3} defaultValue={""} />
        </Form.Group>
        <Button variant="outline-info" type='submit'>Submit</Button>
    </Form>   

  )
}

export default ReviewForm
