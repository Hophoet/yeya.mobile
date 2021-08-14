import React from 'react';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import {NavigationContainer} from '@react-navigation/native';
import Store from './src/redux/store/storeConfigurations'
import Navigator from './src/navigation/navigator'

export default class App extends React.Component{
	
	render(){
		let persistor = persistStore(Store)
		return (
			<Provider store={Store}>
				<PersistGate persistor={persistor}>
					<Navigator/>
				</PersistGate>
			</Provider>
			
		)
	}
}


