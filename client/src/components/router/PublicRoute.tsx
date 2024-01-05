import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { HOME } from '../../config/routes/paths';

export const PublicRoute = () => {
    const {isAuthenticated} = useAuth0();
    console.log(isAuthenticated)

    if (isAuthenticated) {
        return <Navigate to={HOME} />;
    } else {
        
        return (
            <div>
                <Outlet />
            </div>
        )
    }

}