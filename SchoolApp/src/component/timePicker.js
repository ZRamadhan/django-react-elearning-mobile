import React, {useState} from 'react';
import { Platform, Text, TouchableOpacity, View} from 'react-native';
import { InputGroup, Icon } from 'native-base';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';

const DatePicker = (props) => {
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimePicker = () => {
    showMode('time');
  };


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 14, fontWeight:'200', color:'grey', marginBottom: 10}}>{props.placeholder}</Text>
      <InputGroup>
        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
        <Icon name='clock' />
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={{paddingLeft:5, fontSize:16, color:'gray', fontSize: 14}}>{date ? moment(date).format("HH:mm:ss") : props.placeholder}</Text>
        </TouchableOpacity>
      </InputGroup>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    height: 60,
  },
});

export default DatePicker;