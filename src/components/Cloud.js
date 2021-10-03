import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CloudSvg from '../../assets/svg/Cloud.svg';
import rryStyles from '../../assets/styles/rryStyles';
import rryColors from '../../assets/styles/rryColors';

const Cloud = (props) => {
  return (
    <View style={[styles.container, {marginVertical: props.marginVertical}]}>
      <CloudSvg
        width={'90%'}
        height={'90%'}
      />
      <View style={styles.textContainer}>
        <Text style={[rryStyles.[props.textStyle], {color: rryColors.white}]}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    paddingTop: 5
  }
});

export default Cloud;
