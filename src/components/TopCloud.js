import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import BigCloudSvg from '../../assets/svg/TopCloud.svg';
import InfoSvg from '../../assets/svg/info.svg';
import XCircleSvg from '../../assets/svg/x-circle.svg'
import rryStyles from '../../assets/styles/rryStyles';
import rryColors from '../../assets/styles/rryColors';
import { useNavigation } from '@react-navigation/native';

const windowHeight = (dividability) => {
  return Dimensions.get('screen').height / dividability
}

const windowWidth = (dividability) => {
  return Dimensions.get('screen').width / dividability
}

const TopCloud = (props) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, {height: windowHeight(props.height)}]}>
      <View style={{justifyContent: 'flex-end', height: '100%', width: '100%'}}>
        <BigCloudSvg
          width='100%'
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={rryStyles.textTitle}>{props.Title}</Text>
        <Text style={rryStyles.[props.textStyle]}>{props.Subtitle}</Text>
      </View>
      <View style={{position: 'absolute', right: 41, top: windowHeight(14)}}>
        { props.icon === 'info' ?
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Info', {propsTheme: props.theme})
            }}
          >
            <InfoSvg
              stroke={'white'}
              strokeWidth={1.5}
              height={41}
              width={41}
            />
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => {
              props.onXButtonPress()
            }}
          >
            <XCircleSvg
              stroke={'white'}
              strokeWidth={1.5}
              height={41}
              width={41}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  textContainer: {
    flexDirection: 'column',
    position: 'absolute',
    marginHorizontal: windowWidth(13.1),
    marginTop: windowHeight(18)
  }
});

export default TopCloud;
