import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import StateSpecificRoute from './components/stateSpecificRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:id" component={StateSpecificRoute} />
    <Route component={NotFound} />
  </Switch>
)

export default App
