import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LknList from '../pages/lkn/list';
import LknEdit from '../pages/lkn/edit';
import LknView from '../pages/lkn/details';
import LknNew from '../pages/lkn/new';
import PenangkapanList from '../pages/penangkapan/list';
import PenangkapanEdit from '../pages/penangkapan/edit';
import PenangkapanNew from '../pages/penangkapan/new';
import PenangkapanView from '../pages/penangkapan/details';
import TersangkaList from '../pages/tersangka/edit';
import TersangkaView from '../pages/tersangka/detail';
import TersangkaEdit from '../pages/tersangka/edit';
import BarangBuktiList from '../pages/barangbukti/edit';
import BarangBuktiView from '../pages/barangbukti/detail';
import BarangBuktiEdit from '../pages/barangbukti/edit';
import Login from '../pages/login';

const mapNavigationStateParamsToProps = Component => class extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const replaceAndPopIndex = (routeName, index, params) => {
      navigation.dispatch({
        index,
        type: 'replaceAndPopIndex',
        routeName,
        params,
      });
    };
    navigation.replaceAndPopIndex = replaceAndPopIndex;
    const { state: { params } } = navigation;
    return <Component {...this.props} {...navigation} {...params} />;
  }
};

const navigationOptions = ({ navigation }) => ({
  drawerLockMode: navigation.state.index > 0 ? 'locked-closed' : 'unlocked',
});

const LKNNavigator = createStackNavigator({
  'lkn.list': { screen: mapNavigationStateParamsToProps(LknList) },
  'lkn.details': { screen: mapNavigationStateParamsToProps(LknView) },
  'lkn.edit': { screen: mapNavigationStateParamsToProps(LknEdit) },
  'lkn.new': { screen: mapNavigationStateParamsToProps(LknNew) },
  'penangkapan.details': { screen: mapNavigationStateParamsToProps(PenangkapanView) },
  'penangkapan.list': { screen: mapNavigationStateParamsToProps(PenangkapanList) },
  'penangkapan.edit': { screen: mapNavigationStateParamsToProps(PenangkapanEdit) },
  'penangkapan.new': { screen: mapNavigationStateParamsToProps(PenangkapanNew) },
  'tersangka.details': { screen: mapNavigationStateParamsToProps(TersangkaView) },
  'tersangka.list': { screen: mapNavigationStateParamsToProps(TersangkaList) },
  'tersangka.edit': { screen: mapNavigationStateParamsToProps(TersangkaEdit) },
  'barangbukti.list': { screen: mapNavigationStateParamsToProps(BarangBuktiList) },
  'barangbukti.details': { screen: mapNavigationStateParamsToProps(BarangBuktiView) },
  'barangbukti.edit': { screen: mapNavigationStateParamsToProps(BarangBuktiEdit) },
}, {
  headerMode: 'none',
});

LKNNavigator.navigationOptions = navigationOptions;

const navigatorName = LKNNavigator;
const prevGetStateForActionNewJobStack = navigatorName.router.getStateForAction;
navigatorName.router.getStateForAction = (action, state) => {
  if (state && action.type === 'replaceAndPopIndex') {
    const routeList = state.routes.slice(0, action.index);
    routeList.push(action);
    return {
      ...state,
      routes: routeList,
      index: routeList.length - 1,
    };
  }
  return prevGetStateForActionNewJobStack(action, state);
};


const AppContainer = createAppContainer(createSwitchNavigator(
  {
    login: Login,
    App: LKNNavigator,
  },
  {
    initialRouteName: 'login',
  },
));

export default AppContainer;
