import React from 'react'
import {View, Dimensions, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from 'prop-types';
import {colors} from '../../assets/colors/main'


type Props = {
    navigateTo?:Function,
    job:any,
    toggleProposalModal:Function,
    isJobOwner:boolean,
    isUserFavorite:boolean,
    toggleJobFavorite:Function,
    deleteJob:Function,

}

type State = {

}

export default class JobDetailBottomButton extends React.Component<Props, State> {
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
                <View style={styles.row1} >
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={ ()=>{
                            if(this.props.toggleJobFavorite){
                                this.props.toggleJobFavorite()
                            }
                        } }
                    >
                        <Icon size={40} name={this.props.isUserFavorite?'heart':'heart-outline'} color='red'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.row2} >
                    <TouchableOpacity 
                        style={styles.textButton}
                        onPress={ () => {
                            if(this.props.isJobOwner){
                                if(this.props.navigateTo){
                                    this.props.navigateTo('UpdateJobStep1',
                                    {
                                        'job':{
                                            ...this.props.job
                                        }
                                    })
                                }
                            }
                            else{
                                if(this.props.toggleProposalModal){
                                    this.props.toggleProposalModal()
                                }
                            }
                        }
                        }
                    >
                        <Text style={styles.buttonLabel}>
                        { this.props.isJobOwner?'Mettre à jour':' Postuler à la tache'}    
                        </Text>
                    </TouchableOpacity>
                </View>
                { this.props.isJobOwner && 
                <View style={styles.row3} >
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={ ()=>{
                            if(this.props.deleteJob){
                                this.props.deleteJob()
                            }
                        } }
                    >
                        <Icon size={40} name={'trash'} color='red'/>
                    </TouchableOpacity>
                </View>
                }
            </View>
          
        )
    }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:0,
        paddingVertical:10,
        width:width,
        height:80,
        elevation:20,
        backgroundColor:'white',
        flexDirection:'row',
    },
    row1:{
        flex:1,
        paddingHorizontal:20,
    },
    row2:{
        flex:4,
        paddingHorizontal:20,
    },
    row3:{
        flex:1,
        paddingHorizontal:20,
    },
    iconButton:{
        // backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor:colors.main,
        borderRadius:10,
        flex:1,
    },
    textButton:{
        backgroundColor:colors.main,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    buttonLabel:{
        fontWeight:'bold',
        color:'white',
        fontSize:20,
    }
})
