import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tab";
import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, LayoutAnimation, Platform, Text, TouchableOpacity, View } from "react-native";
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components/native";
import { toggleAnimation } from "../animations/toggleAnimation";
import Profile from "../screens/Profile";
import { useRecoilState, useRecoilValue } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Notice from "../screens/Notice";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { authApi } from "../api";
import { SimpleLineIcons } from "@expo/vector-icons";
import { getStorage, removeStorage } from "../utils/asyncStorage";
import { ActiveDrawer, InNavContext } from "../context";
import { opacityAnimation } from "../animations/opacityAnimation";
import { OneSignal } from "react-native-onesignal";
import { useQuery } from "@tanstack/react-query";
import { authState } from "../recoil/auth/atom";
import FastImage from "react-native-fast-image";

const Drawer = createDrawerNavigator();

const DrawerContainer = styled.View`
  margin: ${(props) => (props.ios ? "40px 0 10px 0" : "0")};
  padding: 20px;
  gap: 15px;
  flex: 1;
`;

const WrapperTitle = styled.Text`
  font-size: 24px;
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
  font-size: 20px;
  font-weight: bold;
`;
const MyTicketText = styled.Text`
  color: hotpink;
  font-size: 16px;
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
        <Text style={active === name ? { fontSize: 18, color: "#ff3183" } : { fontSize: 18, color: "#000" }}>{content}</Text>
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

const SignOutText = styled.Text`
  font-size: 16px;
`;

const DrawerContent = (active) => {
  const [user, setUser] = useRecoilState(authState);
  const { data: userData, isLoading, isError } = useQuery(["user"], authApi.info);

  const { myTicketCount, setMyTicketCount } = useContext(InNavContext);

  const navigation = useNavigation();

  const handleSignout = async () => {
    try {
      await authApi.logout();
      OneSignal.logout();
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
        <ProfileWrapper
          onPress={() => navigation.navigate("ProfileNav", { screen: "Profile" })}
          style={{ width: 70, height: 70, borderRadius: 70 / 2, backgroundColor: "rgba(0,0,0,0.2)", opacity: opacity }}
        >
          {userData?.DATA.user_profile_url && (
            <FastImage
              source={{
                uri: userData?.DATA.user_profile_url,
              }}
              onLoadStart={() => opacityAnimation(opacity, "start")}
              onLoadEnd={() => {
                opacityAnimation(opacity, "reset");
              }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
              }}
              // width={70}
              // height={70}
              // borderRadius={35}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </ProfileWrapper>
        <InfoTextWrapper>
          <NickText>{userData?.DATA?.nick}</NickText>
          <MyTicketText>{userData?.DATA?.ticket_info ? `${userData?.DATA?.ticket_info?.reduce((acc, cur) => acc + cur.ticket_count, 0)}장` : "0장"}</MyTicketText>
        </InfoTextWrapper>
      </InfoSection>
      <AccordionWrapper title="고객센터" data={customer} active={active}></AccordionWrapper>
      <AccordionWrapper title="운영 정책" data={policy} active={active}></AccordionWrapper>
      {/* 추가 아이템 */}
      <DrawerFooter>
        <SignOut onPress={handleSignout}>
          <SimpleLineIcons name="logout" size={20} color="black" />
          <SignOutText>로그아웃</SignOutText>
        </SignOut>
        <Text style={{ color: "gray", fontSize: 14 }}>APP VER 1.0.1</Text>
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
