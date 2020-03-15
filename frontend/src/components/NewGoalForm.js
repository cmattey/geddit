import React from 'react';

const NewGoalForm = ({handleSubmitGoal, title, handleTitle, goal, handleGoal}) => {

  return(
    <form onSubmit={handleSubmitGoal}>
    Title:
    <input
      type="text"
      value={title}
      name="Title"
      onChange={({ target }) => handleTitle(target.value)}
      required
    />
    New Goal:
    <input
      type="text"
      value={goal}
      name="New Goal"
      onChange={({ target }) => handleGoal(target.value)}
      required
    />
    <button type="submit">add</button>
    </form>
  )
}

export default NewGoalForm
