import React, {useState} from 'react';
import { Platform, Text, TouchableOpacity, View} from 'react-native';
import { InputGroup, Icon } from 'native-base';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';

const DatePicker = (props) => {
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    defaultDate =moment(currentDate).format("DD-MM-YYYY");
    if (currentDate) {
      props.onFormChange(props.fieldName, moment(currentDate).format("DD-MM-YYYY"))
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  
  const toDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-")
    return new Date(year, month - 1, day)
  }

  var defaultDate = date;
  if (props.defaultValue) {
    defaultDate = toDate(props.defaultValue);
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 14, fontWeight:'200', color:'grey', marginBottom: 10}}>{props.placeholder}</Text>
      <InputGroup>
        {show && (
          <DateTimePicker
            value={ defaultDate || new Date()}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
        <Icon name='calendar' style={{fontSize:16}}/>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={{padding:5, fontSize:15, color:'gray'}}>{defaultDate ? moment(defaultDate).format("DD-MM-YYYY") : "Atur Tanggal"}</Text>
        </TouchableOpacity>
      </InputGroup>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    padding:15,
  },
});

export default DatePicker;