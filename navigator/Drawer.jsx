import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tab";
import { useContext, useRef, useState } from "react";
import { Animated, Dimensions, Image, LayoutAnimation, Platform, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { toggleAnimation } from "../animations/toggleAnimation";
import { useRecoilState } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";
import { authApi, pushApi } from "../api";
import { SimpleLineIcons } from "@expo/vector-icons";
import { removeStorage } from "../utils/asyncStorage";
import { ActiveDrawer, InNavContext } from "../context";
import { opacityAnimation } from "../animations/opacityAnimation";
import { OneSignal } from "react-native-onesignal";
import { useQuery } from "@tanstack/react-query";
import { authState } from "../recoil/auth/atom";
import { imageCache } from "../recoil/imageCache/atom";
import FastImage from "react-native-fast-image";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const { width } = Dimensions.get("window");

const DrawerContainer = styled.View`
  margin: ${(props) => (props.ios ? "40px 0 10px 0" : "0")};
  padding: 20px;
  gap: 15px;
  flex: 1;
  background-color: #ecf2f0;
`;
``;

const WrapperTitle = styled.Text`
  font-size: 20px;
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
  font-size: 12px;
  font-weight: bold;
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
        <View style={{ paddingVertical: 10, gap: 10 }}>
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
        <Text style={active === name ? { fontSize: 16, color: "#ff3163" } : { fontSize: 16, color: "#000" }}>{content}</Text>
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

const policy = [
  { content: "약관 및 정책", name: "PolicyNav" },
  { content: "푸시 알림 설정", name: "PushSetting" },
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

const SignOutText = styled.Text`
  font-size: 16px;
`;

const DrawerContent = (active, unread) => {
  const [user, setUser] = useRecoilState(authState);
  const { data: unReadData } = useQuery(["pushUnRead"], pushApi.unReadCheck);

  console.log(unReadData); /*  */

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(["user"], authApi.info, {
    cacheTime: 0,
  });
  const [cache, setCache] = useRecoilState(imageCache);

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
      <InfoSection style={{ alignItems: "center" }}>
        <ProfileWrapper
          onPress={() => navigation.navigate("ProfileNav", { screen: "Profile" })}
          style={{ width: 70, height: 70, borderRadius: 70 / 2, backgroundColor: "rgba(0,0,0,0.2)", opacity: opacity }}
        >
          {userData?.DATA?.user_profile_url && (
            <FastImage
              source={{
                uri: `${userData?.DATA?.user_profile_url}`,
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
              width={70}
              height={70}
              borderRadius={35}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </ProfileWrapper>
        <InfoTextWrapper>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileNav", { screen: "Profile" })}>
            <NickText>{userData?.DATA?.nick}</NickText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("TicketNav")} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            {/* <MaterialCommunityIcons /> */}
            <FastImage source={{ uri: "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }} style={{ width: 15, height: 15 }} resizeMode="contain" tintColor="black" />
            <MyTicketText>나의 참가권: {userData?.DATA?.ticket_info ? `${userData?.DATA?.ticket_info?.reduce((acc, cur) => acc + cur.ticket_count, 0)}장` : "0장"}</MyTicketText>
          </TouchableOpacity>
        </InfoTextWrapper>
        <TouchableOpacity onPress={() => navigation.navigate("PushList")} style={{ marginLeft: "auto" }}>
          {unReadData?.DATA?.count > 0 ? <View style={{ position: "absolute", right: -2, top: -2, borderRadius: 4, width: 7, height: 7, backgroundColor: "#ff3183" }}></View> : null}
          <Ionicons name="ios-notifications-outline" size={28} color="black" />
        </TouchableOpacity>
      </InfoSection>
      <AccordionWrapper title="고객센터" data={customer} active={active}></AccordionWrapper>
      <AccordionWrapper title="앱 설정" data={policy} active={active}></AccordionWrapper>
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
  const [unread, setUnread] = useState(false);

  const value = { active, setActive, unread, setUnread };

  return (
    <ActiveDrawer.Provider value={value}>
      <Drawer.Navigator
        drawerContent={() => DrawerContent(active, unread)}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: width * 0.8,
            backgroundColor: "#ecf2f0",
          },
        }}
      >
        <Drawer.Screen name="Tabs" component={Tabs} options={{}} />
      </Drawer.Navigator>
    </ActiveDrawer.Provider>
  );
}
