import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

var moment = require('moment');

const { height, width } = Dimensions.get('window');

const lightGray = '#f6f6f6';
const white = '#fff';
const main = '#4CD964';


class Add extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialIcon name='add' size={26} color={tintColor} />
        ),
    }

    state = {
        todo: '',
        date: '',
        tag: '',
        mode: 'date',
        show: false,
        tags: [
            { color: 'blue', rgba: 'rgba(0,0,255,0.6)', isSelected: false },
            { color: 'red', rgba: 'rgba(255,0,0,0.6)', isSelected: false },
            { color: 'black', rgba: 'rgba(0,0,0,0.6)', isSelected: false },
            { color: 'purple', rgba: 'rgba(128,0,128,0.6)', isSelected: false },
            { color: 'yellow', rgba: 'rgba(255,255,0,0.6)', isSelected: false }
        ],
        lastSelected: null,
        todos: []
    }

    componentDidMount() {

        AsyncStorage.getItem('todos').then(value => {

            if(value !== null)
            {
                this.setState({ todos: JSON.parse(value) });
            }

        })

    }

    setDate = (event, date) => {
    
        date = date || this.state.date;
        this.setState({ date, show: false });

    }
    
    datepicker = () => {
        this.setState({ mode: 'date', show: true });
    }

    handlePress = () => {

        const { todo, date, tag } = this.state;

        if(todo == '' || date == '')
        {
            ToastAndroid.showWithGravity(
                'Please fill all the fields',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
        else if(tag == '')
        {
            ToastAndroid.showWithGravity(
                'Please select tag',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
        else
        {

            const { todo, date, tag } = this.state;

            const newArray = [...this.state.todos];

            newArray.push({
                todo,
                date,
                tag,
                isComplete: false
            })

            this.setState({ todos: newArray, todo: '', date: '', tag: '' });

            this.props.setTodo(newArray);

            AsyncStorage.setItem('todos', JSON.stringify(newArray));

            ToastAndroid.showWithGravity(
                'New Todo added successfully',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )

        }
        
    }

    handleTag = (index) => {
        const newArray = [...this.state.tags];
        if(this.state.lastSelected !== null)
        {
            newArray[this.state.lastSelected].isSelected = false;    
        }
        newArray[index].isSelected = true;
        
        this.setState({ tags: newArray, lastSelected: index, tag: newArray[index].color });
    }

    handleStyle(index, color, rgba)
    {
        if(this.state.tags[index].isSelected)
        {
            return {
                height: height * 0.07, width: height * 0.07, borderRadius: height * 0.035, marginHorizontal: height * 0.015,
                backgroundColor: color
            }
        }
        else
        {
            return {
                height: height * 0.07, width: height * 0.07, borderRadius: height * 0.035, marginHorizontal: height * 0.015,
                backgroundColor: rgba,
            }
        }
    }

    render() {

        const { date, mode, show } = this.state;

        return(
            <View style={{ flex: 1 }}>
                
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add</Text>
                </View>

                <View style={styles.textAreaContainer}>

                    <TextInput 
                        style={styles.textArea}
                        // multiline={true}
                        // numberOfLines={2}
                        placeholder='What do you need to do?'
                        onChangeText={(todo) => this.setState({ todo })}
                        value={this.state.todo}
                    />

                </View>

                <TouchableOpacity 
                    style={styles.dateTimeContainer}
                    onPress={() => this.datepicker()}
                >
                    
                    <Text style={styles.dateTimeText}>
                        {this.state.date ? moment(this.state.date).format('LL') : 'When is it due?' }
                    </Text>

                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', margin: height * 0.02, alignSelf: 'center' }}>

                    {
                        this.state.tags.map((value, index) => 

                            <TouchableOpacity 
                                key={index} 
                                style={this.handleStyle(index, value.color, value.rgba)}
                                onPress={() => this.handleTag(index)}
                            >
                                
                            </TouchableOpacity>
                            
                        )
                    }

                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.handlePress()}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>

                { show && <DateTimePicker 
                    value={date ? date : new Date()}
                    mode={mode}
                    is24Hour={true}
                    onChange={this.setDate} />
                }
                
            </View>
        )
    }
}

function mapStateToProps(state){
    return{
        todos: state.todos
    }
}

function mapDispatchToProps(dispatch){
    return{
        setTodo: (value) => dispatch({ type: 'SET_TODO', value })
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: main, paddingHorizontal: height * 0.02, paddingTop: height * 0.06, paddingBottom: height * 0.01
    },
    headerText: {
        color: white, fontSize: height * 0.034
    },
    textAreaContainer: {
        margin: height * 0.02, borderWidth: 1, borderColor: '#F3F3F3', padding: height * 0.015
    },
    textArea: {
        height: height * 0.12, textAlignVertical: 'top'
    },
    dateTimeContainer: {
        margin: height * 0.02, borderWidth: 1, borderColor: '#F3F3F3', padding: height * 0.015
    },
    dateTimeText: {
        color: 'gray'
    },
    tag: {
        height: height * 0.07, width: height * 0.07, borderRadius: height * 0.035, marginHorizontal: height * 0.015,
        opacity: 0.4, backgroundColor: 'red'
    },
    tag1: {
        height: height * 0.07, width: height * 0.07, borderRadius: height * 0.035, marginHorizontal: height * 0.015,
        backgroundColor: 'red'
    },
    button: {
        backgroundColor: main, alignItems: 'center', justifyContent: 'center', padding: height * 0.018,
        borderRadius: width * 0.01, marginVertical: height * 0.02, marginHorizontal: height * 0.02
    },
    buttonText: {
        color: white, fontSize: height * 0.024
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);