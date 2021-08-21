import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CloudSvg from '../../assets/svg/Cloud.svg';

const Cloud = (props) => {
  return (
    <View style={styles.container}>
      <CloudSvg
        width='100%'
      />
      <View style={styles.textContainer}>
        <Text style={styles.[props.textStyle]}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 60
  },
  textContainer: {
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingTop: 5,
  },
  textRegularWhite: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontSize: 22,
    textAlign: 'center'
  },
  textBigWhite: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontSize: 36,
    textAlign: 'center'
  }
});

export default Cloud;
