import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components Jobby app/ProtectedRoute'
import NotFound from './components Jobby app/NotFound'
import Home from './components Jobby app/Home'
import Jobs from './components Jobby app/Jobs'
import JobItemDetails from './components Jobby app/JobItemDetails'
import Login from './components Jobby app/Login'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
