import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, Alert } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';

var moment = require('moment');

const { height, width } = Dimensions.get('window');

const white = '#fff';
const main = '#4CD964';
const red = '#FF3B30';
const lightGray = '#f6f6f6';


class FlatListItem extends Component {

    state = {
        activeRowKey: null
    }

    render() {

        const swipeSettings = {
            autoClose: true,
            backgroundColor: 'none',
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey !== null)
                {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.index });
            },
            left: [
                {
                    onPress: () => {
                        // alert('sdfjksf');
                        this.props.parentFlatList.handleComplete(this.props.index);
                    },
                    backgroundColor: 'none',
                    component:
                    <View style={[styles.deleteButtonContainer, { backgroundColor: white }]}> 
                        <View style={[styles.deleteButton, { backgroundColor: main }]}>
                            <MaterialIcon name='check' size={26} color={white} />
                        </View>
                    </View>
                }
            ],
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => {
                                    
                                    this.props.parentFlatList.deleteRow(this.props.index);

                                    this.props.parentFlatList.refreshFLatList(deletingRow);
                                }},
                            ],
                            { cancelable: true },
                        );
                    },
                    type: 'delete',
                    backgroundColor: 'none',
                    component:
                    <View style={styles.deleteButtonContainer}> 
                        <View style={styles.deleteButton}>
                            <MaterialIcon name='delete' size={26} color={white} />
                        </View>
                    </View>
                }
            ],
            rowId: this.props.index,
            sectionId: 1

        }

        return(

            <Swipeout {...swipeSettings}>

                <View style={styles.item}>

                    <View style={[styles.tag, { backgroundColor: this.props.item.tag }]}>

                    </View>

                    <View style={{ margin: height * 0.02, marginVertical: height * 0.01 }}>
                        <Text style={[ styles.todoText, 
                                        this.props.item.isComplete ? { color: 'rgba(128,128,128,0.8)', textDecorationLine: 'line-through' } : null ]} >
                            {this.props.item.todo}
                        </Text>
                        <Text style={this.props.item.isComplete ? { color: 'rgba(128,128,128,0.8)' } : null}>
                            Due {moment(this.props.item.date).calendar()}
                        </Text>
                    </View>

                </View>

            </Swipeout>

        )

    }

}


class Feed extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialIcon name='assignment' size={26} color={tintColor} />
        ),
    }

    state = {
        todos: [],
        deletedRowKey: null,
    }

    componentDidMount() {
        AsyncStorage.getItem('todos').then(value => {
            console.log(JSON.parse(value));
            this.setState({ todos: JSON.parse(value) });
        })
    }

    refreshFLatList = (deletedKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: deletedKey
            };
        });
    }

    deleteRow = (index) => {
        this.state.todos.splice(index, 1);
        AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    handleComplete = (index) => {
        const newArray = [...this.state.todos];
        newArray[index].isComplete = true;
        this.setState({ todos: newArray });
        AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));

        // AsyncStorage.getItem('todos').then(value => {
        //     console.log(JSON.parse(value));
        //     this.setState({ todos: JSON.parse(value) });
        // })

    }

    render() {

        return(
            <View style={{ flex: 1 }}>
                
                <View style={styles.header}>
                    <Text style={styles.headerText}>Todo</Text>
                </View>

                <FlatList 
                    data={this.state.todos}
                    renderItem={({ item, index }) => 
                        <FlatListItem 
                            item={item} 
                            index={index} 
                            // data={this.state.todos} 
                            parentFlatList={this} 
                        />
                    }
                    keyExtractor={( item, index ) => index.toString()}
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: main, paddingHorizontal: height * 0.02, paddingTop: height * 0.06, paddingBottom: height * 0.01
    },
    headerText: {
        color: white, fontSize: height * 0.034
    },
    tag: {
        backgroundColor: 'blue', height: height * 0.02, width: height * 0.02, borderRadius: height * 0.01
    },
    item: {
        marginHorizontal: height * 0.02, flexDirection: 'row', alignItems: 'center', 
    },
    todoText: {
        fontSize: height * 0.026, marginVertical: height * 0.005
    },
    deleteButton: {
        height: height * 0.05, width: height * 0.05, borderRadius: height * 0.025, backgroundColor: red, 
        alignItems: 'center', justifyContent: 'center', elevation: 6
    },
    deleteButtonContainer: {
        alignItems: 'center', justifyContent: 'center', flex: 1, borderWidth: 1, borderColor: 'rgba(128,128,128,0.6)'
    }
});

export default Feed;