import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyDrawer } from "./Drawer";
import { InNavContext } from "../context";
import { useQueryClient } from "@tanstack/react-query";
import { resourceApi } from "../api";

const Nav = createNativeStackNavigator();

const InNav = () => {
  const [myTicketCount, setMyTicketCount] = useState(0);
  const values = {
    myTicketCount,
    setMyTicketCount,
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(["poster"], resourceApi.posters);
  }, [queryClient]);

  return (
    <InNavContext.Provider value={values}>
      <Nav.Navigator
        screenOptions={{
          headerTintColor: "white",
        }}
      >
        <Nav.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
      </Nav.Navigator>
    </InNavContext.Provider>
  );
};

export default InNav;
