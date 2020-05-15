import React from 'react';

export default React.createContext({
    user: null,
    pollInterval: null,
    setUser: () => {}
});