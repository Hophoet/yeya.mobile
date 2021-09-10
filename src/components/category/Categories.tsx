import React,{useEffect} from 'react'
import {View, FlatList, StyleSheet} from 'react-native'

import CategoryItem from './CategoryItem';

type Prop = {
	categories:any[],
	selectCategory:any,

}
const Categories = (props:Prop) => {
    useEffect(() => {
    }, [])

    return(
        <View style={styles.container}>
			<FlatList 
				horizontal={true}
                showsHorizontalScrollIndicator={false}
				data={props.categories}
				keyExtractor={(item)=>item.id.toString()}
				renderItem={({index, item}) => 
					(
					<CategoryItem
						category={item}
						selectCategory={props.selectCategory}
					/>
				)}
			/>
        </View>
    )

    
}

export default Categories;

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
		//backgroundColor:'red',
		paddingVertical:2,
	
    },
	categoryButton:{
		padding:5,	
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:'black',
		borderRadius:5,
		marginLeft:10,
		minWidth:60,
		justifyContent:'center',
		alignItems:'center'
	}

})
