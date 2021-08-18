import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";


const CButton = ({label, onPress, iconPosition, buttonStyle, icon, textStyle, iconColor}:any) => {
	return(
		<TouchableOpacity 
            onPress={onPress}
            style={[styles.container, buttonStyle]}>
            { icon && iconPosition == 'left' &&
                <Icon name={icon} size={25} color={(iconColor)?iconColor:'white'} />
            }
            <Text style={[styles.buttonLabel, textStyle]}>{label}</Text>
            { icon && iconPosition == 'right' &&
                <Icon name={icon} size={25} color={(iconColor)?iconColor:'white'} />
            }
		</TouchableOpacity>
	)

}
export default CButton;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        backgroundColor:'blue',
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		paddingVertical:10,
		borderRadius:10,
		paddingHorizontal:20,
		elevation:20,
	},
	buttonLabel:{
		fontWeight:'bold',
        color:'white',
		margin:5,
		fontSize:15,
	}

})