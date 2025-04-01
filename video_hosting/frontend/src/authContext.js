import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './apiConfig';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get('/profile');
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Authentication check failed:", error.message);
        setIsAuthenticated(false);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (data, setStatus) => {
    try {
      const response = await api.post('/login', data);
      if (response.status === 200) {
        setStatus({ message: "Login successful! Redirecting.", type: "success" });
        setTimeout(() => {
          setIsAuthenticated(true);
          navigate('/home');
        }, 1000);
      }
    } catch (error) {
      setStatus({
        message: error.response?.data?.message || "Login failed. Please try again.",
        type: "error",
      });
    }
  };

  const register = async (data, setStatus) => {
    try {
      const response = await api.post('/register', data);
      if (response.status === 201) {
        setStatus({ message: "Registration successful!", type: "success" });
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      setStatus({
        message: error.response?.data?.message || "Registration failed. Please try again.",
        type: "error",
      });
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setIsAuthenticated(false);
      setUserData(null);
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};