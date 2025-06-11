export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginFields {
  username: string, 
  password: string,
}
