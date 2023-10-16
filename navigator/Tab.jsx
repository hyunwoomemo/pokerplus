import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Ticket from "../screens/Ticket";
import { useColorScheme } from "react-native";
import Profile from "../screens/Profile";
import Notice from "../screens/Notice";
import CustomTabBar from "../components/CustomTabBar";
import InfoCheck from "../screens/auth/InfoCheck";
import InfoEdit from "../screens/auth/InfoEdit";
import ProfProfileNavile from "./ProfileNav";
import ProfileNav from "./ProfileNav";
import Championship from "../screens/Championship";
import Pub from "../screens/Pub";
import Faq from "../screens/Faq";
import Qna from "../screens/Qna";
import QnaList from "../screens/QnaList";
import NoticeDetail from "../screens/NoticeDetail";
import NoticeNav from "./NoticeNav";
import QnaNav from "./QnaNav";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{}}
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "pink",
        tabBarShowLabel: false,
      }}
      tabBar={(props) => {
        return <CustomTabBar {...props} />;
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="home-outline" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen name="Ticket" component={Ticket} />
      <Tab.Screen name="Championship" component={Championship} />
      <Tab.Screen name="Pub" component={Pub} />
      <Tab.Screen name="NoticeNav" component={NoticeNav} />
      <Tab.Screen name="ProfileNav" component={ProfileNav} />
      <Tab.Screen name="InfoCheck" component={InfoCheck} />
      <Tab.Screen name="InfoEdit" component={InfoEdit} />
      <Tab.Screen name="FAQ" component={Faq} />
      <Tab.Screen name="Qna" component={Qna} />
      <Tab.Screen name="QnaNav" component={QnaNav} />
      {/* <Tab.Screen name="NoticeDetail" component={NoticeDetail} /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
