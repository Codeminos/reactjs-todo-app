import React,{useState,useEffect} from 'react'
import {TodoForm} from '../components/TodoForm';
import {Todo} from '../components/Todo';
import {useTasksDispatch,useTasksState} from '../context/tasks';
import { Link } from 'react-router-dom';

export const TasksList = () => {

    const [todos,setTodos] = useState([]);
    const [filterValue, setFilterValue] = useState('normal');
    const [clearForm,setClearForm] = useState(false)

    const dispatch = useTasksDispatch();
    const todoState = useTasksState();

    // useEffect(() => {
    //     let currentDate= new Date();
    //     todos.forEach(todo => {
    //         if(Date.parse(todo.date) < currentDate.getTime()){
    //             dispatch({type:'ARCHIVE_TODO', payload:{id:todo}});
    //         }
    //     });
    // },[todos])

    

    const onSubmit = (todo) => {
        dispatch({type: 'CREATE',payload: {
            id: Math.floor(Math.random() * 10000),
            title: todo.title,
            description: todo.description,
            date: todo.date,
            tags: [...todo.tags],
            priority: todo.priority
        }})
        setClearForm(true)
    
    } 


    let filteredArr = [...todoState.todos];

    const filterArrPriority = (filterValue,arr) => {
        if(filterValue === 'all'){
            filteredArr = [...todoState.todos];
            return
        }
        filteredArr = [...arr].filter(task => task.priority === filterValue)
        console.log(filteredArr)
    }

    const filterArrLabels = (filterValue,arr) => {
        filteredArr = [...arr].filter(task => task.tags.includes(filterValue));
    }

    
    return   (
        <>
            <div className="space-y-5 min-w-1/4 max-w-full flex flex-col justify-center items-center">
            <div className="bg-blue-500 text-white font-semibold absolute top-0 left-0 border-2 border-blue-400 rounded-lg px-2 py-2 mt-3 ml-3">
                <Link to="/archive">Archive</Link>  
                </div>
                <div className="flex flex-col">
                    <p className="mb-2 text-white font-bold">Filter by priority: </p>
                    <select value={filterValue} onChange={event => setFilterValue(event.target.value)}  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                        <option value="all">All</option>
                        <option value="normal">normal</option>
                        <option vlaue="important">important</option>
                        <option value="urgent">urgent</option>
                    </select>
                    <button onClick={filterArrPriority(filterValue,filteredArr)} className="hidden">
                        Filter
                    </button>
                </div>
                <TodoForm onSubmit={onSubmit} btnText="ADD"  clearForm={clearForm}/>
                <Todo filteredArray={[...filteredArr]}/>
            </div>
        </>
    )
}
