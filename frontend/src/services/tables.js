import axios from 'axios'
const baseUrl = '/api/users'

const getTableList = async (userID) => {
  try{

      const user = await axios.get(`${baseUrl}/${userID}`)
      const { data } = user
      return await data.personalTables

  } catch (exception){
    console.error("Exception occured in getTableList service: ", exception)
  }
}

export default { getTableList }
