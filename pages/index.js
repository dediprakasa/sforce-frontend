import AuthForm from '../components/AuthForm'
import Navbar from 'react-bootstrap/Navbar'

const Home = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/interaktiv.png"
            width="120"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
      </Navbar>
      <AuthForm />
    </>
  )
}

export default Home
