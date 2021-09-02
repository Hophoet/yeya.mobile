import React,{useState, useEffect} from 'react'
import {View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import  {launchImageLibrary} from 'react-native-image-picker'


type Prop = {
    image:any,
    onImagePicked:Function
}

const UserProfileImagePicker = ({image, onImagePicked}:Prop) => {
    const [selectedUserProfileImage, setSelectedUserProfileImage]:any = useState()

    useEffect(() => {
        if(image){
            setSelectedUserProfileImage({uri:image})
        }
    }, [image])

    const pickImageHandler = () => {
        // ImagePicker.showImagePicker
        launchImageLibrary({title:'Pick an image', maxWidth:800, maxHeigh:600},
            (response:any) => {
                if(response.error){
                    console.log('error: '+response.error.toString())
                }else{
					if(response.uri){
						onImagePicked(response.uri);
					}
                }
            }
        )
    }

    const showUserProfileImage = () => {
        //if the user picke a new image for the product
        if(selectedUserProfileImage && selectedUserProfileImage.uri){
            return (
                <Image style={styles.selectedImage} resizeMode='cover' source={selectedUserProfileImage}  />
            )
        }
        else{
         
            return (
                <Icon size={30} name='person' color='white'/>
            )
        }
    }
    

    return(
        <View style={styles.container}>
			<TouchableOpacity 
				activeOpacity={.5}
				onPress={pickImageHandler}
			>
				<View style={styles.imageContainer}>
            		{showUserProfileImage()}
				</View>
			</TouchableOpacity>
        </View>
    )

    
}

export default UserProfileImagePicker;

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    selectedImage:{
		width:width/4.5,
		height:width/4.5,
		borderRadius:100,
		backgroundColor:'#000D',
    },
	imageContainer:{
		width:width/4.5,
		height:width/4.5,
		// backgroundColor:'#000D',
		borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
	}

})
