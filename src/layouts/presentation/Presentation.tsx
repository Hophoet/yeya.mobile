
import React, {useEffect, useState, useRef} from 'react';
import {Animated, Dimensions, Text, StatusBar, TouchableOpacity, FlatList, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import slides from '../../data/presentation/slides';
import PresentationItem from '../../components/presentation/PresentationItem';
import PresentationIndicator from '../../components/presentation/PresentationIndicator';
import CButton from '../../components/CButton';


type Props = {
	navigation:any
}

const Presentation = ({navigation}:Props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slidesRead:any[] = [];
	const scrollX = useRef(new Animated.Value(0)).current;
	let flatListRef:any;
	const viewableItemsChanged = useRef(({ viewableItems }: any) => {
		setCurrentIndex(viewableItems[0].index);
		console.log(viewableItems[0].index);
		// _setReadSlide(viewableItems[0]);
		
	}).current;
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold:50}).current;

	const _setReadSlide = (slidesRead:any[], item:any)=> {
		if( slidesRead.find(i=>i.index == item.index)  ){
			// alread exists
			//console.log('already add')
		}
		else{
			// not read yet
			slidesRead.push(item)
			//console.log('add')
		}
		//console.log('lenght', slidesRead.length)

	}

	const _handleNavigation = () =>{
		console.log('slide reads', slidesRead);
		if( slidesRead.length >=3){
			// console.log('presentation read can be done')
		}
		else{

			// console.log('presentation read can not be done')
		}
	}

	useEffect(()=>{
		console.log('currentIndex', currentIndex)
		_setReadSlide(slidesRead, currentIndex);
	},[currentIndex, viewableItemsChanged])

	const scrollToNext = () => {
		if (currentIndex < slides.length - 1){
			flatListRef.scrollToIndex({ index:currentIndex+1 })
		}
	}

	const scrollToEnd = () => {
		flatListRef.scrollToEnd()
	}
	const scrollToIndexFailed = (error:any) => {
		console.log('ON FAILED')
		const offset = error.averageItemLength * error.index;
		flatListRef.scrollToOffset({offset});
		//setTimeout(() => this.flatListRef.scrollToIndex({ index: error.index }), 100); // You may choose to skip this line if the above typically works well because your average item height is accurate.
	  }


	//console.log(slides)
	const ITEM_HEIGHT = width;
	return(
		<View style={styles.container}>
			<StatusBar 
				barStyle={'dark-content'}
				backgroundColor={'white'}
			/>
			<View style={styles.row1}>
				<FlatList
					ref={(ref) =>  flatListRef = ref}
					data={slides}
					renderItem={({index, item}) => 
						(<PresentationItem 
						currentIndex={currentIndex} 
						scrollX={scrollX} 
						index={index} 
						item={item}
						/>)}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					getItemLayout={(data, index) => (
							{
								length:ITEM_HEIGHT, 
								offset:ITEM_HEIGHT * index,
								index
							}
						)}
					bounces={false}
					onScroll={Animated.event(
						[{nativeEvent:{contentOffset:{x:scrollX}}}], 
						{useNativeDriver:false})
					}
					onViewableItemsChanged={viewableItemsChanged}
					onScrollToIndexFailed={scrollToIndexFailed} 
					viewabilityConfig={viewConfig}
				/>
			</View>
			<View style={styles.row2}>
				<PresentationIndicator  scrollX={scrollX} currentIndex={currentIndex}/>
			</View>
			<View style={styles.row3}>
				{ (currentIndex < slides.length - 1)
				?(<>
					<View style={styles.row3Row}>
						<TouchableOpacity 
							onPress={()=> {
								navigation.navigate('SignIn')
							}}
							style={styles.skipButton}>
							<Text style={styles.skip}>Passer</Text>

						</TouchableOpacity>

					</View>
					<View style={styles.row3Row}>
						<CButton
							onPress={scrollToNext}
							iconPosition='right'
							icon='arrow-forward' 
							label='Suivant'
						/>
					</View>
				</>
				)
				:(
					<View style={styles.row3Row1}>
						<CButton
							onPress={()=> {
								navigation.navigate('SignIn')
							}}
							iconPosition='right'
							icon='arrow-forward' 
							label='Commencer Votre Experience Maintement'
						/>
					</View>

				)
			}
			</View>
		</View>
	)

}
//maps with the state global
const mapDispatchToProps = (dispatch:any) => {
    return {
        dispatch: (action:any) => {dispatch(action)}
    }
}

const mapStateToProps = (state:any) => {
    return {
        authUserToken:state.authUserToken,
        authUser:state.authUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation)

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white',
		//backgroundColor:'#6C63FF'
	},
	title:{
		top:50,
		alignSelf:'center',
		fontSize:50,
		textAlign:'center',
		fontWeight:'bold',
	},
	row1:{
		// backgroundColor:'red',
		flex:4,
	},
	row2:{
		// backgroundColor:'aqua',
		flex:1,
	},
	row3:{
		flex:1,
		flexDirection:'row'
	},
	row3Row:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	row3Row1:{
		flex:1,
		justifyContent:'center',
		paddingHorizontal:20,
	}
	


})
