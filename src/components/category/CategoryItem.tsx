
import React,{useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import {colors} from '../../assets/colors/main'

type Prop = {
	category:any,
	selectCategory:any
}

const CategoryItem = ({category, selectCategory}:Prop) => {
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
    }, [])

	const toggleIsSelected = (category:any) => {
		setIsSelected(!isSelected);
		selectCategory(category);
	}


    
    return(
        <View style={styles.container}>
			<TouchableOpacity
				style={
					[
						styles.categoryButton,
						(isSelected)
						?{ 
							borderWidth:StyleSheet.hairlineWidth,
							borderColor: colors.main,
						}
						:{
							
						}
					]
				}
				onPress={() => toggleIsSelected(category)}	
				activeOpacity={.5}
			>
				<Text style={(isSelected)?styles.activeCategoryName:styles.categoryName}>{category.name}</Text>	
			</TouchableOpacity>
        </View>
    )

    
}

export default CategoryItem;
const styles = StyleSheet.create({
    container:{
		//backgroundColor:'blue',
		paddingVertical:5,
    },
	categoryButton:{
		padding:5,	
		borderRadius:5,
		marginLeft:10,
		minWidth:60,
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'row',
	},
	activeCategoryName:{
		opacity: 1
	},
	categoryName:{
		opacity: .5

	}

})
