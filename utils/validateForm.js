const validEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const validPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false
  if (
    phoneNumber.trim().length !== 8 ||
    !['6', '8', '9'].includes(phoneNumber.trim()[0])
  ) {
    return false
  }
  return true
}

const validAge = (birthdate) => {
  const ageDiffMs = Date.now() - new Date(birthdate).getTime()
  const ageDate = new Date(ageDiffMs)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)

  return age >= 16
}

const validateForm = (values) => {
  let errors = {}
  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required'
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required'
  }

  if (!validEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  }

  if (!validPhoneNumber(values.phone)) {
    errors.phone =
      'Phone number must be 8 digits number and started with 6, 8, or 9'
  }

  if (!validAge(values.birthdate)) {
    errors.birthdate = 'You must be 16 year old or older'
  }

  if (new Date(values.birthdate) >= Date.now()) {
    errors.birthdate = 'Birthdate cannot be future date'
  }

  return errors
}

export default validateForm
