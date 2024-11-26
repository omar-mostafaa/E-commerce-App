import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import stackNavigation from './stackNavigation';
import SideMenu from '../componets/SideMenu';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={() => <SideMenu />}>
      <Drawer.Screen
        name="StackScreens"
        component={stackNavigation}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
