import React, {useState, useEffect} from 'react';
import TableService from '../services/tables'

const TableList = ({ user }) => {

  const [tables, setTables] = useState([])

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
          {tables.map(tableID => <div key={tableID}> {tableID} </div>) : null }
        </div>
      )
  }
  else{
    return(<div></div>)
  }

}

export default TableList
