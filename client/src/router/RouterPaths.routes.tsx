import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/public/LandingPage';
import WellnessPage from '../pages/private/WellnessPage';
import {HOME, PRIVATE, STATISTICS, STATISTICSPLAYER} from '../config/routes/paths';
import {PublicRoute} from '../components/router/PublicRoute';
import {PrivateRoute} from '../components/router/PrivateRoute';
import StatisticsPage from '../pages/private/StatisticsPage';
import StatisticsPlayerPage from '../pages/private/StatisticsPlayerPage';

const RouterPaths = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={HOME} element={<PublicRoute />}>
						<Route index element={<LandingPage />} />
						<Route path={STATISTICS} element={<StatisticsPage />}/>
						<Route path={STATISTICSPLAYER} element={<StatisticsPlayerPage />}/>
					</Route>
					<Route path={PRIVATE} element={<PrivateRoute />}>
						<Route index element={<WellnessPage />} />
						{/* <Route path={STATISTICS} element={<StatisticsPage />}/> */}
						{/* <Route path={STATISTICSPLAYER} element={<StatisticsPlayerPage />}/> */}
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default RouterPaths;
