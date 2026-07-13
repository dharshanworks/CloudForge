import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "../api/auth.api";
import {
  getAccessToken,
  removeAccessToken,
} from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadCurrentUser() {
    try {
      const token = getAccessToken();

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await getCurrentUser();

      setUser(response.data);
    } catch (error) {
      removeAccessToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCurrentUser();
  }, []);

  function logout() {
    removeAccessToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        refreshUser: loadCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}