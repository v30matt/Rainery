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
  const [accuracyIsEnabled, setAccuracyIsEnabled] = useState(true)
  const [secondsMoving, setSecondsMoving] = useState(0)
  useEffect(() => {
      getSoundSettings().then(soundSettings => setSoundIsEnabled(soundSettings));
      getAccuracySettings().then(accuracySettings => setAccuracyIsEnabled(accuracySettings));
      getSecondsMoving().then(secondsMovingRetrieved => setSecondsMoving(secondsMovingRetrieved))
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
        <View style={{height: 89, marginVertical: 10}}>
          <Cloud
            text='Rain saved:'
            textStyle='textRegular'
          />
        </View>
        <View style={rryStyles.textContainer}>
          { theme === 'light'
            ? <Text style={[rryStyles.textSmall, {paddingVertical: 5}]}>{`We have saved you from ${secondsMoving * 15} drops of rain up to now. That’s as much as ${Math.round(secondsMoving / 1800) / 100} bathtubs!`}</Text>
            : <Text style={[rryStyles.textSmall, {paddingVertical: 5, color: rryColors.white}]}>{`We have saved you from ${secondsMoving * 15} drops of rain up to now. That’s as much as ${Math.round(secondsMoving / 1800) / 100} bathtubs!`}</Text>
          }
        </View>
        <View style={{height: 89, marginVertical: 10}}>
          <Cloud
            text='How it works:'
            textStyle='textRegular'
          />
        </View>
        <View style={rryStyles.textContainer}>
          { theme === 'light'
            ? <Text style={[rryStyles.textSmall, {paddingVertical: 5}]}>We use live weather data and your movement direction to calculate the movement speed which minimizes the exposure to rain. </Text>
            : <Text style={[rryStyles.textSmall, {paddingVertical: 5, color: rryColors.white}]}>We use live weather data and your movement direction to calculate the movement speed which minimizes the exposure to rain. </Text>
          }
        </View>
        <View style={{height: 89, marginVertical: 10}}>
          <Cloud
            text='Settings'
            textStyle='textRegular'
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
            <View style={{alignSelf: 'flex-start', width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Always</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Always</Text>
              }
            </View>
          </View>
          <View style={rryStyles.textContainer}>
            { theme === 'light'
              ? <Text style={[rryStyles.textSmall, {paddingTop: 10}]}>Location Accuracy:</Text>
              : <Text style={[rryStyles.textSmall, {paddingTop: 10, color: rryColors.white}]}>Location Accuracy:</Text>
            }
          </View>
          <View style={styles.settingContainer}>
            <View style={{width: '35%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Battery Optimized</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Battery Optimized</Text>
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
            <View style={{alignSelf: 'flex-start', width: '40%'}}>
              { theme === 'light'
                ? <Text style={rryStyles.textSmall}>Accuracy Optimized</Text>
                : <Text style={[rryStyles.textSmall, {color: rryColors.white}]}>Accuracy Optimized</Text>
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
    paddingTop: 10
  },
});

export default InfoScreen;
