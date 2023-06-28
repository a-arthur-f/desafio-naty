import { createContext } from "react";

interface LoadingContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  setLoading: () => {},
});
