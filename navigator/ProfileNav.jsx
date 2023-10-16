import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../screens/Profile";
import InfoCheck from "../screens/auth/InfoCheck";
import InfoEdit from "../screens/auth/InfoEdit";
import Alliance from "../screens/Alliance";
import SearchPostcode from "../screens/SearchPostcode";

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
