import { StyleSheet } from 'react-native';
import rryColors from './rryColors';

export default StyleSheet.create({

  // --- Text Styles ---

  textTitle: {
    color: rryColors.white,
    fontFamily: 'Lato-BoldItalic',
    fontSize: 60,
    paddingBottom: 10
  },
  textSubtitle: {
    color: rryColors.white,
    fontFamily: 'Lato-Italic',
    fontSize: 30,
    textAlign: 'left',
    paddingTop: 10
  },
  textSubtitle1: {
    color: rryColors.white,
    fontFamily: 'Lato-Italic',
    fontSize: 40,
    textAlign: 'left',
    paddingTop: 10
  },
  textBig: {
    fontFamily: 'Lato-Regular',
    fontSize: 32,
    textAlign: 'center',
    color: rryColors.primary
  },
  textRegular: {
    fontFamily: 'Lato-Regular',
    fontSize: 22,
    textAlign: 'center',
    color: rryColors.primary
  },
  textSmall: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: rryColors.primary
  },

  // --- View Styles ---

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  }

})
