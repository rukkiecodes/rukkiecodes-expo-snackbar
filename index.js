import { useFonts } from 'expo-font'
import React, { useEffect, useRef } from 'react'
import { View, Text, Dimensions, Animated } from 'react-native'

const { width } = Dimensions.get('window')

const SnackBar = ({ visible, title, message, background, textColor, shadowColor }) => {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const x = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ])

    if (visible) x.start()
    else x.stop()
  }, [visible])

  const [loaded] = useFonts({
    text: require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Medium.ttf'),
    boldText: require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Bold.ttf'),
  })

  if (!loaded) return null

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-30, 0]
            })
          }
        ],
        position: 'absolute',
        zIndex: 100,
        top: 30,
        width: width - 20,
        minHeight: 60,
        backgroundColor: background || '#fff',
        alignSelf: 'center',
        borderRadius: 12,
        shadowColor: shadowColor || '#000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <View>
        {
          title &&
          <Text
            style={{
              fontFamily: 'boldText',
              color: textColor
            }}
          >
            {message || 'Title'}
          </Text>
        }
        <Text
          style={{
            fontFamily: 'text',
            color: textColor
          }}
        >
          {message || 'Message'}
        </Text>
      </View>
    </Animated.View>
  )
}

export default SnackBar