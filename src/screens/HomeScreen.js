import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AppState,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Appearance,
  StatusBar,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import HeadphoneDetection from 'react-native-headphone-detection';
import Cloud from '../components/Cloud';
import TopCloud from '../components/TopCloud';
import VolumeXSvg from '../../assets/svg/volume-x.svg';
import VolumeOnSvg from '../../assets/svg/volume-2.svg';
import LightThemeIconSvg from '../../assets/svg/sun.svg';
import DarkThemeIconSvg from '../../assets/svg/moon.svg';
import rryStyles from '../../assets/styles/rryStyles';
import rryColors from '../../assets/styles/rryColors';

import openweathermap from '../api/openweathermap';

import model from '../components/Model'

var Sound = require('react-native-sound');

// -- react-native-sound logic --
Sound.setCategory('Playback');

var speedUp = new Sound('speed_up.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});


var slowDown = new Sound('slow_down.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

var keepGoing = new Sound('keep_up_this_speed.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

var afayc = new Sound('afayc.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

// -- react-native-sound logic END --

const HomeScreen = () => {

  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [theme, setTheme] = useState(startupTheme());
  const [volume, setVolume] = useState('off');
  const [optimalSpeed, setOptimalSpeed] = useState("Unavailable");
  const [speedChange, setSpeedChange] = useState(undefined);
  const [playingSound, setPlayingSound] = useState(false)
  const [weather, setWeather] = useState(null)
  const [soundSettings, setSoundSettings] = useState(null)
  const [secondsMoving, setSecondsMoving] = useState(0)

  // -- react-native-geolocation-service logic --
  const [forceLocation, setForceLocation] = useState(false);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState(null);

  const watchId = useRef(null);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);
  useEffect(() => {
    getLocationUpdates()
  }, [])
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "Rainery" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog
      },
    );
  };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      (position) => {
        position.coords.cardinal = getCardinal(position?.coords?.heading)
        setLocation(position);
      },
      (error) => {
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'nearestTenMeters',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 3000,
        fastestInterval: 2000,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
        useSignificantChanges: significantChanges,
      },
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
        importance: 1
      });
    }

    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: 'Rainery',
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err) => err);
  }, []);

  const getCardinal = (direction) => {
    if (direction) {
      const degreePerDirection = 360 / 8;

      const offsetAngle = direction + degreePerDirection / 2;

      return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "North"
      : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "Northeast"
        : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "East"
          : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "Southeast"
            : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "South"
              : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "Southwest"
                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "West"
                  :(offsetAngle >= 8 * degreePerDirection && offsetAngle < 9 * degreePerDirection) ? "North"
                    : "Northwest";
    } else {
      return
    }
  }

  // -- react-native-geolocation-service logic END --

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/background/) &&
        nextAppState === "active"
      ) {
        getLocationUpdates()
      } else if (
        appState.current.match(/active/) &&
        nextAppState === "background"
      ) {
        removeLocationUpdates()
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // play sound when speedChange state changes
  useEffect(() => {
    if (speedChange === 'speedUp' && volume === 'on') {
      slowDown.stop()
      keepGoing.stop()
      afayc.stop()
      setPlayingSound(true)
      speedUp.play((success) => {
        if (success) {
          setPlayingSound(false)
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else if (speedChange === 'slowDown' && volume === 'on') {
      speedUp.stop()
      keepGoing.stop()
      afayc.stop()
      setPlayingSound(true)
      slowDown.play((success) => {
        if (success) {
          setPlayingSound(false)
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else if (speedChange === 'keepGoing' && volume === 'on') {
      slowDown.stop()
      speedUp.stop()
      afayc.stop()
      setPlayingSound(true)
      keepGoing.play((success) => {
        if (success) {
          setPlayingSound(false)
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else if (speedChange === 'afayc' && volume === 'on') {
      slowDown.stop()
      speedUp.stop()
      keepGoing.stop()
      setPlayingSound(true)
      afayc.play((success) => {
        if (success) {
          setPlayingSound(false)
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else {
      slowDown.stop()
      keepGoing.stop()
      speedUp.stop()
      afayc.stop()
    }
  }, [speedChange, volume])

  useEffect(() => {
    (optimalSpeed === false) ? setSpeedChange('afayc')
    : (location?.coords?.speed < optimalSpeed - 0.5) ? setSpeedChange('speedUp')
      : (location?.coords?.speed > optimalSpeed + 0.5) ? setSpeedChange('slowDown')
        : setSpeedChange('keepGoing');
  }, [location, optimalSpeed])

  // -- weather logic --

  const searchApi = async (lat, lon) => {
    try {
      const response = await openweathermap.get('/weather', {
        params: {
          lat: lat,
          lon: lon,
          appid: '1699b7b7eb29a5b8eb578f5a950382c9'
        }
      });
      const APIWeather = response.data
      APIWeather.timestamp = Date.now()
      APIWeather.wind.direction = getCardinal(APIWeather?.wind?.deg)
      setWeather(APIWeather)
      console.log(APIWeather);
    } catch (err) {
      Alert.alert('Loading Error', 'We encountered an error getting the weather data, please make sure you are connected to the internet and try again');
      console.log('Error with API request: ', err);
    };
  };

  useEffect(() => {
    const HALFHOUR = 1000 * 30 * 60
    const halfHourAgo = Date.now() - HALFHOUR
    if (!weather && location) {
      const lat = location?.coords?.latitude
      const lon = location?.coords?.longitude
      searchApi(lat, lon)
    } else if (weather && weather.timestamp < halfHourAgo && location) {
      const lat = location?.coords?.latitude
      const lon = location?.coords?.longitude
      searchApi(lat, lon)
    } else {
      return
    }
  }, [location])
  // -- weather logic END --

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      changeNavigationBarColor(rryColors.dark, false, false)
    } else {
      setTheme('light')
      changeNavigationBarColor(rryColors.light, true, false)
    }
  }

  useEffect(() => {
    async function getSoundSettingsFromAsyncStorage () {
      try {
        const jsonValue = await AsyncStorage.getItem('@soundIsEnabled')
        const soundSettingsRetrieved = jsonValue != null ? JSON.parse(jsonValue) : false
        await setSoundSettings(soundSettingsRetrieved)
      } catch (e) {
          console.log(e);
      }
    }
    getSoundSettingsFromAsyncStorage()
  }, [])

  useEffect(() => {
    if (soundSettings === false) {
      getAudioDeviceConnected()
    } else if (soundSettings === true) {
      setVolume('on')
    }
  }, [soundSettings])

  const getAudioDeviceConnected = async () => {
    const audioDevicesConnected = await HeadphoneDetection.isAudioDeviceConnected()
    console.log(audioDevicesConnected);
    if (audioDevicesConnected.audioJack || audioDevicesConnected.bluetooth) {
      setVolume('on')
    } else {
      setVolume('off')
    }
  }

  useEffect(() => {
    async function getAccuracySettingsFromAsyncStorage () {
      try {
        const jsonValue = await AsyncStorage.getItem('@accuracyIsEnabled')
        const accuracySettingsRetrieved = jsonValue != null ? JSON.parse(jsonValue) : true
        if (accuracySettingsRetrieved === true) {
          setHighAccuracy(true)
        } else {
          setHighAccuracy(false)
        }
      } catch (e) {
          console.log(e);
      }
    }
    getAccuracySettingsFromAsyncStorage()
  }, [])

  useEffect(() => {
    async function restartLocationTracking () {
      await removeLocationUpdates()
      getLocationUpdates()
    }
    restartLocationTracking()
  }, [highAccuracy])

  useEffect(() => {
    if (weather?.wind?.speed && weather?.wind?.deg && location?.coords?.heading) {
      setOptimalSpeed(model(weather?.wind?.speed, weather?.wind?.deg, location?.coords?.heading))
    } else {
      setOptimalSpeed(false)
    }
  }, [location?.coords?.heading, weather?.wind?.deg, weather?.wind?.speed])

  // logic for time spent moving

  useEffect(() => {
    if (location?.coords?.speed > 0.3) {
      setSecondsMoving(secondsMoving + 1)
      saveSecondsMoving(secondsMoving)
    }
  }, [location])

  const saveSecondsMoving = async (secondsMoving) => {
    try {
      await AsyncStorage.setItem('@secondsMoving', secondsMoving.toString())
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: rryColors.[theme]}}>
      <StatusBar translucent backgroundColor="transparent" />
      <TopCloud
        height='35%'
        Title='Rainery'
        Subtitle={location?.coords?.speed > 0.3 ? 'Follow the optimal Speed' : 'Start moving for optimization to start'}
        icon='info'
        theme={theme}
        textStyle={location?.coords?.speed > 0.3 ? 'textSubtitle1' : 'textSubtitle'}
      />
    <View style={rryStyles.textContainer}>
        { theme === 'light'
          ? <Text style={[rryStyles.textRegular, {paddingVertical: 15}]}>Wind direction: {weather?.wind?.direction ? weather?.wind?.direction : 'No Wind'}</Text>
          : <Text style={[rryStyles.textRegular, {paddingVertical: 15, color: rryColors.white}]}>Wind direction: {weather?.wind?.direction ? weather?.wind?.direction : 'No Wind'}</Text>
        }
        { theme === 'light'
          ? <Text style={[rryStyles.textRegular, {paddingVertical: 15}]}>Movement direction: {location?.coords?.speed > 0.3 ? location?.coords?.cardinal : 'Not Moving'}</Text>
          : <Text style={[rryStyles.textRegular, {paddingVertical: 15, color: rryColors.white}]}>Movement direction: {location?.coords?.speed > 0.3 ? location?.coords?.cardinal : 'Not Moving'}</Text>
        }
      </View>
      <Cloud
        text={!optimalSpeed ? 'Optimal movement speed: Unavailable' : `Optimal movement speed: ${optimalSpeed} m/s`}
        textStyle='textRegular'
      />
      <View style={rryStyles.textContainer}>
        { theme === 'light'
          ? <Text style={[rryStyles.textRegular, {paddingVertical: 15}]}>Current Movement Speed: {'\n'} {location?.coords?.speed ? Math.round((location?.coords?.speed + Number.EPSILON) * 10) / 10  + ' m/s' : 'Unavailable'}</Text>
          : <Text style={[rryStyles.textRegular, {paddingVertical: 15, color: rryColors.white}]}>Current Movement Speed: {'\n'} {location?.coords?.speed ? Math.round((location?.coords?.speed + Number.EPSILON) * 10) / 10  + ' m/s' : 'Unavailable'}</Text>
        }
      </View>
      <Cloud
        text={
          (speedChange === 'speedUp') ? 'Faster!'
          : (speedChange === 'slowDown') ? 'Slow Down!'
            : (speedChange === 'keepGoing') ? 'Keep it up!'
              : (speedChange === 'afayc') ? 'As fast as you can!'
                : 'Unavailable'
        }
        textStyle='textBig'
      />
      <View style={styles.multiIconContainer}>
        <View style={{paddingRight: 60}}>
          <TouchableOpacity
            onPress={() => {
              setVolume(volume === 'off' ? 'on' : 'off')
            }}
          >
            { volume === 'off'
              ? <VolumeXSvg
                  stroke={theme === 'dark' ? rryColors.white : rryColors.primary}
                  strokeWidth={1.5}
                  height={41}
                  width={41}
                />
              : <VolumeOnSvg
                  stroke={theme === 'dark' ? rryColors.white : rryColors.primary}
                  strokeWidth={1.5}
                  height={41}
                  width={41}
                />
            }
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 60}}>
          <TouchableOpacity
            onPress={() => {
              changeTheme()
            }}
          >
            { theme === 'dark'
              ? <DarkThemeIconSvg
                  stroke={theme === 'dark' ? rryColors.white : rryColors.primary}
                  strokeWidth={1.5}
                  height={41}
                  width={41}
                />
              : <LightThemeIconSvg
                  stroke={theme === 'dark' ? rryColors.white : rryColors.primary}
                  strokeWidth={1.5}
                  height={41}
                  width={41}
                />
            }
          </TouchableOpacity>
        </View>
      </View>
  </View>
  );
};

const startupTheme = (theme, setTheme) => {
  const systemTheme = Appearance.getColorScheme();
  if (!theme && systemTheme) {
    systemTheme === 'dark' ?
    changeNavigationBarColor(rryColors.dark, false, false) :
    changeNavigationBarColor(rryColors.light, true, false)
    return systemTheme
  } else if (!theme) {
    changeNavigationBarColor(rryColors.light, true, false)
    return 'light'
  }
};


const styles = StyleSheet.create({
  multiIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30
  }
});

export default HomeScreen;
