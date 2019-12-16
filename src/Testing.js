import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Testing extends Component {
  state = {
    date: new Date(),
    mode: 'date',
    show: false,
  }

  setDate = (event, date) => {
    
    date = date || this.state.date;
    
    console.log(event);
    console.log(date);

    this.setState({ date, show: false });

  }

  datepicker = () => {
    this.setState({ mode: 'date', show: true });
  }

  timepicker = () => {
    this.show('time');
  }

  render() {
    const { show, date, mode } = this.state;

    return (
      <View>
        <View>
          <Button onPress={this.datepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={this.timepicker} title="Show time picker!" />
        </View>
        { show && <DateTimePicker 
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={this.setDate} />
        }
      </View>
    );
  }
}