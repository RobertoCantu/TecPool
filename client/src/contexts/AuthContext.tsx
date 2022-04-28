import {createContext,ReactNode,useEffect,useReducer} from 'react'
// utils
import axios from '../utils/axios'
// services
import { 
  login as authLogin,
  register as authRegister 
} from '../services/authService';
// @types
import { ActionMap, AuthContextType,AuthState, AuthUser } from '../@types/authentication'

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER'
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};
  
export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
}

const AuthReducer = (state:AuthState,action:JWTActions) => {
  switch(action.type){
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };
    case 'LOGIN':
      return {
          ...state,
          isAuthenticated:true,
          user: action.payload.user
      }
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated:true,
        user: action.payload.user
      }
    case 'LOGOUT':
      return {
          ...state,
          isAuthenticated: false,
          user: null
      }
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({children} : {children: ReactNode}){
  const [state,dispatch] = useReducer(AuthReducer,initialState);

  useEffect(() => {
    const initialize = async () => {
      const user = window.localStorage.getItem('user');

      if(user) {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: true,
            user: JSON.parse(user)
          }
        });
      } else {
        try {
          const accessToken = window.localStorage.getItem('accessToken');

          if (accessToken) {
            const response = await axios.get('/auth/user', {
              headers: {
                Authorization: 'Bearer ' + accessToken
              }
            });
  
            const { user } = response.data;
  
            dispatch({
              type: Types.Initial,
              payload: {
                isAuthenticated: true,
                user
              }
            });
          } else {
            dispatch({
              type: Types.Initial,
              payload: {
                isAuthenticated: false,
                user: null
              }
            });
          }            
        } catch (err) {
          console.error(err);
  
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      }
    };

    initialize();
  }, []);

  const login = async(email:string,password:string) => {
    try {
      const response:any = await authLogin(email,password);
			console.log(response);

			const { token } = response;
			const user = {
				"name": response.name,
				"lastName": response.lastName,
				"email": response.email,
				"phone": response.phone,
			}

      // Set JWT in local storage
      window.localStorage.setItem('accessToken',token);
      window.localStorage.setItem('user', JSON.stringify(user));
  
      dispatch({
        type: Types.Login,
        payload: {
          user
        }
      })
    } catch(error) {
      console.log(error)
    }
  }

  const register = async(firstName: string, lastName: string,
                         email:string, phone:string, password: string) =>{
    const response:any = await authRegister(firstName, lastName, email, phone, 
                                  password);
    console.log(response);                           
    const { token } = response;
		const user = {
			"name": response.name,
			"lastName": response.lastName,
			"email": response.email,
			"phone": response.phone,
		}
    //Set Jwt in local storage
    window.localStorage.setItem('accessToken',token);
    window.localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: Types.Register,
      payload: {
        user
      }
    })
  }

  const logout = async () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('user');

    dispatch({
        type: Types.Logout
    })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider};