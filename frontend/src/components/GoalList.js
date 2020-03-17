import React, {useState, useEffect} from 'react';
import GoalService from '../services/goalService'
import NewGoalForm from './NewGoalForm'
import SpecialService from '../services/specialGoal'

const GoalList = ({ user, tableID }) => {

  const [goals, setGoals] = useState([])
  const [goal, setGoal] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {

    async function loadGoals (){
      try{
        // if (tableID){
          const initialGoalIDs = await GoalService.getGoalsList(tableID)
          console.log("INTIAL GOALS IDS: ", initialGoalIDs)
          const initialGoals = await GoalService.getGoalsByID(initialGoalIDs)
          console.log("INITIAL GOALS:", initialGoals)
          // const initialBlogs = await Promise.all(initialBlogIds.map(id => blogService.getById(id)))
          setGoals(initialGoals)
        // }
      } catch(exception){
        console.log("Exception occured in Goals component useEffect: ", exception)
      }
    }
    loadGoals()

    return function cleanup(){
      // Need to update this to avoid memory leak and cancel all subscriptions and async tasks in useEffect
      setGoals([])
    }

  },[tableID])

  const handleSubmitGoal = async (event) => {
    event.preventDefault()
    try{
      const goalObj = {
        author:user.id,
        title:title,
        description:goal,
        parentTable:tableID,
      }

      const newGoal = await GoalService.addGoal(goalObj)
      // console.log(newGoal)

      setGoals(goals.concat(newGoal))
      setTitle('')
      setGoal('')

      SpecialService.checkSpecialGoal(newGoal);

    } catch (exception){
      console.error("Exception occured in handling New Goal: ", exception)
    }
  }

  const handleDelete = async (id) => {
    try{
      await GoalService.deleteGoal(id)

      const newGoals = goals.filter(goal => goal.id !== id)
      setGoals(newGoals)

    }catch (exception){
      console.error("Exception occured in deleting goal frontend: ", exception)
    }
  }

  if(tableID && goals){
    return(
      <>
      <tr>
        <td>
          <NewGoalForm handleSubmitGoal={handleSubmitGoal} title={title} handleTitle={setTitle} goal={goal} handleGoal={setGoal}/>
        </td>
      </tr>
      {goals.map(goal => <tr key={goal.id}><td key={goal.id} style={{border:'1px solid #34dbeb'}}> <b>{goal.title}</b>: {goal.description}
      {goal.author===user.id ? <button onClick={() => handleDelete(goal.id)} style={{float: 'right'}}>delete</button> :null}
      </td></tr>)}
      </>
      )
  }
  else{
    return(<tr></tr>)
  }

}

export default GoalList
