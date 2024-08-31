import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user ? `User role: ${user.role}` : 'No user found');

    // Refined condition
    if (!user || user.role !== 'recruiter') {
      navigate('/');
    }
  }, [user, navigate]); // Make sure `user` and `navigate` are in the dependency array

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
