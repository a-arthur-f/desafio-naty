import { createContext } from "react";

interface ErrorContextProps {
  error: string;
  setError: (value: string) => void;
}

export const ErrorContext = createContext<ErrorContextProps>({
  error: "",
  setError: () => {},
});
