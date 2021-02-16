import React, {useState} from 'react'
import {useAuthDispatch} from '../context/auth';


export default function Login(props) {
    const [email,setEmail] = useState(' ');
    const [password, setPassword] = useState('');

    const dispatch = useAuthDispatch();


    const handleSubmit = (event) => {
        event.preventDefault();
        if(email === "user@email.com" && password === "123456"){
          let data = {
            email: email,
            password: password,
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw "
          }
          dispatch({type:'LOGIN', payload: data});
          localStorage.setItem('currentUser', JSON.stringify(data));
          props.history.push('/')
        }
        dispatch({type: 'LOGIN_ERROR', error: 'Wrong email or password'});
        return;
        
    }

    return (
        <div className="bg-wood min-h-screen min-w-1/2 overflow-hidden flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <form className="min-w-1/4 mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true"/>
            <div className="rounded-md  shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className=" sr-only">Email address</label>
          <input id="email-address" value={email} onChange={event => setEmail(event.target.value)} name="email" type="email" autoComplete="email" required className="min-w-full appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" value={password} onChange={event => setPassword(event.target.value)}  name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
        </div>
      </div>

      

      <div>
        <button type="submit" className="group relative self-center w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
            </form>
        </div>
    )
}

