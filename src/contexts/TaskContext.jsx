/* eslint-disable react/prop-types */
import { createContext, useState, user } from "react";


export const TaskContext = createContext("default")


export  function TaskProvider({children}) {

  const [taskData, setTaskData] = useState({title : "", description : "", id : "", progress : ""});

  return (

    <TaskContext.Provider value= {{taskData, setTaskData}}> {children} </TaskContext.Provider>
)
}


