import { StyleSheet } from 'react-native';
import rryColors from './rryColors';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from 'react-native';

const windowHeight = (dividability) => {
  return Dimensions.get('screen').height / dividability
}
const windowWidth = (dividability) => {
  return Dimensions.get('screen').width / dividability
}


export default StyleSheet.create({

  // --- Text Styles ---

  textTitle: {
    color: rryColors.white,
    fontFamily: 'Lato-BoldItalic',
    fontSize: RFValue(60, 750),
    paddingBottom: windowHeight(75)
  },
  textSubtitle: {
    color: rryColors.white,
    fontFamily: 'Lato-Italic',
    fontSize: RFValue(30, 750),
    textAlign: 'left',
    paddingTop: windowHeight(100)
  },
  textSubtitle1: {
    color: rryColors.white,
    fontFamily: 'Lato-Italic',
    fontSize: RFValue(35, 750),
    textAlign: 'left',
    paddingTop: windowHeight(75)
  },
  textBig: {
    fontFamily: 'Lato-Regular',
    fontSize: RFValue(32, 750),
    textAlign: 'center',
    color: rryColors.primary
  },
  textRegular: {
    fontFamily: 'Lato-Regular',
    fontSize: RFValue(22, 750),
    textAlign: 'center',
    color: rryColors.primary
  },
  textSmall: {
    fontFamily: 'Lato-Regular',
    fontSize: RFValue(16, 750),
    textAlign: 'center',
    color: rryColors.primary
  },

  // --- View Styles ---

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: windowWidth(10)
  }

})
