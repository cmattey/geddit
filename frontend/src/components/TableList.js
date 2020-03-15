import React, {useState, useEffect} from 'react'
import TableService from '../services/tables'
import GoalList from './GoalList'

const TableList = ({ user }) => {

  const [tables, setTables] = useState(null)

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
  },[user])

  if(user && tables){
    return(
        <div>
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
      )
  }
  else{
    return(<div></div>)
  }

}

export default TableList
