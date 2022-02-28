import React from 'react';
import { Link, link } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'

export const AddUser = () => {
  return <div>
        <Form>
            <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input type="text" name="email" id="exampleEmail" placeholder="enter name" />
            </FormGroup>
            <Button type='submit'>Submit</Button>
            <Link to='/' className='btn btn-outline-secondary ms-2'>Cancel</Link>
        </Form>
  </div>;
};
