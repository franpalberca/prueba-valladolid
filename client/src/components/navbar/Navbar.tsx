import {useAuth0} from '@auth0/auth0-react';
import {Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const NavbarSite = () => {
	const {loginWithRedirect, logout, user, isLoading} = useAuth0();
    console.log(user)
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Navbar>{user ? <Button onClick={() => logout()}>Logout</Button> : <Button onClick={() => loginWithRedirect()}>Login</Button>}</Navbar>
		</>
	);
};

export default NavbarSite;
