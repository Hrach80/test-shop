import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // <--- Ներմուծում ենք
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ background: '#121714', color: '#f3f4f6' }}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer /> {/* <--- Ավելացնում ենք այստեղ */}

        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#161e19',
              border: '1px solid rgba(194, 155, 105, 0.3)',
              color: '#f8fafc',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App