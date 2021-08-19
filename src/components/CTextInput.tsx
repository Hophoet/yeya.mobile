import React from 'react';
import {TextInput, View, StyleSheet, Dimensions} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from '../assets/colors/main'


const CTextInput = ({icon, label, textInputProps, onChangeText, keyboardType, autoFocus, placeholderTextColor, selectionColor, iconColor, textInputStyle, textInputContainerStyle, placeholder}:any) => {
	return(
		<View style={styles.container}>
			<View style={[styles.textInputContainer, textInputContainerStyle]}>
				<TextInput
					{...textInputProps}
					autoFocus={autoFocus}
					placeholderTextColor={(placeholderTextColor)?placeholderTextColor:'gray'}
					selectionColor={(selectionColor)?selectionColor:'white'}
					style={[styles.textInput, textInputStyle]}
					placeholder={placeholder}
					onChangeText={(text)=>{
						if(onChangeText){
							onChangeText(text)
						}
					}}
				/>
			</View>
		</View> 
	)

}
export default CTextInput;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
	},
	textInput:{
		color:'gray',
		fontSize:18,
		// padding:5,
		flex:1,
		//backgroundColor:'#0071',
		padding:15,
	},
	textInputContainer:{
		flexDirection:'row',
		alignItems:'center',
		borderRadius:5,
		borderWidth:2,
		//padding:5,
		borderColor:'#0002',
	}
	

})
