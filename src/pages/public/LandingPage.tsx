import { Button } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react"

const LandingPage = () => {
    const {loginWithRedirect, logout, user, isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}

    return (
    <>
    
        <Button onClick={() => loginWithRedirect()}>Login</Button>
    </>
  )
}

export default LandingPage