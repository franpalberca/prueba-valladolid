import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../pages/public/LandingPage"
import WellnessPage from "../pages/private/WellnessPage"
import { LANDING, WELLNESS } from "../config/routes/paths"

const RouterPaths = () => {
  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path={LANDING} element={<LandingPage />}/>
            <Route path={WELLNESS} element={<WellnessPage />}/>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default RouterPaths