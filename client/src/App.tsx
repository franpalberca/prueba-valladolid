import RouterPaths from './router/RouterPaths.routes';
import './App.css';
import {Auth0Provider} from '@auth0/auth0-react';

const {VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId} = import.meta.env;
const redirectUri = window.location.origin + '/private';
function App() {
	return (
		<>
			<Auth0Provider
				domain={domain}
				clientId={clientId}
				authorizationParams={{
					redirect_uri: redirectUri,
				}}>
				<RouterPaths />
			</Auth0Provider>
		</>
	);
}

export default App;
