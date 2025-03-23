import { Platform } from 'react-native';
import Toast, { ToastType } from 'react-native-toast-message';

export const toast = (title: string, msg: string, type?: ToastType) => {
  return Toast.show({
    type: type || 'success',
    swipeable: true,
    text1: title,
    text1Style: { fontFamily: 'AtkinsonHyperlegible', fontSize: 16 },
    text2: msg,
    text2Style: { fontFamily: 'AtkinsonHyperlegible', fontSize: 14 },
    topOffset: Platform.select({
      android: 60,
      default: 40,
    }),
  });
};
