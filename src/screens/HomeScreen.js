import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Appearance, StatusBar } from 'react-native';
import Cloud from '../components/Cloud';
import TopCloud from '../components/TopCloud';
import VolumeXSvg from '../../assets/svg/volume-x.svg';
import ChangeThemeSvg from '../../assets/svg/change-theme.svg';
import {changeBarColors} from 'react-native-immersive-bars';


const HomeScreen = () => {

  const [theme, setTheme] = useState(null)
  useEffect(() => {
    changeTheme(theme, setTheme);
  }, [])

  return (
    <View style={[styles.[theme], {flex: 1}]}>
      <StatusBar translucent backgroundColor="transparent" />
      <TopCloud
        height='30%'
        Title='Rainery'
        Subtitle='Start moving for optimization to start'
      />
    <View style={styles.textContainer}>
        { theme === 'light'
          ? <Text style={[styles.textRegularDark, {paddingVertical: 15}]}>Wind direction: Southwest</Text>
          : <Text style={[styles.textRegularWhite, {paddingVertical: 15}]}>Wind direction: Southwest</Text>}
        { theme === 'light'
          ? <Text style={[styles.textRegularDark, {paddingVertical: 15}]}>Movement direction: Northwest</Text>
          : <Text style={[styles.textRegularWhite, {paddingVertical: 15}]}>Movement direction: Northwest</Text> }
      </View>
      <Cloud
        text={"Optimal movement speed: \n 15 km/h"}
        textStyle='textRegularWhite'
      />
      <View style={styles.textContainer}>
        { theme === 'light'
          ? <Text style={[styles.textRegularDark, {paddingVertical: 15}]}>Current Movement Speed: 10 km/h</Text>
          : <Text style={[styles.textRegularWhite, {paddingVertical: 15}]}>Current Movement Speed: 10 km/h</Text> }
      </View>
      <Cloud
        text={"Faster!"}
        textStyle='textBigWhite'
      />
    <View style={styles.multiIconContainer}>
        <View style={{paddingRight: 60}}>
          <TouchableOpacity>
            <VolumeXSvg
              stroke={theme === 'dark' ? 'white' : '#145066'}
              strokeWidth={1.5}
              height={41}
              width={41}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 60}}>
          <TouchableOpacity
            onPress={() => {
              setTheme(switchTheme(theme))
            }}
          >
            <ChangeThemeSvg
              fill={theme==='dark' ? 'white' : '#145066'}
              height={34}
              width={34}
            />
          </TouchableOpacity>
        </View>
      </View>
  </View>
  );
};

const changeTheme = (theme, setTheme) => {
  const systemTheme = Appearance.getColorScheme();
  console.log(systemTheme, theme);
  if (!theme && systemTheme) {
    setTheme(systemTheme)
  } else if (!theme) {
    setTheme('light')
  }
};

 const switchTheme = (theme) => {
   if (theme === 'light') {
     return 'dark';
   } else {
     return 'light';
   }
   console.log(theme);
 }


const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  textRegularDark: {
    color: '#145066',
    fontFamily: 'Lato-Regular',
    fontSize: 22,
    textAlign: 'center'
  },
  textRegularWhite: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontSize: 22,
    textAlign: 'center'
  },
  multiIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
  dark: {
    backgroundColor: 'rgba(48, 48, 48, 1)',
    color: 'rgba(48, 48, 48, 1)'
  },
  light: {
    backgroundColor: 'white',
    color: 'white'
  }
});

export default HomeScreen;
