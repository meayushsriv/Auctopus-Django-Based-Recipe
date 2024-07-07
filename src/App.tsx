import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import FormPage from "./pages/FormPage";
import SecondPage from "./pages/SecondPage";
import { UserContext } from "./contexts/UserContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, setAlertMessage } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    setAlertMessage("Please enter your details before accessing this page.");
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route
          path="/second"
          element={
            <ProtectedRoute>
              <SecondPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
