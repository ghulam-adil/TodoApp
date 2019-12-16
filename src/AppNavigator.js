import { Dimensions } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';
import Feed from './Feed';
import Add from './Add';
import Profile from './Profile';

import Testing from './Testing';

const { height, width } = Dimensions.get('window');
const main = '#4CD964';

const tabNavigator = createBottomTabNavigator(
    {
        Feed: Feed,
        Add: Add,
        Profile: Profile
    },
    {
        tabBarOptions: {
            labelStyle: {
                fontSize: width * 0.04,
                textAlign: "center"
            },
            activeTintColor: main,
            showLabel: false,
            style: {
                paddingHorizontal: width * 0.2
            }
        }
    }
);

const stack = createStackNavigator(
    {
        // testing: { screen: Testing },
        login: { screen: Login },
        tab: { screen: tabNavigator }
    },
    {
        headerMode: 'none'
    }
)

export default createAppContainer(stack);