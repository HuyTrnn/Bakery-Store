import RouteGuard from './RequireAuth';
import { useSelector } from 'react-redux';
import { Navigate, Routes , Route} from 'react-router-dom';
import AdminPage from './adminPage';



export default function RouterAdmin() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Routes>
    <Route
      path="/admin"
      element={
        <RouteGuard
          component={AdminPage}
          isAuthorized={(user) => user.level == '1'}
          redirectTo="/login"
        />
      }
    />
  </Routes>
  );
}