import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  DatePickerAndroid,
  TouchableOpacity,
} from 'react-native';
import Component from './index';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    flex: 0,
    fontSize: '$regularSm',
    fontWeight: 'bold',
  },
  triangle: {
    marginLeft: '0.5rem',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderTopWidth: '0.3125rem',
    borderRightWidth: '0.3125rem',
    borderLeftWidth: '0.3125rem',
    borderBottomWidth: 0,
    borderTopColor: '$blue',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this._openDatePicker = this._openDatePicker.bind(this);
  }

  async _openDatePicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: this.props.date,
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      const date = new Date(year, month, day);
      this.props.onDateChange(date);
    }
  }

  render() {
    const today = moment().clone().startOf('day');
    return (
      <View style={[this.props.containerStyle]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this._openDatePicker}
          style={[styles.touchable]}
        >
          <Component.Text style={[styles.dateText, this.props.style]}>
            {`${moment(this.props.date).format('D MMM YYYY')} ${moment(this.props.date).isSame(
                today, 'd') ? '(Today)' : ''}`}
          </Component.Text>
          {this.props.isTriangleRendered ? <View style={[styles.triangle]} /> : false}
        </TouchableOpacity>
      </View>
    );
  }
}

DatePicker.displayName = 'Date Picker';

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  isTriangleRendered: PropTypes.bool,
  onDateChange: PropTypes.func.isRequired,
  style: Text.propTypes.style,
};

DatePicker.defaultProps = {
  isTriangleRendered: true,
};

export default DatePicker;
