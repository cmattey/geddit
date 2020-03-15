import React, {useState, useEffect} from 'react';
import GoalService from '../services/goalService'
import NewGoalForm from './NewGoalForm'

const GoalList = ({ user, tableID }) => {

  const [goals, setGoals] = useState(null)
  const [goal, setGoal] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {

    async function loadGoals (){
      try{
        if (tableID){
          const initialGoalIDs = await GoalService.getGoalsList(tableID)
          console.log("INTIAL GOALS IDS: ", initialGoalIDs)
          const initialGoals = await GoalService.getGoalsByID(initialGoalIDs)
          console.log("INITIAL GOALS:", initialGoals)
          // const initialBlogs = await Promise.all(initialBlogIds.map(id => blogService.getById(id)))
          setGoals(initialGoals)
        }
      } catch(exception){
        console.log("Exception occured in Goals component useEffect: ", exception)
      }
    }
    loadGoals()
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
      console.log(newGoal)

      setGoals(goals.concat(newGoal))
      setTitle('')
      setGoal('')

    } catch (exception){
      console.error("Exception occured in handling New Goal: ", exception)
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
      {goals.map(goal => <tr key={goal.id}><td key={goal.id} style={{border:'1px solid #34dbeb'}}> GOAL: {goal.title} </td></tr>)}
      </>
      )
  }
  else{
    return(<tr></tr>)
  }

}

export default GoalList
