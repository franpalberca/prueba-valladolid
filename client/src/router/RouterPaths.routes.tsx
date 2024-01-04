import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/public/LandingPage';
import WellnessPage from '../pages/private/WellnessPage';
import {HOME, PRIVATE} from '../config/routes/paths';
import {PublicRoute} from '../components/router/PublicRoute';
import {PrivateRoute} from '../components/router/PrivateRoute';

const RouterPaths = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={HOME} element={<PublicRoute />}>
						<Route index element={<LandingPage />} />
					</Route>
					<Route path={PRIVATE} element={<PrivateRoute />}>
						<Route index element={<WellnessPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default RouterPaths;
