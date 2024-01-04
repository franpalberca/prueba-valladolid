import {useAuth0} from '@auth0/auth0-react';
import {Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { STATISTICS } from '../../config/routes/paths';

const NavbarSite = () => {
	const {loginWithRedirect, logout, user, isLoading} = useAuth0();
    console.log(user)
	if (isLoading) {
		return <div>Loading...</div>;
	}
    const navigate = useNavigate()
    const handleStatisticsClick = () => {
        navigate(STATISTICS)
    }

	return (
		<>
			<Navbar>{user ? <Button onClick={() => logout()}>Logout</Button> : <Button onClick={() => loginWithRedirect()}>Login</Button>}</Navbar>
            <Button onClick={handleStatisticsClick}>Estadísticas</Button>
		</>
	);
};

export default NavbarSite;
