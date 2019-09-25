/**
 * react-native-swiper
 * @author leecade<leecade@163.com>
 */
import React, { forwardRef, memo, useMemo } from 'react'
import { ScrollView, Platform, I18nManager } from 'react-native'
import ViewPagerAndroid from '@react-native-community/viewpager'

export const SwiperScrollView = memo(
  forwardRef(
    (
      {
        children,
        style,
        index,
        onMomentumScrollEnd,
        onScrollBeginDrag,
        ...props
      },
      forwardedRef
    ) => {
      if (Platform.OS === 'ios') {
        const flatStyle = useMemo(() => [styles.wrapperIOS, style], [style])
        return (
          <ScrollView
            ref={forwardedRef}
            {...props}
            contentContainerStyle={flatStyle}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollBeginDrag={onScrollBeginDrag}
          >
            {children}
          </ScrollView>
        )
      }
      const flatStyle = useMemo(() => [styles.wrapperAndroid, style], [style])
      return (
        <ViewPagerAndroid
          ref={forwardedRef}
          {...props}
          initialPage={props.loop ? index + 1 : index}
          onPageSelected={onMomentumScrollEnd}
          key={children.length}
          style={flatStyle}
        >
          {I18nManager.isRTL ? children.reverse() : children}
        </ViewPagerAndroid>
      )
    }
  )
)

const styles = {
  wrapperIOS: {
    backgroundColor: 'transparent'
  },
  wrapperAndroid: {
    backgroundColor: 'transparent',
    flex: 1
  }
}
