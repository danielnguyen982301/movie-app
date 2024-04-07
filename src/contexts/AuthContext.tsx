import { createContext, useReducer, useEffect, ReactNode } from "react";
import useFavorite from "../hooks/useFavorite";

interface State {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: null | { username: string };
}

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

enum AuthTypes {
  INITIALIZE = "INITIALIZE",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGOUT = "LOGOUT",
}

const INITIALIZE = "INITIALIZE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const reducer = (state: State, action: { type: AuthTypes; payload?: any }) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

interface AuthContextType extends State {
  login: (username: string, callback: () => void) => void;
  logout: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: ReactNode }) {
  const { setFavoriteMovies, setFavoriteTVs } = useFavorite();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const username = window.localStorage.getItem("username");

        if (username) {
          dispatch({
            type: AuthTypes.INITIALIZE,
            payload: { isAuthenticated: true, user: { username } },
          });
        } else {
          dispatch({
            type: AuthTypes.INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: AuthTypes.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async (username: string, callback: () => void) => {
    window.localStorage.setItem("username", username);
    dispatch({
      type: AuthTypes.LOGIN_SUCCESS,
      payload: { user: { username } },
    });
    callback();
  };

  const logout = async (callback: () => void) => {
    window.localStorage.clear();
    setFavoriteMovies("[]");
    setFavoriteTVs("[]");
    dispatch({ type: AuthTypes.LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
