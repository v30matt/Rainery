import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Appearance, StatusBar, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cloud from '../components/Cloud';
import TopCloud from '../components/TopCloud';
import rryStyles from '../../assets/styles/rryStyles';
import rryColors from '../../assets/styles/rryColors';
import { SafeAreaView } from 'react-native-safe-area-context';

const InfoScreen = ({ route, navigation }) => {
  const { propsTheme } = route.params;
  const [theme, setTheme] = useState(propsTheme)
  const [soundIsEnabled, setSoundIsEnabled] = useState(false)
  const [notificationIsEnabled, setNotificationIsEnabled] = useState(false)
  useEffect(() => {
      getSoundSettings().then(soundSettings => setSoundIsEnabled(soundSettings));
      getNotificationSettings().then(notificationSettings => setNotificationIsEnabled(notificationSettings));
    }, [])
  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 20, backgroundColor: rryColors.[theme]}} edges={['bottom']}>
      <StatusBar translucent backgroundColor="transparent" />
      <TopCloud
        height='20%'
        Title='About'
        Icon='close'
        onXButtonPress={() => onXButtonPress(navigation)}
      />
      <View style={{justifyContent: 'flex-start', marginTop: 5}}>
        <View style={{height: 80}}>
          <Cloud
            text='Rain saved:'
            textStyle='textRegular'
            mode='small'
          />
        </View>
        <View style={rryStyles.textContainer}>
          { theme === 'light'
            ? <Text style={[rryStyles.textSmall, {paddingVertical: 5}]}>We have saved you from n drops of rain up to now. That’s as much as n bathtubs!</Text>
            : <Text style={[rryStyles.textSmall, {paddingVertical: 5, color: rryColors.white}]}>We have saved you from n drops of rain up to now. That’s as much as n bathtubs!</Text>
          }
        </View>
        <View style={{height: 80}}>
          <Cloud
            text='How it works:'
            textStyle='textRegular'
            mode='small'
          />
        </View>
        <View style={rryStyles.textContainer}>
          { theme === 'light'
            ? <Text style={[rryStyles.textSmall, {paddingVertical: 5}]}>We use live weather data and your movement direction to calculate the movement speed which minimizes the exposure to rain. </Text>
            : <Text style={[rryStyles.textSmall, {paddingVertical: 5, color: rryColors.white}]}>We use live weather data and your movement direction to calculate the movement speed which minimizes the exposure to rain. </Text>
          }
        </View>
        <View style={{height: 80}}>
          <Cloud
            text='Settings'
            textStyle='textRegular'
            mode='small'
          />
        </View>
        <View style={{height: '20%', justifyContent: 'flex-start'}}>
          <View style={rryStyles.textContainer}>
            { theme === 'light'
              ? <Text style={[rryStyles.textSmall, {paddingTop: 15}]}>Sound:</Text>
              : <Text style={[rryStyles.textSmall, {paddingTop: 15, color: rryColors.white}]}>Sound:</Text>
            }
          </View>
          <View style={styles.settingContainer}>
            <View style={{width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Always</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Always</Text>
              }
            </View>
            <Switch
              trackColor={{ false: rryColors.primaryLight, true: rryColors.primaryLight }}
              thumbColor={soundIsEnabled ? rryColors.primary : rryColors.primary}
              ios_backgroundColor={"white"}
              onValueChange={() => {
                saveSoundSettings(soundIsEnabled);
                setSoundIsEnabled(previousState => !previousState);
              }}
              value={soundIsEnabled}
            />
            <View style={{alignSelf: 'flex-start', width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Only with Headphones</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Only with Headphones</Text>
              }
            </View>
          </View>
          <View style={rryStyles.textContainer}>
            { theme === 'light'
              ? <Text style={[rryStyles.textSmall, {paddingTop: 10}]}>Notifications:</Text>
              : <Text style={[rryStyles.textSmall, {paddingTop: 10, color: rryColors.white}]}>Notifications:</Text>
            }
          </View>
          <View style={styles.settingContainer}>
            <View style={{width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Off</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Off</Text>
              }
            </View>
            <Switch
              trackColor={{ false: rryColors.primaryLight, true: rryColors.primaryLight }}
              thumbColor={notificationIsEnabled ? rryColors.primary : rryColors.primary}
              ios_backgroundColor={"white"}
              onValueChange={() => {
                saveNotificationSettings(notificationIsEnabled);
                setNotificationIsEnabled(previousState => !previousState);
              }}
              value={notificationIsEnabled}
            />
            <View style={{alignSelf: 'flex-start', width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Get Rain Notifications</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Get Rain Notifications</Text>
              }
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const saveSoundSettings = async (soundIsEnabled) => {
  try {
    await AsyncStorage.setItem('@soundIsEnabled', JSON.stringify(!soundIsEnabled))
  } catch (e) {
    // saving error
    console.log(e);
  }
}

const saveNotificationSettings = async (notificationIsEnabled) => {
  try {
    await AsyncStorage.setItem('@notificationIsEnabled', JSON.stringify(!notificationIsEnabled))
  } catch (e) {
    // saving error
    console.log(e);
  }
}

const getSoundSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@soundIsEnabled')
    const soundSettings = jsonValue != null ? JSON.parse(jsonValue) : false
    return soundSettings;
  } catch (e) {
      console.log(e);
  }
}

const getNotificationSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@notificationIsEnabled')
    const notificationSettings = jsonValue != null ? JSON.parse(jsonValue) : false;
    return notificationSettings;
  } catch (e) {
    console.log(e);
  }
}

const onXButtonPress = async (navigation) => {
  navigation.goBack()
}

const styles = StyleSheet.create({
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 10
  },
});

export default InfoScreen;
