export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  roles: string[];
  name: string; // Add name to response for navbar display
}


export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    roles : string[];
}