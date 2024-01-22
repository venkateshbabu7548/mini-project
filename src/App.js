import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Restaurant from './components/Restaurant'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import Payment from './components/Payment'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/restaurant/:id" component={Restaurant} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/payment" component={Payment} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
