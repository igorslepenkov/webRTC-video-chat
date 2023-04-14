import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { App } from '../app';
import { Home, MeetingRoom } from '../pages';
import { ROUTE } from './route';

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.Home} element={<App />}>
      <Route index element={<Home />} />
      <Route path={ROUTE.Meeting} element={<MeetingRoom />} />
    </Route>,
  ),
);
