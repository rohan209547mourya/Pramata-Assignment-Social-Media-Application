import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import Cookies from 'js-cookie';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [appSessionToken, setAppSessionToken] = useState(null);

  useEffect(() => {
    const tempVar = Cookies.get('app_session_token');
    if (tempVar) setAppSessionToken(tempVar);
  }, []);

  const contextValue = useMemo(
    () => ({

      appSessionToken,
      setAppSessionToken,

    }),
    [appSessionToken],
  );

  return (

    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
