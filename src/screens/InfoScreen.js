import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Appearance, StatusBar, Switch, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cloud from '../components/Cloud';
import TopCloud from '../components/TopCloud';
import rryStyles from '../../assets/styles/rryStyles';
import rryColors from '../../assets/styles/rryColors';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowHeight = (dividability) => {
  return Dimensions.get('screen').height / dividability
}

const windowWidth = (dividability) => {
  return Dimensions.get('screen').width / dividability
}

const InfoScreen = ({ route, navigation }) => {
  const { propsTheme } = route.params;
  const [theme, setTheme] = useState(propsTheme)
  const [soundIsEnabled, setSoundIsEnabled] = useState(false)
  const [accuracyIsEnabled, setAccuracyIsEnabled] = useState(true)
  const [secondsMoving, setSecondsMoving] = useState(0)
  useEffect(() => {
      getSoundSettings().then(soundSettings => setSoundIsEnabled(soundSettings));
      getAccuracySettings().then(accuracySettings => setAccuracyIsEnabled(accuracySettings));
      getSecondsMoving().then(secondsMovingRetrieved => setSecondsMoving(secondsMovingRetrieved))
    }, [])
  return (
    <SafeAreaView style={{flex: 1, paddingBottom: windowHeight(37.5), backgroundColor: rryColors.[theme]}} edges={['bottom']}>
      <StatusBar translucent backgroundColor="transparent" />
      <TopCloud
        height='5'
        Title='About'
        Icon='close'
        onXButtonPress={() => onXButtonPress(navigation)}
      />
    <View style={{justifyContent: 'flex-start', marginTop: windowWidth(-150)}}>
        <View style={{height: '13%', marginVertical: windowHeight(50)}}>
          <Cloud
            text='Rain saved:'
            textStyle='textRegular'
          />
        </View>
        <View style={rryStyles.textContainer}>
          { theme === 'light'
            ? <Text style={[rryStyles.textSmall, {paddingVertical: windowHeight(150)}]}>{`We have saved you from 13097482 drops of rain up to now. That’s as much as 3.5 bathtubs!`}</Text>
            : <Text style={[rryStyles.textSmall, {paddingVertical: windowHeight(150), color: rryColors.white}]}>{`We have saved you from 13097482 drops of rain up to now. That’s as much as 3.5 bathtubs!`}</Text>
          }
        </View>
        <View style={{height: windowWidth(5), marginVertical: '2%'}}>
          <Cloud
            text='How it works:'
            textStyle='textRegular'
          />
        </View>
        <View style={rryStyles.textContainer}>
          { theme === 'light'
            ? <Text style={[rryStyles.textSmall, {paddingVertical: windowHeight(150)}]}>We use live weather data and your movement direction to calculate the movement speed which minimizes the exposure to rain. </Text>
            : <Text style={[rryStyles.textSmall, {paddingVertical: windowHeight(150), color: rryColors.white}]}>We use live weather data and your movement direction to calculate the movement speed which minimizes the exposure to rain. </Text>
          }
        </View>
        <View style={{height: windowWidth(5), marginVertical: windowHeight(50)}}>
          <Cloud
            text='Settings'
            textStyle='textRegular'
          />
        </View>
        <View style={{height: '20%', justifyContent: 'flex-start'}}>
          <View style={rryStyles.textContainer}>
            { theme === 'light'
              ? <Text style={[rryStyles.textSmall, {paddingTop: windowHeight(50)}]}>Sound:</Text>
              : <Text style={[rryStyles.textSmall, {paddingTop: windowHeight(50), color: rryColors.white}]}>Sound:</Text>
            }
          </View>
          <View style={styles.settingContainer}>
            <View style={{width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Only with Headphones</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Only with Headphones</Text>
              }
            </View>
            <Switch
              trackColor={{ false: rryColors.primaryTranslucent, true: rryColors.primaryTranslucent }}
              thumbColor={theme === 'light' ? rryColors.primary : rryColors.primaryLight}
              ios_backgroundColor={theme === 'light' ? rryColors.light : rryColors.dark}
              onValueChange={() => {
                saveSoundSettings(soundIsEnabled);
                setSoundIsEnabled(previousState => !previousState);
              }}
              value={soundIsEnabled}
            />
            <View style={{width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Always</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Always</Text>
              }
            </View>
          </View>
          <View style={rryStyles.textContainer}>
            { theme === 'light'
              ? <Text style={[rryStyles.textSmall, {paddingTop: windowHeight(50)}]}>Location Accuracy:</Text>
              : <Text style={[rryStyles.textSmall, {paddingTop: windowHeight(50), color: rryColors.white}]}>Location Accuracy:</Text>
            }
          </View>
          <View style={[styles.settingContainer, {marginBottom: windowHeight(75)}]}>
            <View style={{width: '35%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Battery {'\n'} Optimized</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Battery {'\n'} Optimized</Text>
              }
            </View>
            <Switch
              trackColor={{ false: rryColors.primaryTranslucent, true: rryColors.primaryTranslucent }}
              thumbColor={theme === 'light' ? rryColors.primary : rryColors.primaryLight}
              ios_backgroundColor={theme === 'light' ? rryColors.light : rryColors.dark}
              onValueChange={() => {
                saveAccuracySettings(accuracyIsEnabled);
                setAccuracyIsEnabled(previousState => !previousState);
              }}
              value={accuracyIsEnabled}
            />
          <View style={{width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Accuracy {'\n'} Optimized</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Accuracy {'\n'} Optimized</Text>
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

const saveAccuracySettings = async (accuracyIsEnabled) => {
  try {
    await AsyncStorage.setItem('@accuracyIsEnabled', JSON.stringify(!accuracyIsEnabled))
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

const getAccuracySettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@accuracyIsEnabled')
    const accuracySettings = jsonValue != null ? JSON.parse(jsonValue) : true;
    return accuracySettings;
  } catch (e) {
    console.log(e);
  }
}

const getSecondsMoving = async () => {
  try {
    const secondsMovingString = await AsyncStorage.getItem('@secondsMoving')
    const secondsMovingRetrieved = parseInt(secondsMovingString)
    return secondsMovingRetrieved;
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
    paddingTop: windowHeight(100)
  },
});

export default InfoScreen;
