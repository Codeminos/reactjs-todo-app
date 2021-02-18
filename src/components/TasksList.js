import React,{useState,useEffect} from 'react'
import {TodoForm} from '../components/TodoForm';
import {Todo} from '../components/Todo';
import {useTasksDispatch,useTasksState} from '../context/tasks';
import { Link } from 'react-router-dom';

export const TasksList = () => {

    const [labelFilter,setLabelFilter] = useState('');
    const [filterValue, setFilterValue] = useState('all');
    const [clearForm,setClearForm] = useState(false)
    const [filterValues,setFilterValues]= useState({
        priorityValue: 'all',
        labelsValue: ''
    })
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

    const handleSelect = (event) =>{
        setFilterValues({
            ...filterValues,
            priorityValue: event.target.value
        })
    }

    const handleLabelFilter = (event) => {
        setFilterValues({
            ...filterValues,
            labelsValue: event.target.value
        })
    }

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



    const filterArr = (arr) => {
        
        let finalFilteredArr = filterValues.labelsValue === '' && filterValues.priorityValue === 'all' ? [...arr] : (filterValues.labelsValue === '' && filterValues.priorityValue !== 'all' ? [...arr].filter(task => task.priority === filterValues.priorityValue) :
        (filterValues.labelsValue !== '' && filterValues.priorityValue === 'all' ? [...arr].filter(task => task.tags.includes(filterValues.labelsValue)) : ([...arr].filter(task => task.priority === filterValues.priorityValue && task.tags.includes(filterValues.labelsValue)))))
         
        return finalFilteredArr;
    }

    let filteredArr = filterArr([...todoState.todos]);


    // const filterArrLabels = (labelFilterValue,arr) => {
    //     if(labelFilterValue === ""){
    //         filteredArr = [...todoState.todos]
    //     }
    //     filteredArr = [...arr].filter(task => task.tags.includes(labelFilterValue));
    // }

    
    return   (
        <>
            <div className="space-y-5 min-w-1/4 max-w-full flex flex-col justify-center items-center">
            <div className="bg-blue-500 text-white font-semibold absolute top-0 left-0 border-2 border-blue-400 rounded-lg px-2 py-2 mt-3 ml-3">
                <Link to="/archive">Archive</Link>  
                </div>
                <div className="flex flex-row">
                <div className="flex flex-col mr-3">
                    <p className="mb-2 text-white font-bold">Filter TODOs: </p>
                    <label htmlFor="priority" className="text-white text-sm font-bold">Priority:</label>
                    <select id="priority" onChange={handleSelect}  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                        <option value="all">All</option>
                        <option value="normal">normal</option>
                        <option vlaue="important">important</option>
                        <option value="urgent">urgent</option>
                    </select>
                   
                    <label htmlFor="labelFilter" className="text-white text-sm font-bold">Label:</label>
                    <input id="labelFilter" onChange={handleLabelFilter} name="labelFilter" type="text"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Task title..."/>                    
                </div>
                {/* <div>
                <button onClick={filterArr(filteredArr)} className=" mt-10">
                        Filter
                    </button>
                </div> */}
                <TodoForm onSubmit={onSubmit} btnText="ADD"  clearForm={clearForm}/>
                </div>
                <Todo filteredArray={[...filteredArr]}/>
            </div>
        </>
    )
}
