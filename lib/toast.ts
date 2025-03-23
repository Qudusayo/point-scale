import Toast, { ToastType } from "react-native-toast-message";

export const toast = (
  title: string,
  msg: string,
  type?: ToastType,
) => {
  return Toast.show({
    type: type || "success",
    swipeable: true,
    text1: title,
    text1Style: { fontFamily: "AtkinsonHyperlegible" },
    text2: msg,
    text2Style: { fontFamily: "AtkinsonHyperlegible" },
  });
};
