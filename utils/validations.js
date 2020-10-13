const required = (propertyType) => {
  return v => (v && v.length > 0) || `You must input a ${propertyType}`
}

const minLength = (propertyType, minLength) => {
  return v =>
    (v && v.length >= minLength) ||
      `${propertyType} must be at least ${minLength} characters`
}

const maxLength = (propertyType, maxLength) => {
  return v =>
    (v && v.length <= maxLength) ||
      `${propertyType} must be less than ${maxLength} characters`
}

const isnumeric = () => {
  return v => (v && !isNaN(v)) || 'Must be a number'
}

const isValidEmail = () => {
  return v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
}

export default {
  required,
  minLength,
  maxLength,
  isnumeric,
  isValidEmail
}
