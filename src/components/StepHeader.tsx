import React,{useEffect} from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {colors} from '../assets/colors/main'

const StepHeader = (
		{
			step,
			size,
			firstActionIcon,
			secondAction,
			secondActionLabel,
			title,
			description,
			iconLabel,
		}:any) => {

    useEffect(() => {
    }, [])

    return(
        <View style={styles.container}>
			<View style={styles.row1}>
				<Text style={styles.title}>{title}</Text>
			</View>
			<View style={styles.row2}>
			{ Array(size)
				.fill()
				.map((_, i) => {
					let index = i + 1;
					if(index < size){
						return (
						<View key={i} style={styles.columnContainer}>
							<View style={[styles.column, (step>=(i+1)) && styles.activeColumn]}>
								<View style={[styles.circle, (step>=(i+1)) && styles.activeCircle]} >
									<Text style={styles.number}>{i+1}</Text>
								</View>
							</View>
							<View style={[styles.line,(step>=(index+1)) && styles.activeLine]}/>
						</View>
						)
					}
					else if(index == size){
						return (
						<View key={i} style={[styles.column, (step>=(i+1)) && styles.activeColumn]}>
							<View style={[styles.circle, (step>=(i+1)) && styles.activeCircle]} >
								<Icon size={25} name='checkmark' color={colors.main} />
							</View>
						</View>
						)

					}
					})}
			</View>
        </View>
    );

    
}

export default StepHeader;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
		paddingHorizontal:20,
		backgroundColor: 'white',
    },
	row1:{

	},
	row2:{
        alignItems:'center',
		flexDirection:'row',
		backgroundColor: 'white',
		//backgroundColor:'red',
		height:width/7,

	},
	columnContainer:{
		//flexDirection:'row',
		//backgroundColor:'red',
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'row',
		// width:'100%',
	},
	column:{
		flexDirection:'row',
		justifyContent:'space-between',
		//backgroundColor:'blue',
	},
	circle:{
		borderWidth:4,
		borderColor:colors.main,
		borderRadius:10,
		height:width/8,
		width:width/8,
		opacity:.2,
		justifyContent:'center',
		alignItems:'center',
	},
	activeCircle:{
		opacity:1,
	},
	line:{
		flex:1,
		height:2,
		opacity:.2,
		backgroundColor:colors.main,
	},
	activeLine:{
		opacity:1,
	},
	number:{
		fontSize:25,
		fontWeight:'bold',
		color:colors.main,
	},
	title:{
		fontSize:20,
		color:'white',
		fontWeight:'bold',
	}

})
