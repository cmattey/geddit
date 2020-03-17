import axios from 'axios'
import tokenService from './token'
const baseUrl = '/api/users'
const tableBaseUrl = '/api/tables'

const getTableList = async (userID) => {
  try{

      const user = await axios.get(`${baseUrl}/${userID}`)
      const { data } = user
      return await data.personalTables

  } catch (exception){
    console.error("Exception occured in getTableList service: ", exception)
  }
}

const createTable = async (tableObj) => {
  try{
    const config = {
      headers: {Authorization: tokenService.getToken()}
    }

      const newTable = await axios.post(tableBaseUrl, tableObj, config)
      return newTable.data

  } catch (exception){
    console.error("Exception occureed in create Table service fe: ", exception)
  }
}

export default { getTableList, createTable }
