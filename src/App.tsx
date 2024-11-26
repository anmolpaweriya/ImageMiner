import About from "./components/About"
import DownloadSection from "./components/DownloadSection"
import Footer from "./components/Footer"
import HeroSection from "./components/HeroSection"
import NavBar from "./components/NavBar"

function App() {

  return (<main
    className="min-h-screen"
  >
    <NavBar />
    <HeroSection />
    <About />
    <DownloadSection />
    <Footer />

  </main>
  )
}

export default App
