import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  try {

      const response = await axios.post(baseUrl, credentials)
      return response.data

  } catch (exception){
    console.error("Exception occured in login service: ", exception)
  }
}

export default { login }
