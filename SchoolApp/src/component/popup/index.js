import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LightBox from './lightBox';

const styles = EStyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '$body',
    opacity: 0.5,
  },
  modalBackgroundReverse: {
    backgroundColor: '$white',
    opacity: 0,
  },
});

class Popup extends React.Component {
  render() {
    const modalBackgroundStyle = [styles.modalBackground];
    if (this.props.isBackgroundReverse) {
      modalBackgroundStyle.push(styles.modalBackgroundReverse);
    }

    return (
      <Modal
        animationType="fade"
        onDismiss={this.props.onDismiss}
        onRequestClose={this.props.onRequestClose}
        transparent
        visible={this.props.visible}
      >
        <View style={[styles.modalContainer]}>
          <TouchableWithoutFeedback>
            <View style={[modalBackgroundStyle]} />
          </TouchableWithoutFeedback>
          {this.props.children}
        </View>
      </Modal>
    );
  }
}

Popup.displayName = 'Popup';

Popup.propTypes = {
  children: PropTypes.node,
  isBackgroundReverse: PropTypes.bool,
  onDismiss: PropTypes.func,
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool,
};

Popup.defaultProps = {
  children: null,
  isBackgroundReverse: false,
  onDismiss: null,
  onRequestClose: null,
  visible: true,
};

Popup.LightBox = LightBox;

export default Popup;
