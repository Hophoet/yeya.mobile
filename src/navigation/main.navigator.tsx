import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../layouts/main/Home'
import {colors} from '../assets/colors/main'

import ListView from '../layouts/main/ListView'
import MapView from '../layouts/main/MapView'
import Favorite from '../layouts/main/Favorite'
import Chat from '../layouts/chat/Chat'
import Proposal from '../layouts/proposal/ProposalsListView'
import ProposalsListView from '../layouts/proposal/ProposalsListView';

import AddJobStep1 from '../layouts/add_job/AddJobStep1';
import AddJobStep2 from '../layouts/add_job/AddJobStep2';
import AddJobStep3 from '../layouts/add_job/AddJobStep3';

const Stack = createStackNavigator();

// add job stack navigator
const AddJobStackNav = (): React.ReactElement =>(
  <Stack.Navigator 
    // headerMode='none'
    >
    <Stack.Screen 
        options={{
            // headerShown:false,
        }}
        name='AddJobStep1' 
        component={AddJobStep1}/>
    <Stack.Screen 
        name='AddJobStep2' 
        component={AddJobStep2}/>
    <Stack.Screen 
        name='AddJobStep3' 
        component={AddJobStep3}/>
  </Stack.Navigator>
)
export const HomeStack = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen 
			options={{
				headerShown:false,
			}}
      name='MapView' 
      component={MapView}/>
    <Stack.Screen 
			options={{
				headerShown:false,
			}}
      name='ListView' 
      component={ListView}/>
  </Stack.Navigator>
);



const Tab = createBottomTabNavigator();

 function App() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header:()=>null,
      }}
    >
      <Tab.Screen
        name="Home" 
        component={HomeStack}
        options = {{
          tabBarIcon: ({color, size, focused}) => {
            let iconName = (focused)?'search':'search-outline';
            let iconSize = (focused)?35:30; 
            let iconColor = (focused)?colors.main:'gray';
            return (<Icon name={iconName} color={iconColor} size={iconSize} />);
          },
          tabBarShowLabel:false
          
        }}
      
      />
      <Tab.Screen
        name="Favorite" 
        component={Favorite}
        options = {{
          tabBarLabel:'Favorite',
          tabBarIcon: ({color, size, focused}) => {
            let iconName = (focused)?'heart':'heart-outline';
            let iconSize = (focused)?35:30; 
            let iconColor = (focused)?colors.main:'gray';
            return (<Icon name={iconName} color={iconColor} size={iconSize} />);
          },
          tabBarShowLabel:false
        }}
      />
		<Tab.Screen 
			name="AddJob" 
			component={AddJobStackNav}
			options = {{
				tabBarIcon: ({color, size, focused}) => {
					let iconName = (focused)?'add-circle':'add-circle-outline';
					let iconSize = (focused)?35:30; 
					let iconColor = (focused)?colors.main:'gray';
					return (<Icon name={iconName} color={iconColor} size={iconSize} />);
				},
        tabBarBadge:'4',
        tabBarShowLabel:false
			}}
		 />
      <Tab.Screen
        name="Chat" 
        component={Chat}
        options = {{
          tabBarLabel:'Favorite',
          tabBarIcon: ({color, size, focused}) => {
            let iconName = (focused)?'chatbox':'chatbox-outline';
            let iconSize = (focused)?35:30; 
            let iconColor = (focused)?colors.main:'gray';
            return (<Icon name={iconName} color={iconColor} size={iconSize} />);
          },
          tabBarShowLabel:false
          
        }}
      
      />
      <Tab.Screen
        name="Proposal" 
        component={ProposalsListView}
        options = {{
          tabBarLabel:'Proposal',
          tabBarIcon: ({color, size, focused}) => {
            let iconName = (focused)?'people':'people-outline';
            let iconSize = (focused)?35:30; 
            let iconColor = (focused)?colors.main:'gray';
            return (<Icon name={iconName} color={iconColor} size={iconSize} />);
          },
          tabBarShowLabel:false
          
        }}
      
      />
		<Tab.Screen
			name="Profile" 
			component={Home}
			
			options = {{
				tabBarLabel:'Profile',
				tabBarIcon: ({color, size, focused}) => {
					let iconName = (focused)?'person':'person-outline';
					let iconSize = (focused)?35:30; 
					let iconColor = (focused)?'black':'gray';
					return (<Icon name={iconName} color={iconColor} size={iconSize} />);
				},
        tabBarShowLabel:false

			}}
		 />
      </Tab.Navigator>
  );
}


export default App;
