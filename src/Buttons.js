/**
 * react-native-swiper
 * @author leecade<leecade@163.com>
 */
import React, { memo, useMemo } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  I18nManager
} from 'react-native'

export const Buttons = memo(
  ({
    width,
    height,
    buttonWrapperStyle,
    loop,
    index,
    prevButton,
    scrollBy,
    total,
    nextButton,
    disableNextButton
  }) => {
    const style_container = useMemo(
      () => [
        styles.buttonWrapper,
        {
          width,
          height
        },
        buttonWrapperStyle
      ],
      [buttonWrapperStyle, width, height]
    )
    return (
      <View pointerEvents="box-none" style={style_container}>
        <PrevButton
          loop={loop}
          index={index}
          prevButton={prevButton}
          scrollBy={scrollBy}
        />
        <NextButton
          loop={loop}
          index={index}
          total={total}
          nextButton={nextButton}
          scrollBy={scrollBy}
          disableNextButton={disableNextButton}
        />
      </View>
    )
  }
)

const NextButton = ({
  loop,
  index,
  total,
  nextButton,
  scrollBy,
  disableNextButton
}) => {
  let button = null

  if (loop || index !== total - 1) {
    button = nextButton || (
      <Text style={styles.buttonText}>
        {Platform.OS !== 'android' && I18nManager.isRTL ? '‹' : '›'}
      </Text>
    )
  }

  return (
    <TouchableOpacity
      onPress={() => button !== null && scrollBy(1)}
      disabled={disableNextButton}
    >
      <View>{button}</View>
    </TouchableOpacity>
  )
}

const PrevButton = ({ loop, index, prevButton, scrollBy }) => {
  let button = null

  if (loop || index !== 0) {
    button = prevButton || (
      <Text style={styles.buttonText}>
        {Platform.OS !== 'android' && I18nManager.isRTL !== 'android'
          ? '›'
          : '‹'}
      </Text>
    )
  }

  return (
    <TouchableOpacity onPress={() => button !== null && scrollBy(-1)}>
      <View>{button}</View>
    </TouchableOpacity>
  )
}

/**
 * Default styles
 * @type {StyleSheetPropType}
 */
const styles = {
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      android: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
      }
    })
  },

  buttonText: {
    fontSize: 50,
    color: '#007aff',
    fontFamily: 'Arial'
  }
}
