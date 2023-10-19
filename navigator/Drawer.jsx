import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tab";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, LayoutAnimation, Platform, Text, TouchableOpacity, View } from "react-native";
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from "@react-navigation/native";
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
import { getStorage, removeStorage } from "../utils/asyncStorage";
import { ActiveDrawer } from "../context";
import { opacityAnimation } from "../animations/opacityAnimation";

const Drawer = createDrawerNavigator();

const DrawerContainer = styled.View`
  margin: ${(props) => (props.ios ? "40px 0 10px 0" : "0")};
  padding: 20px;
  gap: 15px;
  flex: 1;
  background-color: #ebf2f0;
`;

const WrapperTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ItemWrapper = styled(Animated.createAnimatedComponent(View))`
  margin: 5px;
`;

const InfoSection = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
`;
const ProfileWrapper = styled(Animated.createAnimatedComponent(TouchableOpacity))`
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

const AccordionWrapper = ({ title, children, data, active }) => {
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

  const rotate = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

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
      {isOpen && (
        <View style={{ paddingVertical: 10 }}>
          {data.map((_, i) => (
            <AccordionItem key={i} active={active} content={_.content} name={_.name}>
              {_.content}
            </AccordionItem>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const AccordionItem = ({ content, name, active }) => {
  const navigation = useNavigation();

  return (
    <ItemWrapper>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(name);
        }}
      >
        <Text style={active === name ? { color: "#ff3183" } : { color: "#000" }}>{content}</Text>
      </TouchableOpacity>
    </ItemWrapper>
  );
};

const customer = [
  { content: "공지사항", name: "NoticeNav" },
  { content: "FAQ", name: "FAQ" },
  { content: "1:1 문의하기", name: "Qna" },
  { content: "1:1 문의내역", name: "QnaNav" },
];

const policy = [{ content: "약관 및 정책", name: "PolicyNav" }];

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

const DrawerContent = (active) => {
  const [user, setUser] = useRecoilState(authState);
  const [ticketCount, setTicketCount] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const count = user.ticket_info?.reduce((acc, cur) => acc + cur.ticket_count, 0);
    setTicketCount(count);
  }, []);

  const handleSignout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error(err);
    } finally {
      removeStorage("user");
      removeStorage("token");
      setUser({});
    }
  };

  const opacity = useRef(new Animated.Value(1)).current;

  return (
    <DrawerContainer ios={Platform.OS === "ios"}>
      <InfoSection>
        {/* <Text>{user.nick}</Text> */}
        <ProfileWrapper
          onPress={() => navigation.navigate("ProfileNav", { screen: "Profile" })}
          style={{ width: 70, height: 70, borderRadius: 70 / 2, backgroundColor: "rgba(0,0,0,0.2)", opacity: opacity }}
        >
          {user.user_profile_url && (
            <Image
              source={{ uri: user.user_profile_url }}
              onLoadStart={() => opacityAnimation(opacity, "start")}
              onLoadEnd={() => {
                opacityAnimation(opacity, "reset");
              }}
              width={70}
              height={70}
              borderRadius={70 / 2}
              resizeMode="cover"
            />
          )}
        </ProfileWrapper>
        <InfoTextWrapper>
          <NickText>{user.nick}</NickText>
          <MyTicketText>{ticketCount ? `${ticketCount}장` : "0장"}</MyTicketText>
        </InfoTextWrapper>
      </InfoSection>
      <AccordionWrapper title="고객센터" data={customer} active={active}></AccordionWrapper>
      <AccordionWrapper title="운영 정책" data={policy} active={active}></AccordionWrapper>
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
  const [active, setActive] = useState();

  const value = { active, setActive };

  return (
    <ActiveDrawer.Provider value={value}>
      <Drawer.Navigator
        drawerContent={() => DrawerContent(active)}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Tabs" component={Tabs} options={{}} />
      </Drawer.Navigator>
    </ActiveDrawer.Provider>
  );
}
