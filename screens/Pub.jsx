import React, { useCallback } from "react";
import { Text, View } from "react-native";
import Layout from "../components/Layout";
import { Appbar } from "react-native-paper";
import AppBar from "../components/AppBar";
import { Button, Dialog, Portal } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const Pub = ({ navigation }) => {
  const [visible, setVisible] = React.useState(true);

  useFocusEffect(
    useCallback(() => {
      setVisible(true);
    }, [])
  );

  const hideDialog = () => {
    navigation.goBack();
    setVisible(false);
  };
  return (
    // <Layout>
    <View style={{ flex: 1, backgroundColor: "#ecf2f0" }}>
      <AppBar title="Pub" />
      {/* <Button onPress={showDialog}>Show Dialog</Button> */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>안내</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">준비 중입니다.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
    // </Layout>
  );
};

export default Pub;
