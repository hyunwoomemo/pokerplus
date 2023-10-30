import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect } from "react";
import Home from "../screens/Home";
import CustomTabBar from "../components/CustomTabBar";
import InfoCheck from "../screens/profile/InfoCheck";
import InfoEdit from "../screens/profile/InfoEdit";
import ProfileNav from "./ProfileNav";
import Championship from "../screens/Championship";
import Pub from "../screens/Pub";
import Qna from "../screens/qna/Qna";
import NoticeNav from "./NoticeNav";
import QnaNav from "./QnaNav";
import PolicyNav from "./PolicyNav";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ActiveDrawer } from "../context";
import TicketNav from "./TicketNav";
import QrNav from "./QrNav";
import PushSetting from "../screens/policy/PushSetting";
import Faq from "../screens/faq/Faq";
import PushList from "../screens/push/PushList";
import Leave from "../screens/auth/Leave";

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
      <Tab.Screen name="PushList" component={PushList} />
      <Tab.Screen name="Leave" component={Leave} />
    </Tab.Navigator>
  );
};

export default Tabs;
