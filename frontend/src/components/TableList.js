import React, {useState, useEffect} from 'react'
import TableService from '../services/tables'
import GoalList from './GoalList'
import NewTableForm from './NewTableForm'

const TableList = ({ user }) => {

  const [tables, setTables] = useState([])
  const [newTitle, setTitle] = useState('')

  useEffect(() => {

    async function loadTables (){
      try{
        if (user){
          const initialTables = await TableService.getTableList(user.id)
          // const initialBlogs = await Promise.all(initialBlogIds.map(id => blogService.getById(id)))
          setTables(initialTables)
        }
      } catch(exception){
        console.log("Exception occured in useEffect: ", exception)
      }
    }
    loadTables()

    return function cleanup(){
      // Need to update this to avoid memory leak and cancel all subscriptions and async tasks in useEffect
      setTables([])
    }

  },[user])

  const handleCreateTable = async (event) => {
    event.preventDefault()

    try{

      const tableObj = {
        title: newTitle
      }

      const newTable = await TableService.createTable(tableObj)
      setTables(tables.concat(newTable.id))
      setTitle('')

    } catch(exception){
      console.error("Exception occureed in create table Tablelist component: ", exception)
    }

  }

  if(user && tables){
    return(
      <>
        <NewTableForm handleCreateTable={handleCreateTable} title={newTitle} handleTitle={setTitle}/>
        <div>
          <h3> Your Tables</h3>
          {tables.map(tableID =>
            <table key={tableID} style={{border:'1px solid #dddddd'}}>
            <tbody>
            <tr>
              <th>TABLE: {tableID}</th>
            </tr>
            <GoalList user={user} tableID={tableID} />
            </tbody>
            </table>
          )}
        </div>
      </>
      )
  }
  else{
    return(<div></div>)
  }

}

export default TableList
