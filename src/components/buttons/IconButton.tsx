import React from 'react'
import {View, Dimensions, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from 'prop-types';
import {colors} from '../../assets/colors/main'


type Props = {
    navigateTo?:Function,
    onPress?:Function,
    icon:any,
}

type State = {

}

export default class IconButton extends React.Component<Props, State> {
  static propTypes = {
    // array of strings, will be list items of Menu
    addProductAction:  PropTypes.func
  }
    animation:any;
    open?:number | boolean;
    constructor(props:Props) {
        super(props)
        this.animation = new Animated.Value(0)
    }

    
    render(){
        
        return (
            <View style={[styles.container]}>
                <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => {
                        if(this.props.onPress){
                            this.props.onPress()
                        }
                    } }
                >
                    <Icon size={25} name={this.props.icon?this.props.icon:'person'} color={'white'}/>
                </TouchableOpacity>
            </View>
          
        )
    }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
    },
    iconButton:{
        justifyContent:'center',
        borderRadius:5,
        backgroundColor:colors.main,
        alignItems:'center',
        padding:10,
    }
})
