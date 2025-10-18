export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  description: string;
  releaseDate: string;
  duration: number;
  budget: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface MoviesResponse {
  movies: Movie[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
