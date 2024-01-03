import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { WELLNESS } from '../../config/routes/paths';

export const PublicRoute = () => {
    const {isAuthenticated} = useAuth0();

    if (isAuthenticated) {
        return <Navigate to={WELLNESS} />;
    }
    return (
        <div>
            <Outlet />
        </div>
    )

}