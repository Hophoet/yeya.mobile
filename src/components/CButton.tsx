import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, ActivityIndicator, Dimensions} from 'react-native'
import {colors} from '../assets/colors/main'
import Icon from "react-native-vector-icons/Ionicons";


const CButton = ({label, onPress, iconPosition, buttonStyle, loading, icon, textStyle, iconColor}:any) => {
	return(
		<TouchableOpacity 
            onPress={onPress}
            style={[styles.container, buttonStyle]}>
            { loading && 
				<View>
					<ActivityIndicator color='white'/>
				</View>
			}
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
        backgroundColor:colors.main,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		paddingVertical:10,
		borderRadius:5,
		paddingHorizontal:20,
		elevation:10,
	},
	buttonLabel:{
		fontWeight:'bold',
        color:'white',
		margin:5,
		fontSize:15,
	}

})