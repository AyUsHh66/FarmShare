import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Equipment from './pages/Equipment'
import ListEquipment from './pages/ListEquipment'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import HowItWorks from './pages/HowItWorks'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="list-equipment" element={<ListEquipment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App 