import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../redux/authSlice'

const useForm = (validate) => {
  const dispatch = useDispatch()
  const [attempted, setAttempted] = useState(false)
  const [values, setValues] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    phone: '',
  })

  const resetValues = () => {
    setValues({
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      birthdate: '',
      phone: '',
    })
  }

  const [errors, setErrors] = useState({})

  const getValue = (n, v) => {
    if (n === 'firstName' || n === 'lastName') {
      return v.replace(/[^A-Za-z]/gi, '')
    }
    if (n === 'phone') {
      return v.replace(/[^\d+]/, '')
    }

    return v
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: getValue(name, value),
    })
  }

  const handleSubmit = (e) => {
    console.log(values, '{{{')
    e.preventDefault()
    setAttempted(true)
    setErrors(validate(values))
    if (Object.keys(errors).length === 0) {
      dispatch(register(values))
    }
  }

  return {
    values,
    resetValues,
    attempted,
    setAttempted,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
  }
}

export default useForm
