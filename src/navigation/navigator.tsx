import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './auth.navigator';
import MainNavigator from './main.navigator'
import Loader from '../layouts/splash/Loader'
import ChatDetail from '../layouts/chat/ChatDetail'
const Stack = createStackNavigator();

export const Nav = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen 
			options={{
				headerShown:false,
			}}
      name='Loader' 
      component={Loader}/>
    <Stack.Screen 
			options={{
				headerShown:false,
			}}
      name='Main' 
      component={MainNavigator}/>
    <Stack.Screen 
			options={{
				headerShown:false,
			}}
      name='Auth' 
      component={AuthNavigator}/>
		<Stack.Screen 
			options={{
			}}
			name='ChatDetail' 
			component={ChatDetail}/>
  </Stack.Navigator>
);

const Navigator = (): React.ReactElement => (
    <NavigationContainer>
        <Nav/>
    </NavigationContainer>
);

export default Navigator;

