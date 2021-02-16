import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import AppRoute from './components/AppRoute'
import {AuthProvider} from './context/auth';
import {TasksProvider} from './context/tasks'
import routes from './Config/routes';

function App() {
  return (
    <AuthProvider>
      <TasksProvider> 
        <Router>
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          ))}
        </Switch>
      </Router>
      </TasksProvider>  
    </AuthProvider>
    
  );
}

export default App;
