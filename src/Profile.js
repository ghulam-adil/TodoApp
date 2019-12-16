import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');

const lightGray = '#f6f6f6';
const white = '#fff';
const main = '#4CD964';
const red = '#FF3B30';

class Profile extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialIcon name='person' size={26} color={tintColor} />
        ),
    }

    handlePress = () => {
        AsyncStorage.removeItem('todos').then(value => {
            console.log(value);
        });

        this.props.navigation.navigate('login');
    }

    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hello, {this.props.name}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.handlePress()}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

function mapStateToProps(state){
    return{
        name: state.name
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: main, paddingHorizontal: height * 0.02, paddingTop: height * 0.06, paddingBottom: height * 0.01
    },
    headerText: {
        color: white, fontSize: height * 0.034
    },
    button: {
        alignItems: 'center', justifyContent: 'center', padding: height * 0.018, borderRadius: width * 0.01, 
        marginVertical: height * 0.02, marginHorizontal: height * 0.02, borderColor: red, borderWidth: 1
    },
    buttonText: {
        color: red, fontSize: height * 0.024
    }
})

export default connect(mapStateToProps)(Profile);