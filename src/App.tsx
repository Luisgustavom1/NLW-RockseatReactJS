import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {Home} from './pages/Home'
import {NewRoom} from './pages/newRoom'
import { AdminRoom } from './pages/AdminRoom'
import Room from './pages/Room'

import AuthContextProvider from './contexts/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/> 
          <Route path="/room/new" component={NewRoom}/>
          <Route path='/room/:id' component={Room}/>

          <Route path='/admin/room/:id' component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
