import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'
import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'

export const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR, home }) => {
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  const style = home ?
    {
      ...styles.button,
      backgroundColor: color,
      ...styles.buttonHome
    }
    : {
      ...styles.button,
      backgroundColor: color,
    }

  return (
    <Wrapper onPress={onPress} activeOpacity={0.7}>
      <View style={style}>
        <AppTextBold style={styles.text}>{children}</AppTextBold>
      </View>
    </Wrapper >
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonHome: {
    borderRadius: 0,
    paddingVertical: 20,
  },
  text: {
    color: '#fff'
  }
})
