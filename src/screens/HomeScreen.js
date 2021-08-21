import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Cloud from '../components/Cloud';
import TopCloud from '../components/TopCloud';
import VolumeXSvg from '../../assets/svg/volume-x.svg';
import ChangeThemeSvg from '../../assets/svg/change-theme.svg';

const HomeScreen = () => {
  return (
    <View>
      <TopCloud
        height='30%'
        Title='Rainery'
        Subtitle='Start moving for optimization to start'
      />
    <View style={styles.textContainer}>
        <Text style={[styles.textRegularDark, {paddingVertical: 15}]}>Wind direction: Southwest</Text>
        <Text style={[styles.textRegularDark, {paddingVertical: 15}]}>Movement direction: Northwest</Text>
      </View>
      <Cloud
        text={"Optimal movement speed: \n 15 km/h"}
        textStyle='textRegularWhite'
      />
      <View style={styles.textContainer}>
        <Text style={[styles.textRegularDark, {paddingVertical: 15}]}>Current Movement Speed: 10 km/h</Text>
      </View>
      <Cloud
        text={"Faster!"}
        textStyle='textBigWhite'
      />
    <View style={styles.multiIconContainer}>
        <View style={{paddingRight: 60}}>
          <TouchableOpacity>
            <VolumeXSvg
              stroke={'rgba(49, 81, 116, 1)'}
              strokeWidth={1.5}
              height={41}
              width={41}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 60}}>
          <TouchableOpacity>
            <ChangeThemeSvg
              fill={'rgba(49, 81, 116, 1)'}
              height={41}
              width={41}
            />
          </TouchableOpacity>
        </View>
      </View>
  </View>
  );
};

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
  multiIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  }
});

export default HomeScreen;
