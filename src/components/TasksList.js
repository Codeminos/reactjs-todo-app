import React,{useState,useEffect} from 'react'
import {TodoForm} from '../components/TodoForm';
import {Todo} from '../components/Todo';
import {useTasksDispatch,useTasksState} from '../context/tasks';

export const TasksList = () => {

    const [dateError,setDateError] = useState('');
    const [clearForm,setClearForm] = useState(false)
    const [filterValues,setFilterValues]= useState({
        priorityValue: 'all',
        labelsValue: '',
        dateValue: ''
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
        
        let firstArr = filterValues.labelsValue === '' && filterValues.priorityValue === 'all' ? [...arr] : (filterValues.labelsValue === '' && filterValues.priorityValue !== 'all' ? [...arr].filter(task => task.priority === filterValues.priorityValue) :
        (filterValues.labelsValue !== '' && filterValues.priorityValue === 'all' ? [...arr].filter(task => task.tags.includes(filterValues.labelsValue)) : ([...arr].filter(task => task.priority === filterValues.priorityValue && task.tags.includes(filterValues.labelsValue)))))
         
        let finalArr = filterValues.dateValue === '' ? [...firstArr] : [...firstArr].filter(task => task.date === filterValues.dateValue);

        return finalArr;
    }

    let filteredArr = filterArr([...todoState.todos]);


    return   (
        <>
            <div className="space-y-5 min-w-1/4 max-w-full flex flex-col justify-center items-center">
                <div className="flex flex-row mt-12">
                <div className="flex flex-col ">
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
                    
                    <label htmlFor="date" className="text-white text-sm font-bold">Date:</label>
                    <input 
                            id="date" 
                            value={filterValues.dateValue} 
                            onChange={event => {
                                const selectedDate = new Date(event.target.value);
                                const day1 = selectedDate.getDate()
                                const today = new Date();

                                if(day1 < today.getDate()){
                                    setDateError('Task date cannot be in past');
                                    return;
                                }
                                setFilterValues({
                                    ...filterValues,
                                    dateValue: event.target.value})
                                setDateError(null)
                                console.log(day1)
                            }} 
                            name="date" 
                            type="date"  
                            required 
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                            placeholder="Email address"
                        />
                        {dateError && <p className="text-red-500 text-xs bg-white px-1 py-1 mb-1 rounded">{dateError}</p>}
                </div>
                <p className="text-center font-bold text-5xl mx-24 text-white">TODO App</p>
                <TodoForm onSubmit={onSubmit} btnText="ADD"  clearForm={clearForm}/>
                </div>
                <Todo filteredArray={[...filteredArr]}/>
            </div>
        </>
    )
}
