import { useAuth0 } from "@auth0/auth0-react"
import PicturesButtons from "../../components/modalButton/PicturesButtons"

const WellnessPage = () => {
  const { isAuthenticated } = useAuth0()
  console.log(isAuthenticated)
  return (
    <>
      <PicturesButtons />
      </>
  )
}

export default WellnessPage