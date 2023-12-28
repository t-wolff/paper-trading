import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalAuthContext } from "../hooks";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useGlobalAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  return children;
};

export default ProtectedRoute;
