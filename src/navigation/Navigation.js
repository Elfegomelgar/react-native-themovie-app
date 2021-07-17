import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const Navigation = () => (
  <Drawer.Navigator
    initialRouteName="app"
    drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="app" component={StackNavigation} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({});

export default Navigation;
