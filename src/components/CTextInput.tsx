import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";


const CTextInput = ({focus, onSubmitEditing, password, label, textInputProps, onChangeText, keyboardType, autoFocus, placeholderTextColor, selectionColor, iconColor, textInputStyle, textInputContainerStyle, placeholder}:any) => {
	const [textInputContainerFocusStyle, setTextInputContainerFocusStyle] = useState({})
	const [passwordVisible, setPasswordVisibility ] = useState(false)


	const togglePasswordVisibility  = () => setPasswordVisibility(!passwordVisible)

	return(
		<View style={styles.container}>
			<View style={[styles.textInputContainer, textInputContainerStyle, textInputContainerFocusStyle]}>
				<TextInput
					{...textInputProps}
					onFocus={()=>{
						setTextInputContainerFocusStyle({borderColor:'#5892FF', borderWidth:2})
					}}
					onBlur={() => {
						setTextInputContainerFocusStyle({})
					}}
					autoFocus={autoFocus}
					focus={focus}
					onSubmitEditing={onSubmitEditing}
					placeholderTextColor={(placeholderTextColor)?placeholderTextColor:'gray'}
					selectionColor={(selectionColor)?selectionColor:'black'}
					style={[styles.textInput, textInputStyle]}
					placeholder={placeholder}
					secureTextEntry={ password && !passwordVisible}
					onChangeText={(text)=>{
						if(onChangeText){
							onChangeText(text)
						}
					}}
				/>
				{ password &&
				<TouchableOpacity 
					onPress={togglePasswordVisibility}
					style={styles.iconContainer}>
					<Icon name={passwordVisible?'eye-off':'eye'} color='gray' size={20}/>
				</TouchableOpacity>
				}
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
		flex:6,
		padding:15,
	},
	textInputContainer:{
		flexDirection:'row',
		alignItems:'center',
		borderRadius:5,
		backgroundColor:'#EFF1F2',

		// borderWidth:2,
		//padding:5,
		borderColor:'#0002',
	},
	iconContainer:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	}
	

})
