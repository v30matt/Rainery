import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Appearance, StatusBar } from 'react-native';
import Cloud from '../components/Cloud';
import TopCloud from '../components/TopCloud';
import VolumeXSvg from '../../assets/svg/volume-x.svg';
import VolumeOnSvg from '../../assets/svg/volume-2.svg';
import LightThemeIconSvg from '../../assets/svg/sun.svg';
import DarkThemeIconSvg from '../../assets/svg/moon.svg';
import rryStyles from '../../assets/styles/rryStyles';
import rryColors from '../../assets/styles/rryColors';


const HomeScreen = () => {

  const [theme, setTheme] = useState(null)
  const [volume, setVolume] = useState('off')
  useEffect(() => {
    startupTheme(theme, setTheme);
  }, [])

  return (
    <View style={{flex: 1, backgroundColor: rryColors.[theme]}}>
      <StatusBar translucent backgroundColor="transparent" />
      <TopCloud
        height='30%'
        Title='Rainery'
        Subtitle='Start moving for optimization to start'
      />
    <View style={styles.textContainer}>
        { theme === 'light'
          ? <Text style={[rryStyles.textRegular, {paddingVertical: 15}]}>Wind direction: Southwest</Text>
          : <Text style={[rryStyles.textRegular, {paddingVertical: 15, color: rryColors.white}]}>Wind direction: Southwest</Text>
        }
        { theme === 'light'
          ? <Text style={[rryStyles.textRegular, {paddingVertical: 15}]}>Movement direction: Northwest</Text>
          : <Text style={[rryStyles.textRegular, {paddingVertical: 15, color: rryColors.white}]}>Movement direction: Northwest</Text>
        }
      </View>
      <Cloud
        text={"Optimal movement speed: 15 km/h"}
        textStyle='textRegular'
      />
      <View style={styles.textContainer}>
        { theme === 'light'
          ? <Text style={[rryStyles.textRegular, {paddingVertical: 15}]}>Current Movement Speed: 10 km/h</Text>
          : <Text style={[rryStyles.textRegular, {paddingVertical: 15, color: rryColors.white}]}>{"Current Movement Speed: 10 km/h"}</Text>
        }
      </View>
      <Cloud
        text={"Faster!"}
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
              setTheme(theme === 'dark' ? 'light' : 'dark')
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
    setTheme(systemTheme)
  } else if (!theme) {
    setTheme('light')
  }
};


const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  multiIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30
  }
});

export default HomeScreen;
