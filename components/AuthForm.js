import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Swal from 'sweetalert2'
import useForm from '../utils/useForm'
import validateForm from '../utils/validateForm'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSalutations, setIdle } from '../redux/authSlice'

const AuthForm = () => {
  const salutations = useSelector((state) => state.auth.salutations)
  const authStatus = useSelector((state) => state.auth.status)
  const authError = useSelector((state) => state.auth.error)
  const {
    values,
    resetValues,
    attempted,
    setAttempted,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
  } = useForm(validateForm)
  const dispatch = useDispatch()

  useEffect(() => {
    if (salutations.length === 0) {
      dispatch(getSalutations())
    }
    if (authStatus === 'succeeded') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You are successfully registered',
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          dispatch(setIdle())
          resetValues()
          setErrors({})
          setAttempted(false)
        },
      })
    }
    if (authStatus === 'rejected' || authStatus === 'error') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: authError,
        showConfirmButton: false,
        timer: 1500,
        willClose: dispatch(setIdle()),
      })
    }
    setErrors(validateForm(values))
  }, [values, authStatus])

  return (
    <>
      <Container className="my-4">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formSalutation">
                <Form.Label>Salutation</Form.Label>
                <Form.Control
                  as="select"
                  name="salutation"
                  type="text"
                  onChange={handleChange}
                >
                  {salutations.map((salutation, index) => {
                    return <option key={index}>{salutation}</option>
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName && attempted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName && attempted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email && attempted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBirthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  name="birthdate"
                  type="date"
                  value={values.birthdate}
                  onChange={handleChange}
                  isInvalid={!!errors.birthdate && attempted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.birthdate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone && attempted}
                  maxLength="8"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button
                  className="btn-block"
                  variant="primary"
                  type="submit"
                  disabled={authStatus === 'loading'}
                >
                  {authStatus === 'loading' ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Register</span>
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AuthForm
