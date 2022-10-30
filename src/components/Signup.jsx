import { async } from '@firebase/util'
import React,{useRef} from 'react'
import {Alert, Button, Card, Form } from 'react-bootstrap'
import { userAuth } from './context/authContext'
const Signup = () => {

    const {signup} = userAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error,setError]= React.useState('')
    const [loading,setLoading] = React.useState(false)

    async function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return setError('password do not match')
        }
        try{
            setError('')
            setLoading('true')
          await signup(emailRef,passwordRef)


        } catch{
            setError('firebase not working');
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant='danger'>{error}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>



                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Password-Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button type="submit" className="w100" disabled={loading}>Sign Up</Button>

                    </Form>


                </Card.Body>
            </Card>
            <div className='w-100 text-center mt2'>
                Already have an account ? Log In
            </div>
        </>
    )
}

export default Signup