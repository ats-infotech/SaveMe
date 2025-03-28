import React, {useEffect, useState} from 'react';
import DrawerStack from './drawer';
import LoginStackScreen from './login';
import { useAppSelector } from "../redux-store/hooks";

export const MainNavigator = () => {
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <>
      {isUserLoggedIn ? <DrawerStack />
       : <LoginStackScreen />}
    </>
  );
};
