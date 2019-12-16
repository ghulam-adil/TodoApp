import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, ToastAndroid } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');

const lightGray = '#f6f6f6';
const white = '#fff';
const main = '#4CD964';

class Login extends Component {

    state = {
        name: ''
    }

    handlePress = () => {

        if(this.state.name == '')
        {
            ToastAndroid.showWithGravity(
                'Please enter your name',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
        else
        {   
            this.props.setName(this.state.name);
            AsyncStorage.setItem('name', this.state.name);
            this.setState({ name: '' });
            this.props.navigation.navigate('tab');
        }
    }

    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'space-between' }}>

                <View/>

                <View style={styles.logoContainer}>
                    <Image source={require('./assets/logo.png')} />
                    <Text style={styles.title}>Todo</Text>
                </View>

                <View style={styles.bottomContainer}>

                    <View style={styles.textInputContainer}>
                        <TextInput 
                            placeholder='Name'
                            onChangeText={(name) => this.setState({ name })}
                        />
                    </View>

                    <TouchableOpacity style={styles.button}
                        onPress={() => this.handlePress() }
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}

function mapStateToProps(state){
    return{
        name: state.name
    }
}

function mapDispatchToProps(dispatch){
    return{
        setName: (name) => dispatch({ type: 'SET_NAME', value: name })
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center', justifyContent: 'center'
    },
    title: {
        fontSize: height * 0.03,
    },
    textInputContainer: {
        borderWidth: 1, borderColor: 'gray', padding: 5
    },
    bottomContainer: {
        marginHorizontal: height * 0.02
    },
    button: {
        backgroundColor: main, alignItems: 'center', justifyContent: 'center', padding: height * 0.018,
        borderRadius: width * 0.01, marginVertical: height * 0.02
    },
    buttonText: {
        color: white, fontSize: height * 0.024
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);