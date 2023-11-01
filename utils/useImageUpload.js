import { Alert, LayoutAnimation } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const useImageUpload = async (status, requestPermission, setImageUrl, setFileName) => {
  if (!status?.granted) {
    const permission = await requestPermission();
    if (!permission.granted) return null;
  }

  try {
    // 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (result.canceled) {
      return null;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setImageUrl(result.assets[0].uri);
    if (setFileName) {
      setFileName(result.assets[0].fileName);
    }
  } catch (err) {
    console.error(err);
    Alert.alert("이미지 선택에 실패했습니다. 다시 시도하거나 다른 사진을 선택해주세요 😭");
  }
};
