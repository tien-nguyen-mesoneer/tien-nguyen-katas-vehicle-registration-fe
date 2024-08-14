import { MOCK_USERS } from "@/lib/data";
import { IUser } from "@/lib/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface AuthContextType {
  user: IUser | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const getInitialState = () => {
  const currentUser = localStorage.getItem("user");
  return currentUser ? JSON.parse(currentUser) : null;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(getInitialState);

  const login = () => {
    setUser(MOCK_USERS.POLICE);
    localStorage.setItem("user", JSON.stringify(MOCK_USERS.POLICE));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // TODO: examining the depedency
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user) as IUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
