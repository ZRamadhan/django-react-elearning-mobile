import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ViewPropTypes,
  Keyboard,
  Platform,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  lightBox: {
    backgroundColor: '$white',
    width: '90%',
    padding: '1rem',
    borderRadius: '1rem',
  },
});

class LightBox extends React.Component {
  state = {
    keyboardHeight: 0,
  };

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    this.setState({ keyboardHeight: event.endCoordinates.height });
  }

  keyboardWillHide = () => {
    this.setState({ keyboardHeight: 0 });
  }

  render() {
    const lightBoxStyles = [styles.lightBox];
    if (this.state.keyboardHeight > 0 && Platform.OS === 'ios') {
      lightBoxStyles.push({ top: 0 - (this.state.keyboardHeight / 2) });
    }
    lightBoxStyles.push(this.props.style);

    return (
      <View style={lightBoxStyles}>
        {this.props.children}
      </View>
    );
  }
}

LightBox.displayName = 'Modal Light Box';

LightBox.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

export default LightBox;
