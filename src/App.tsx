import {BrowserRouter, Route} from 'react-router-dom'

import {Home} from './pages/Home'
import {NewRoom} from './pages/newRoom'

import AuthContextProvider from './contexts/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact={true} component={Home}/> 
        <Route path="/room/new" component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
