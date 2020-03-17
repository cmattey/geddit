import axios from 'axios'
const baseUrl = '/api/users'

const register = async credentials => {
  try {

      const response = await axios.post(baseUrl, credentials)
      return response.data

  } catch (exception){
    console.error("Exception occured in registration service: ", exception)
  }
}

export default { register }
