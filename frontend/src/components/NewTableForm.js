import React from 'react';

const NewTableForm = ({handleCreateTable, title, handleTitle}) => {

  return(
    <>
    <h3> Create new Table </h3>
    <form onSubmit={handleCreateTable}>
    New Table Title:
    <input
      type="text"
      value={title}
      name="Title"
      onChange={({ target }) => handleTitle(target.value)}
      required
    />
    <button type="submit">create</button>
    </form>
    </>
  )
}

export default NewTableForm
