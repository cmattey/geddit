import axios from 'axios'
import tokenService from './token'
const baseTableUrl = '/api/tables'
const baseGoalUrl = '/api/goals'

const getGoalsList = async (tableID) => {
  try{

      const table = await axios.get(`${baseTableUrl}/${tableID}`)
      const { data } = table
      return data.goals

  } catch (exception){
    console.error("Exception occured in getGoalsList service: ", exception)
  }
}

const getGoalsByID = async (goalIDs) => {
  try{

      const goals = await Promise.all(goalIDs.map(id => axios.get(`${baseGoalUrl}/${id}`)))
      const goalsData = goals.map(goal => goal.data)
      return goalsData

  } catch (exception){
    console.error("Exception occured in getGoalsByID service: ", exception)
  }
}

const addGoal = async (newGoalObj) => {
  try{
    const config = {
      headers: {Authorization: tokenService.getToken()}
    }

    const response = await axios.post(baseGoalUrl, newGoalObj, config)
    return response.data
  } catch (exception){
    console.error("Exception occured in addGoal: ", exception)
  }
}

const deleteGoal = async (id) => {
  try{

    const config = {
      headers: {Authorization: tokenService.getToken()}
    }
    
    const response = await axios.delete(`${baseGoalUrl}/${id}`, config)
    return response

  } catch (exception){
    console.error("Excpetion occured in delete Goal service:", exception)
  }
}

export default { getGoalsList, getGoalsByID, addGoal, deleteGoal }
