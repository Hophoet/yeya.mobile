import React from 'react';
import {Text, Dimensions, TouchableOpacity, StyleSheet,  View} from 'react-native';
import PickerModal from 'react-native-picker-modal-view';
import Icon from 'react-native-vector-icons/Ionicons'


type Props = {
	cities:any[],
	setCity:(item:any) => void,
	city:any,
}

type State = {
	cities:any[],
	selectedItem:any
}

export default class CityPickerModal extends React.Component<Props, State>{
	constructor(props:Props){
		super(props)
		this.state = {
			cities:this.props.cities,
			selectedItem:{}
		}

	}
	// Method to rename location key 'name' to 'Name'
	_renameKey = (obj:any) => {
		let newObject:any = {}
		const keyValues = Object.keys(obj).map(key => {
		if(key == 'name'){

    		return newObject['Name'] = obj[key];
		}
		newObject[key] = obj[key]
  		});
  		return newObject;
	}

	// Method to get all renamed cities key 'name' to 'Name'
	_getRenamedCitiesKeys = () =>  {
		let newCities = [];
		for(let city of this.props.cities){
			newCities.push(this._renameKey(city));
		}
		return newCities;
	}

	// Method to get the cities
	_getCategories = () => {
		let data = this._getRenamedCitiesKeys();
		return data;
	}

	
	onClosed = () =>{ console.log('close key pressed')}

	onSelected =  (item:any) => { 
		this.setState({selectedItem:item}) 
		this.props.setCity(item);
	}
	

	onBackButtonPressed = () => { console.log('back key pressed') }


	render(){
		return (
			<View>
				<PickerModal
					renderSelectView={(disabled, selected, showModal) =>{
						let defaultText = (this.props.city && this.props.city.name)
							?this.props.city.name
							:'Selectionner votre ville';
					     return( 
							<TouchableOpacity 
								style={styles.button}
								disabled={disabled}
								onPress={showModal}
							>
                            	<Icon name='chevron-down' size={25} color='gray' />
								<Text style={[
									styles.name,
									(!selected.Name) 
									&& {opacity:.5}
								]}>{(selected.Name)
									?selected.Name
									:defaultText}
								</Text>
                        	</TouchableOpacity>
						)
						}
					}
					onSelected={this.onSelected.bind(this)}
					onClosed={this.onClosed.bind(this)}
					onBackButtonPressed={this.onBackButtonPressed.bind(this)}
					items={this._getCategories()}
					sortingLanguage={'tr'}
					showToTopButton={true}
					selected={this.state.selectedItem}
					showAlphabeticalIndex={true}
					autoGenerateAlphabeticalIndex={true}
					selectPlaceholderText={'Choose one...'}
					onEndReached={() => console.log('list ended...')}
					searchPlaceholderText={'Search...'}
					requireSelection={false}
					autoSort={false}
				/>
			</View>
			
			)
	}


}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    button:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
		minHeight: width/7,
		// borderColor:'gray',
		// borderWidth:StyleSheet.hairlineWidth,
    },
	name:{
		paddingLeft:20,
		fontSize:17,
	}
})

