import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';
import {BsArrowLeft} from 'react-icons/bs'
import { useTasksDispatch,useTasksState} from '../context/tasks';
import { Link } from 'react-router-dom';

export default function ArchivePage(){
    
    let todoState = useTasksState();
    let archive = todoState ? [...todoState.archive] : [] /*props.location.state.archive ? [...props.location.state.archive] : []*/;


    const dispatch = useTasksDispatch();

    return(
        <div className="bg-wood min-h-screen ">
            <div className="flex flex-row justify-center w-32 text-center bg-white border-2 border-blue-400 rounded-lg px-2 py-2 ml-5">
                   
                    <Link to='/'>
                        <span className="flex flex-row justify-center items-center">
                            <BsArrowLeft size="20" />
                            <p className="pl-1">Home</p>
                        </span>
                        </Link>
            </div>
            <div>
                <p className="text-7xl mb-10 text-center">Archive</p>
            </div>
            
            {archive.length !== 0 && <div className="min-w-1/2 max-w-full mx-36 min-h-64 bg-gray-200 bg-opacity-30 border-2 border-gray-200 flex flex-col items-center justify-center pt-2 px-2 "> 
            {
                archive.map((todo, index) => (
                    <div className="min-w-3/4 min-h-32 flex flex-row bg-white justify-between mx-1 border-2 px-2 py-2 mb-2 rounded-lg"  key={index}>
                        <div className="flex flex-row justify-between  space-x-10" key={todo.id} >
                            <p>{todo.title}</p>
                        </div>
                        <div>
                        <p>{todo.description}</p>
                        </div>
                        <div>
                        <p>{todo.date}</p>
                        </div>
                        <div >
                            <div className="flex justify-start">
                                {
                                    todo.tags.size !== 0 && todo.tags.map((tag, index) => (
                                        <div className="border-2 rounded-lg border-gray-400 mr-2" key={index}>
                                            <p className="px-1 py-1 text-sm">{tag}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-row justify-between pl-5 space-x-5">
                            <RiCloseCircleLine size={25} color="red" onClick={() =>  dispatch({type: 'DELETE_ARCHIVED', payload:{id:todo.id}})} />
                        </div>
                    </div>
                ))
            }
            </div>
            
        }
        </div>

            
    )   
}

