import { Route, Routes as ReactRoutes, BrowserRouter } from 'react-router-dom';

import { route } from './route';
import { HomePage } from './modules/pages/HomePage';
import { Bank } from './modules/pages/Bank';

export function MyRoutes() {
	return (
		<BrowserRouter>
			<ReactRoutes>
				<Route path={route.home()} element={<HomePage />} />
				<Route path={route.bank()} element={<Bank />} />
			</ReactRoutes>
		</BrowserRouter>
	);
}