import { createContext, useContext } from "react";

const UserContext = createContext(null);

/** Custom hook to access user context. Throws if used outside provider. */
export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserContext.Provider");
  }
  return context;
}

export default UserContext;
