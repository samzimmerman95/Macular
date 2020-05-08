import React from "react";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createAppContainer,
  createSwitchNavigator,
  getActiveChildNavigationOptions,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomePage from "../src/Home/HomePage";
import TestPage1 from "../src/Test/TestPage1";
import TestPage2 from "../src/Test/LeftEye/TestPage2";
import TestPage3 from "../src/Test/LeftEye/TestPage3";
import TestPage4 from "../src/Test/LeftEye/TestPage4";
import TestPage5 from "../src/Test/LeftEye/TestPage5";
import TestPage6 from "../src/Test/TestPage6";
import TestPage7 from "../src/Test/RightEye/TestPage7";
import TestPage8 from "../src/Test/RightEye/TestPage8";
import TestPage9 from "../src/Test/RightEye/TestPage9";
import TestPage10 from "../src/Test/RightEye/TestPage10";
import TestPage11 from "../src/Test/TestPage11";
import ResultPage1 from "../src/Result/ResultPage1";
import Login from "../src/Login/Login";
import SignUp from "../src/Login/SignUp";
import LoginLoading from "../src/Login/LoginLoading";
import ResultLoading from "../src/Result/ResultLoading";
import ForgotPassword from "../src/Login/ForgotPassword";

const HomeStack = createStackNavigator(
  {
    Home1: HomePage,
  },
  { headerMode: "none" }
);
const TestStack = createStackNavigator(
  {
    Test1: TestPage1,
    Test2: TestPage2,
    Test3: TestPage3,
    Test4: TestPage4,
    Test5: TestPage5,
    Test6: TestPage6,
    Test7: TestPage7,
    Test8: TestPage8,
    Test9: TestPage9,
    Test10: TestPage10,
    Test11: TestPage11,
  },
  { headerMode: "none" } //If you don't want the back button on top in header
);
const ResultsStack = createSwitchNavigator(
  {
    ResultLoad: ResultLoading,
    Result1: ResultPage1,
  },
  {
    initialRouteName: "ResultLoad",
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Test: TestStack,
    Results: ResultsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        let labelName;
        if (routeName === "Home") {
          labelName = "Home";
        } else if (routeName === "Test") {
          labelName = "Test";
        } else if (routeName === "Results") {
          labelName = "Results";
        }
        return <Text style={{ fontSize: 14 }}>{labelName}</Text>;
      },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = "ios-home";
        } else if (routeName === "Test") {
          iconName = "ios-eye";
        } else if (routeName === "Results") {
          iconName = "ios-stats";
        }
        return <IconComponent name={iconName} size={28} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "rgb(0,122,255)",
      inactiveTintColor: "rgb(142,142,147)",
      tabStyle: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      },
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      //Set default nagivation for all screens in the stack. navigationOptions other option
      gesturesEnabled: true, //true for testing, false otherwise
    },
  }
);

const FullAuthStack = createStackNavigator(
  {
    AuthStack: AuthStack,
    ForgotPassword: ForgotPassword,
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

const App = createSwitchNavigator(
  {
    AuthLoading: LoginLoading,
    AuthStack: FullAuthStack,
    App: TabNavigator,
  },
  {
    initialRouteName: "AuthLoading",
    defaultNavigationOptions: {
      //Set default nagivation for all screens in the stack. navigationOptions other option
      gesturesEnabled: true, //true for testing, false otherwise
    },
  }
);

// export default createAppContainer(TabNavigator);
export default createAppContainer(App);
