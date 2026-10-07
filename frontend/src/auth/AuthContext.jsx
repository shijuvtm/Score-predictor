import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchProfile, loginAccount, logoutAccount, registerAccount } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const profile = await fetchProfile();
      setUser(profile);
      return profile;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 503) {
        setUser(null);
        return null;
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser().catch(() => setLoading(false));
  }, [refreshUser]);

  const login = async (credentials) => {
    const signedInUser = await loginAccount(credentials);
    setUser(signedInUser);
    return signedInUser;
  };

  const signup = async (details) => {
    const createdUser = await registerAccount(details);
    setUser(createdUser);
    return createdUser;
  };

  const logout = async () => {
    await logoutAccount();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
