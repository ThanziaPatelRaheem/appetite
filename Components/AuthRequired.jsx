import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../Components/Loading";

export default function AuthRequired() {
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const auth = getAuth();

  function handleAuthChange(user) {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    const stopListening = onAuthStateChanged(auth, handleAuthChange);
    return stopListening;
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first", from: location.pathname }}
        replace
      />
    );
  }
  return <Outlet />;
}
