import { MOCK_USERS } from "@/lib/data";
import { IUser, UserRole } from "@/lib/types";
import { fetchData } from "@/lib/utils";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface AuthContextType {
  user: IUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  verifyRegistration: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const getInitialState = () => {
  const currentUser = sessionStorage.getItem("user");
  return currentUser ? JSON.parse(currentUser) : null;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(getInitialState);

  const login = (role: UserRole) => {
    if (role === UserRole.GENERAL) {
      setUser(MOCK_USERS.GENERAL);
      localStorage.setItem("user", JSON.stringify(MOCK_USERS.GENERAL));
    } else {
      setUser(MOCK_USERS.POLICE);
      localStorage.setItem("user", JSON.stringify(MOCK_USERS.POLICE));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const verifyRegistration = async () => {
    const data = await fetchData(`/vehicles/users/${user?._id}`, "GET");

    if (data.data) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user) as IUser);
    }
  }, [user?.email]);

  return (
    <AuthContext.Provider value={{ login, logout, user, verifyRegistration }}>
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
