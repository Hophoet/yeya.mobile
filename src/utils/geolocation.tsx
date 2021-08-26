import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

const getGeolocation = () => {
	return new Promise( (resolve, reject) => {
		if(Platform.OS === 'android' && Platform.Version >= 23){
			// check the location access permission
    		PermissionsAndroid.check(
      			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    		)
			.then((response:any)=>{
				// location not granted 
				if(!response){
					console.log('permission granted', response);
					PermissionsAndroid.request(
        				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      				)
					.then((status) => {
      					let granted = status === PermissionsAndroid.RESULTS.GRANTED;
						if(granted){
							// make the geolocation request
							Geolocation.getCurrentPosition(
								(position) => {
									resolve(position);
								},
								(error) => {
									reject(error);
								},
								{ 
									enableHighAccuracy: true, 
									timeout: 15000, 
									maximumAge: 10000 
								}
							);
						}

					})
					.catch((error:any) => {

					})

				}
				else{
					//console.log('permission always granded', response);
					Geolocation.getCurrentPosition(
						(position) => {
							resolve(position);
						},
						(error) => {
							reject(error);
						},
						{ 
							enableHighAccuracy: true, 
							timeout: 15000, 
							maximumAge: 10000 
						}
					);

				}
				//console.log('premission check response',response)
			})
			.catch((error:any)=>{
				reject(error);
				console.log('premission check error',error)
			})
		}
		/*
        Geolocation.getCurrentPosition(
            (position) => {
				resolve(position);
            },
            (error) => {
				reject(error);
            },
            { 
				enableHighAccuracy: true, 
				timeout: 15000, 
				maximumAge: 10000 
			}
        );
		*/
	})
}

export  {
	getGeolocation
}
