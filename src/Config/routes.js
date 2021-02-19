import React from 'react';
import Login from '../pages/Login'
import Home from '../pages/Home'
import ArchivePage from '../pages/ArchivePage';

const routes = [
    {
        path: '/login',
        component: Login,
        isPrivate: false,
    },
    {
        path:'/archive',
        component: ArchivePage,
        isPrivate: true
    },
    {
        path: '/',
        component: Home,
        isPrivate:true,
    },
    
    
    
]

export default routes ;