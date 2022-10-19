import {Pressable, Text, TextInput, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {createStyleBuilder} from 'react-native-zephyr'

export const {makeStyledComponent, styled, styles, useStyles} =
  createStyleBuilder()

export const StyledPressable = makeStyledComponent(Pressable)
export const StyledSafeAreaView = makeStyledComponent(SafeAreaView)
export const StyledText = makeStyledComponent(Text)
export const StyledTextInput = makeStyledComponent(TextInput)
export const StyledView = makeStyledComponent(View)
