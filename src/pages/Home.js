import React from 'react';
import {useAuthDispatch} from '../context/auth';
import {TasksList} from '../components/TasksList';

export default function Home() {


    const dispatch = useAuthDispatch();

    const handleSignOut = () => {
        dispatch({type: 'LOGOUT'});
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token')
    }

    return (
      <div className="min-h-screen bg-wood">
        <div >
          <button onClick={handleSignOut} className="group absolute top-0 right-0 mt-3 mr-3  w-1/8 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign out
          </button>  
          <p className="text-center text-4xl ">TODO App</p>
        </div>
        <div >
        <TasksList/>
        </div>
      </div>
    )
}
