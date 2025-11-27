import Toast from "react-native-toast-message";

interface Props {
  type: string;
  text1: string;
  text2: string;
}

export function showToast(props: Props) {
  Toast.show({
    type: props.type,
    text1: props.text1,
    text2: props.text2,
    topOffset: 60,
    visibilityTime: 2000,
  });
}
