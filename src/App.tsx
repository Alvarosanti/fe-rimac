import './App.css'
import { Footer } from './components/Footer/Footer'
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './pages/Home/Home'

function App() {

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* content */}
      <Home />
      {/* footer */}
      <Footer />
    </>
  )
}

export default App
