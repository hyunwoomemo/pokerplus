import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tab";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { toggleAnimation } from "../animations/toggleAnimation";
import Profile from "../screens/Profile";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../recoil/auth/atom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Notice from "../screens/Notice";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { authApi } from "../api";
import { SimpleLineIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerContainer = styled.View`
  margin-top: 30px;
  padding: 20px;
  gap: 15px;
  flex: 1;
`;

const WrapperTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ItemWrapper = styled(Animated.createAnimatedComponent(View))`
  margin-top: 5px;
  margin-left: 10px;
`;

const InfoSection = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
`;
const ProfileWrapper = styled.TouchableOpacity`
  background-color: gray;
  justify-content: center;
  align-items: center;
`;
const InfoTextWrapper = styled.View`
  padding: 10px;
  gap: 10px;
  justify-content: center;
`;
const NickText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const MyTicketText = styled.Text`
  color: hotpink;
`;

const AccordionWrapper = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: isOpen ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setIsOpen(!isOpen);
  };

  // console.log(animationController)
  const rotate = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  console.log(rotate);

  return (
    <Animated.View style={{ overflow: "hidden" }}>
      <TouchableOpacity onPress={toggleListItem}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <WrapperTitle>{title}</WrapperTitle>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isOpen &&
        menuData.map((_, i) => (
          <AccordionItem key={i} content={_.content} name={_.name}>
            {_.content}
          </AccordionItem>
        ))}
    </Animated.View>
  );
};

const AccordionItem = ({ content, name }) => {
  const navigation = useNavigation();
  return (
    <ItemWrapper>
      <TouchableOpacity onPress={() => navigation.navigate(name)}>
        <Text>{content}</Text>
      </TouchableOpacity>
    </ItemWrapper>
  );
};

const menuData = [
  { content: "공지사항", name: "Notice" },
  { content: "2", name: "2" },
  { content: "3", name: "3" },
  { content: "4", name: "4" },
];

const DrawerFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const SignOut = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const SignOutText = styled.Text``;

const DrawerContent = ({ navigation: { navigate } }) => {
  const [user, setUser] = useState();
  const getUser = async () => {
    const data = await AsyncStorage.getItem("user");
    setUser(JSON.parse(data));
  };

  useEffect(() => {
    getUser();
  }, []);

  const navigation = useNavigation();
  const [auth, setAuth] = useRecoilState(authState);

  const handleSignout = async () => {
    try {
      await authApi.logout();
      await AsyncStorage.clear();
      setAuth({})
      // navigation.navigate("OutNav");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DrawerContainer>
      <InfoSection>
        <ProfileWrapper onPress={() => navigate("Profile")} style={{ width: 70, height: 70, borderRadius: 70 / 2 }}>
          {user?.user_profile_url && <Image source={{ uri: user?.user_profile_url }} width={70} height={70} borderRadius={70 / 2} resizeMode="cover" />}
        </ProfileWrapper>
        <InfoTextWrapper>
          <NickText>{user?.nick}</NickText>
          <MyTicketText>3장</MyTicketText>
        </InfoTextWrapper>
      </InfoSection>
      <AccordionWrapper title="고객센터" data={menuData}></AccordionWrapper>
      <AccordionWrapper title="운영 정책" data={menuData}></AccordionWrapper>
      {/* 추가 아이템 */}
      <DrawerFooter>
        <SignOut onPress={handleSignout}>
          {/* <FontAwesome name="sign-out" size={24} color="black" /> */}
          <SimpleLineIcons name="logout" size={20} color="black" />
          <SignOutText>로그아웃</SignOutText>
        </SignOut>
        <Text style={{ color: "gray" }}>APP VER 1.0.1</Text>
      </DrawerFooter>
    </DrawerContainer>
  );
};
export function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
}
