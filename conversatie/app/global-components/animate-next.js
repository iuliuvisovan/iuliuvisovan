import { LayoutAnimation } from 'react-native'

export default (useOpacity) => {
  LayoutAnimation.configureNext(useOpacity
    ? LayoutAnimation.Presets.easeInEaseOut
    : {
      duration: 50,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY
      }
    });
}
