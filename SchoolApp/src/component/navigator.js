import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LknList from '../pages/lkn/list';
import LknEdit from '../pages/lkn/edit';
import LknView from '../pages/lkn/detail';
import LknNew from '../pages/lkn/new';
import PenangkapanList from '../pages/penangkapan/list';
import Dashboard from '../pages/dashboard';
import PenangkapanEdit from '../pages/penangkapan/edit';
import PenangkapanNew from '../pages/penangkapan/new';
import ProsesTersangkaView from '../pages/tersangka/prosesTersangka/detail';
import ProsesTersangkaList from '../pages/tersangka/prosesTersangka/list';
import ProsesTersangkaEdit from '../pages/tersangka/prosesTersangka/edit';
import ProsesTersangkaNew from '../pages/tersangka/prosesTersangka/new';
import StatusTersangkaView from '../pages/tersangka/statusTersangka/detail';
import StatusTersangkaList from '../pages/tersangka/statusTersangka/list';
import StatusTersangkaEdit from '../pages/tersangka/statusTersangka/edit';
import StatusTersangkaNew from '../pages/tersangka/statusTersangka/new';
import StatusBBView from '../pages/barangbukti/statusBarangBukti/detail';
import StatusBBList from '../pages/barangbukti/statusBarangBukti/list';
import StatusBBEdit from '../pages/barangbukti/statusBarangBukti/edit';
import StatusBBNew from '../pages/barangbukti/statusBarangBukti/new';
import PenangkapanView from '../pages/penangkapan/detail';
import TersangkaNew from '../pages/tersangka/new';
import BarangBuktiNew from '../pages/barangbukti/new';
import TersangkaList from '../pages/tersangka/list';
import TersangkaView from '../pages/tersangka/detail';
import TersangkaEdit from '../pages/tersangka/edit';
import BarangBuktiList from '../pages/barangbukti/list';
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
  'dashboard': { screen: mapNavigationStateParamsToProps(Dashboard)},
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
  'tersangka.new': { screen: mapNavigationStateParamsToProps(TersangkaNew) },
  'statusTSK.details': { screen: mapNavigationStateParamsToProps(StatusTersangkaView) },
  'statusTSK.list': { screen: mapNavigationStateParamsToProps(StatusTersangkaList) },
  'statusTSK.edit': { screen: mapNavigationStateParamsToProps(StatusTersangkaEdit) },
  'statusTSK.new': { screen: mapNavigationStateParamsToProps(StatusTersangkaNew) },
  'prosesTSK.details': { screen: mapNavigationStateParamsToProps(ProsesTersangkaView) },
  'prosesTSK.list': { screen: mapNavigationStateParamsToProps(ProsesTersangkaList) },
  'prosesTSK.edit': { screen: mapNavigationStateParamsToProps(ProsesTersangkaEdit) },
  'prosesTSK.new': { screen: mapNavigationStateParamsToProps(ProsesTersangkaNew) },
  'barangbukti.list': { screen: mapNavigationStateParamsToProps(BarangBuktiList) },
  'barangbukti.details': { screen: mapNavigationStateParamsToProps(BarangBuktiView) },
  'barangbukti.edit': { screen: mapNavigationStateParamsToProps(BarangBuktiEdit) },
  'barangbukti.new': { screen: mapNavigationStateParamsToProps(BarangBuktiNew) },
  'statusBB.details': { screen: mapNavigationStateParamsToProps(StatusBBView) },
  'statusBB.list': { screen: mapNavigationStateParamsToProps(StatusBBList) },
  'statusBB.edit': { screen: mapNavigationStateParamsToProps(StatusBBEdit) },
  'statusBB.new': { screen: mapNavigationStateParamsToProps(StatusBBNew) },
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
