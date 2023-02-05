/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

import { 
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens/Login';

import {
  HomeScreen,
  CreateRoutineScreen,
  MyRoutineListScreen,
  RoutineDetailScreen,
  MyGroup,
} from './src/screens/Main';

import {
  MyGroupListScreen,
  MyGroupDetail,
  GroupListScreen,
  CreateGroupScreen,
  GroupListDetailScreen
} from './src/screens/Group'

import {
  CommunityScreen,
  ArticleDetailScreen,
  CreateArticleScreen,
  ArticleListScreen,
} from './src/screens/Community'

import {
  MainMyPageScreen,
  ChangeImageScreen,
} from './src/screens/My'

import RoutineItem from './src/components/RoutineListItem';
import ArticleItem from './src/components/ArticleItem';
import { Text } from 'react-native-paper';


const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const GroupStack = createNativeStackNavigator();
const CommunityStack = createNativeStackNavigator();
const MyPageStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return(
  <MainStack.Navigator initialRouteName='HomeScreen'>
    <MainStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
    <MainStack.Screen name="CreateRoutineScreen" component={CreateRoutineScreen} options={{ headerShown: false }}/>
    <MainStack.Screen name="MyRoutineListScreen" component={MyRoutineListScreen} options={{ headerShown: false }}/>
    <MainStack.Screen name="RoutineDetailScreen" component={RoutineDetailScreen} options={{ headerShown: false }}/>
    <MainStack.Screen name="MyGroup" component={MyGroup}/>
  </MainStack.Navigator>
  )
}
const GroupStackNavigator = () => {
  return(
  <GroupStack.Navigator initialRouteName='GroupListScreen'>
    <GroupStack.Screen name="GroupListScreen" component={GroupListScreen} options={{ headerShown: false }}/>
    <GroupStack.Screen name="GroupListDetailScreen" component={GroupListDetailScreen} options={{ headerShown: false }}/>
    <GroupStack.Screen name="MyGroupListScreen" component={MyGroupListScreen} options={{ headerShown: false }}/>
    <GroupStack.Screen name="MyGroupDetail" component={MyGroupDetail} options={{ headerShown: false }}/>
    <GroupStack.Screen name="CreateGroupScreen" component={CreateGroupScreen} options={{ headerShown: false }}/>
  </GroupStack.Navigator>
  )
}
const CommunityStackNavigator = () => {
  return(
  <CommunityStack.Navigator initialRouteName='CommunityScreen'>
    <CommunityStack.Screen name="CommunityScreen" component={CommunityScreen} options={{ headerShown: false }}/>
    <CommunityStack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }}/>
    <CommunityStack.Screen name="CreateArticleScreen" component={CreateArticleScreen} options={{ headerShown: false }}/>
    <CommunityStack.Screen name="ArticleListScreen" component={ArticleListScreen} options={{ headerShown: false }}/>
  </CommunityStack.Navigator>
  )
}

const MyPageStackNavigator = () =>{
  return(
  <MyPageStack.Navigator initialRouteName='MainMyPageScreen'>
    <MyPageStack.Screen name="MainMyPageScreen" component={MainMyPageScreen} options={{ headerShown: false }}/>
    <MyPageStack.Screen name="ChangeImageScreen" component={ChangeImageScreen} options={{ headerShown: false }}/>
  </MyPageStack.Navigator>
  )
}

const LoginStackNavigator = () =>{
  return(
  <LoginStack.Navigator initialRouteName='MainMyPageScreen'>
    <LoginStack.Screen name="StartScreen" component={StartScreen}/>
    <LoginStack.Screen name="LoginScreen" component={LoginScreen}/>
    <LoginStack.Screen name="RegisterScreen" component={RegisterScreen}/>
    <LoginStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
    <LoginStack.Screen name="Dashboard" component={Dashboard}/>
  </LoginStack.Navigator>
  )
}


function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Home" component={MainStackNavigator}/>
        <Tab.Screen name="Group" component={GroupStackNavigator}/>
        <Tab.Screen name="Community" component={CommunityStackNavigator}/>
        <Tab.Screen name="MyPage" component={MyPageStackNavigator}/>
        <Tab.Screen name="Login" component={LoginStackNavigator}/>
      
       

        {/* components */}
        {/* <Stack.Screen name='RoutineItem' component={RoutineItem} />
        <Stack.Screen name='ArticleItem' component={ArticleItem} /> */}
      </Tab.Navigator>
      

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
