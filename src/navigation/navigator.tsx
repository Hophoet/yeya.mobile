import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './auth.navigator';
import MainNavigator from './main.navigator'
import Loader from '../layouts/splash/Loader'
import ChatDetail from '../layouts/chat/ChatDetail'
import JobDetail from '../layouts/job/JobDetail';
import UpdateJobStep1 from '../layouts/update_job/UpdateJobStep1'
import UpdateJobStep2 from '../layouts/update_job/UpdateJobStep2'
import UpdateJobStep3 from '../layouts/update_job/UpdateJobStep3'

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
		<Stack.Screen 
			options={{
			}}
			name='JobDetail' 
			component={JobDetail}/>
		<Stack.Screen 
			options={{
			}}
			name='UpdateJobStep1' 
			component={UpdateJobStep1}/>
		<Stack.Screen 
			options={{
			}}
			name='UpdateJobStep2' 
			component={UpdateJobStep2}/>
		<Stack.Screen 
			options={{
			}}
			name='UpdateJobStep3' 
			component={UpdateJobStep3}/>
  </Stack.Navigator>
);

const Navigator = (): React.ReactElement => (
    <NavigationContainer>
        <Nav/>
    </NavigationContainer>
);

export default Navigator;

