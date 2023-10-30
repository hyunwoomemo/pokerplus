import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../screens/profile/Profile";
import InfoCheck from "../screens/profile/InfoCheck";
import InfoEdit from "../screens/profile/InfoEdit";
import SearchPostcode from "../screens/profile/SearchPostcode";
import Alliance from "../screens/profile/Alliance";

const Nav = createNativeStackNavigator();

const ProfileNav = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Profile"
    >
      <Nav.Screen name="Profile" component={Profile} />
      <Nav.Screen name="InfoCheck" component={InfoCheck} />
      <Nav.Screen name="InfoEdit" component={InfoEdit} />
      <Nav.Screen name="Alliance" component={Alliance} />
      <Nav.Screen
        name="SearchPostcode"
        component={SearchPostcode}
        options={{
          presentation: "modal",
        }}
      />
    </Nav.Navigator>
  );
};

export default ProfileNav;
