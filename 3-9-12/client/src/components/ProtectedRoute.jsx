import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAuthenticated }) {


  // Define logic to determine if the user is authenticated
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
