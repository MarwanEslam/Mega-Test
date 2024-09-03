import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Exam from './pages/Exam';
import Score from './pages/Score';
import UserChoice from './pages/UserChoice';
import ProtectedRoute from './components/ProtectedRoute';
import { ActiveIndexProvider } from './context/active-index-context';
import { SetAvailablePagesProvider, SetAvailablePagesContext  } from './context/set-available-pages';
import { useContext } from 'react';

function App() {
  // Move useContext inside a component wrapped by the provider
  return (
    <SetAvailablePagesProvider>
      <AppWithContext />
    </SetAvailablePagesProvider>
  );
}


function AppWithContext() {
  // Consume the context here
  const {
    availableHome,
    availableScore,
    availableExam,
    availableUserChoice,
  } = useContext(SetAvailablePagesContext);

  return (
    <ActiveIndexProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={availableHome}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/score"
            element={
              <ProtectedRoute isAuthenticated={availableScore}>
                <Score />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam"
            element={
              <ProtectedRoute isAuthenticated={availableExam}>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userChoice"
            element={
              <ProtectedRoute isAuthenticated={availableUserChoice}>
                <UserChoice />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ActiveIndexProvider>
  );
}

export default App;