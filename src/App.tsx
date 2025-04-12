import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Equipment from './pages/Equipment'
import ListEquipment from './pages/ListEquipment'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import HowItWorks from './pages/HowItWorks'
import RentalRequests from './pages/RentalRequests'
import About from './pages/footer/About'
import Contact from './pages/footer/Contact'
import FAQ from './pages/footer/FAQ'
import Privacy from './pages/footer/Privacy'
import Terms from './pages/footer/Terms'
import MyEquipment from './pages/MyEquipment'
import CropPrediction from './pages/CropPrediction'
import EquipmentEditPage from './pages/EquipmentEditPage'
import { initializeData } from './utils/initializeData'

function App() {
  useEffect(() => {
    initializeData()
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/list-equipment" element={<ListEquipment />} />
          <Route path="/equipment/:id/edit" element={<EquipmentEditPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/rental-requests" element={<RentalRequests />} />
          <Route path="/my-equipment" element={<MyEquipment />} />
          <Route path="/crop-prediction" element={<CropPrediction />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App 