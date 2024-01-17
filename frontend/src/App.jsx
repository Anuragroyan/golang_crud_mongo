import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Home from "./pages/Home"
import AddEmployee from './pages/AddEmployee'
import UpdateEmployee from './pages/UpdateEmployee'
function App() {


  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/add' element={<AddEmployee />} />
          <Route path='/update/:id' element={ <UpdateEmployee /> } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
