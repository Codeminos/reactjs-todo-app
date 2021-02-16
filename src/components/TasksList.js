import React,{useState,useEffect} from 'react'
import {TodoForm} from '../components/TodoForm';
import {Todo} from '../components/Todo';
import {useTasksDispatch,useTasksState} from '../context/tasks';
import { Link } from 'react-router-dom';

export const TasksList = () => {

    const [todos,setTodos] = useState([]);
    const [archive, setArchive] = useState([]);
    const [hideArchive,setHideArchive] = useState(true)

    const dispatch = useTasksDispatch();
    const todoState = useTasksState();

    useEffect(() => {
        let currentDate= new Date();
        todos.forEach(todo => {
            if(Date.parse(todo.date) < currentDate.getTime()){
                dispatch({type:'ARCHIVE_TODO', payload:{id:todo}});
            }
        });
    },[todos])

    

    const onSubmit = (todo) => {
        dispatch({type: 'CREATE',payload: {
            id: Math.floor(Math.random() * 10000),
            title: todo.title,
            description: todo.description,
            date: todo.date,
            tags: [...todo.tags],
            priority: todo.priority
        }})
    
    } 

    
    return   (
        <>
            <div className="space-y-5 min-w-1/4 max-w-full flex flex-col justify-center items-center">
            <div className="bg-blue-500 text-white font-semibold absolute top-0 left-0 border-2 border-blue-400 rounded-lg px-2 py-2 mt-3 ml-3">
                <Link to="/archive">Archive</Link>  
                </div>
                <TodoForm onSubmit={onSubmit} btnText="ADD"/>
                <Todo/>
            </div>
        </>
    )
}
