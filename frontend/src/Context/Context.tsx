"use client";
import React, {
  createContext,
  Context,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValueAuth: AuthContextProps = {
  isLoggedIn: false,
  setLoggedIn: () => {},
};

const AuthContext: Context<AuthContextProps> = createContext(defaultValueAuth);

interface GlobalContextProviderProps {
  children: ReactNode;
}
export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("noteJWT");
    if (storedToken) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
