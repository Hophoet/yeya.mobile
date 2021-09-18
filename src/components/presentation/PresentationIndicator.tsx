import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native'
import {colors} from '../../assets/colors/main'


const PresentationIndicator = ({item, index, scrollX, currentIndex}:any) => {
    let indicators = [{id:0}, {id:1}, {id:2}]
	return(
		<View style={styles.container}>
            {
                indicators.map((it, index) => {
                    return (
                        <View 
                            key={index.toString()}
                            style={[styles.indicator, (it.id!=currentIndex)?styles.indicator2:{}]}>
                        </View>
                    )
                })
            }
		</View>
	)

}
export default PresentationIndicator;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
        flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
        paddingVertical:50,
		//backgroundColor:'red',
    },
    indicator:{
        width:10,
        height:10,
        borderRadius:60,
		backgroundColor:colors.main,
        marginHorizontal:5,
    },
    indicator2:{
        opacity:.3,
    }
})
