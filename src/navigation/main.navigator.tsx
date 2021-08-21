import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../layouts/main/Home'
import ListView from '../layouts/main/ListView'
import MapView from '../layouts/main/MapView'
import Favorite from '../layouts/main/Favorite'

const Stack = createStackNavigator();
export const HomeStack = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen 
			options={{
				headerShown:false,
			}}
      name='ListView' 
      component={ListView}/>
    <Stack.Screen 
			options={{
				headerShown:false,
			}}
      name='MapView' 
      component={MapView}/>
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
            let iconColor = (focused)?'black':'gray';
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
            let iconColor = (focused)?'black':'gray';
            return (<Icon name={iconName} color={iconColor} size={iconSize} />);
          },
          tabBarShowLabel:false
        }}
      />
		<Tab.Screen 
			name="Add" 
			component={Home}
			options = {{
				tabBarIcon: ({color, size, focused}) => {
					let iconName = (focused)?'add-circle':'add-circle-outline';
					let iconSize = (focused)?35:30; 
					let iconColor = (focused)?'black':'gray';
					return (<Icon name={iconName} color={iconColor} size={iconSize} />);
				},
        tabBarBadge:'4',
        tabBarShowLabel:false
			}}
		 />
      <Tab.Screen
        name="Chat" 
        component={Home}
        options = {{
          tabBarLabel:'Favorite',
          tabBarIcon: ({color, size, focused}) => {
            let iconName = (focused)?'chatbox':'chatbox-outline';
            let iconSize = (focused)?35:30; 
            let iconColor = (focused)?'black':'gray';
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
