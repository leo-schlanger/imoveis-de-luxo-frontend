/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { CircularProgress } from '@material-ui/core';
import api from '../libs/api';
import { User } from '../libs/entities/user';

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({ user: null, token: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies(): Promise<void> {
      const token = Cookies.get('@ImoveisDeLuxo:token');
      const user = Cookies.get('@ImoveisDeLuxo:user');

      if (token && user) {
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setData({ token, user: JSON.parse(user) });
      }

      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post(`/sessions`, {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.type !== 'adm') {
      throw new Error('Usuário não autorizado');
    }

    Cookies.set('@ImoveisDeLuxo:token', token, { expires: 2 });
    Cookies.set('@ImoveisDeLuxo:user', JSON.stringify(user), { expires: 2 });

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('@ImoveisDeLuxo:token');
    Cookies.remove('@ImoveisDeLuxo:user');

    setData({ user: null, token: null });
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      Cookies.set('@ImoveisDeLuxo:user', JSON.stringify(user), {
        expires: 2,
      });

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!data.user,
        isLoading: loading,
        token: data.token,
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

const ProtectRoute: React.FC = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading || (!isAuthenticated && window.location.pathname !== '/')) {
    return <CircularProgress size="180px" color="primary" />;
  }
  return <>{children}</>;
};

export { AuthProvider, ProtectRoute, useAuth };
