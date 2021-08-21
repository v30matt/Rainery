import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BigCloudSvg from '../../assets/svg/TopCloud.svg';
import InfoSvg from '../../assets/svg/info.svg';

const TopCloud = (props) => {
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'flex-end', height: '100%', width: '100%'}}>
        <BigCloudSvg
          width='100%'
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleStyle}>{props.Title}</Text>
        <Text style={styles.subtitleStyle}>{props.Subtitle}</Text>
      </View>
      <View style={{position: 'absolute', right: 41, top: 70}}>
        <TouchableOpacity>
          <InfoSvg
            stroke={'white'}
            strokeWidth={1.5}
            height={41}
            width={41}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '37%'
  },
  textContainer: {
    flexDirection: 'column',
    position: 'absolute',
    marginHorizontal: 30,
    marginVertical: 50
  },
  titleStyle: {
    color: 'white',
    fontFamily: 'Lato-BoldItalic',
    fontSize: 60,
    paddingBottom: 5
  },
  subtitleStyle: {
    color: 'white',
    fontFamily: 'Lato-Italic',
    fontSize: 30,
    textAlign: 'left',
    paddingTop: 5
  }
});

export default TopCloud;
