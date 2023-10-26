import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect } from "react";
import Home from "../screens/Home";
import CustomTabBar from "../components/CustomTabBar";
import InfoCheck from "../screens/auth/InfoCheck";
import InfoEdit from "../screens/auth/InfoEdit";
import ProfileNav from "./ProfileNav";
import Championship from "../screens/Championship";
import Pub from "../screens/Pub";
import Faq from "../screens/Faq";
import Qna from "../screens/Qna";
import NoticeNav from "./NoticeNav";
import QnaNav from "./QnaNav";
import PolicyNav from "./PolicyNav";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ActiveDrawer } from "../context";
import TicketNav from "./TicketNav";
import QrCreate from "../screens/qr/QrCreate";
import QrScan from "../screens/qr/QrScan";
import { Button, Text } from "react-native";
import QrNav from "./QrNav";
import PushSetting from "../screens/PushSetting";

const Tab = createBottomTabNavigator();

const Tabs = ({ route }) => {
  const { active, setActive } = useContext(ActiveDrawer);

  useEffect(() => {
    setActive(getFocusedRouteNameFromRoute(route));
  }, [getFocusedRouteNameFromRoute(route)]);

  return (
    <Tab.Navigator
      sceneContainerStyle={{}}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "#ecf2f0",
        },
      }}
      tabBar={(props) => {
        return <CustomTabBar {...props} />;
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="TicketNav" component={TicketNav} />
      <Tab.Screen name="Championship" component={Championship} />
      <Tab.Screen name="Pub" component={Pub} />
      <Tab.Screen name="NoticeNav" component={NoticeNav} />
      <Tab.Screen name="ProfileNav" component={ProfileNav} />
      <Tab.Screen name="InfoCheck" component={InfoCheck} />
      <Tab.Screen name="InfoEdit" component={InfoEdit} />
      <Tab.Screen name="FAQ" component={Faq} />
      <Tab.Screen name="QnaNav" component={QnaNav} />
      <Tab.Screen name="Qna" component={Qna} />
      <Tab.Screen name="PolicyNav" component={PolicyNav} />
      <Tab.Screen name="QrNav" component={QrNav} />
      <Tab.Screen name="PushSetting" component={PushSetting} />
    </Tab.Navigator>
  );
};

export default Tabs;
