import Colors from '../../../native-base-theme/variables/commonColor';
import { Platform } from 'react-native';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'white', },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: false,
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
    inactiveBackgroundColor: Colors.brandPrimary,
    tabBarStyle: { backgroundColor: Colors.brandPrimary ,height:Platform.OS =='ios'? 49:55},
  
  },

  icons: {
    style: { color: 'white', height: 30, width: 30 },
  },
};
