import React, { useRef } from "react";
import { Dimensions, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";

const ModalComponent = ({ children, visible, hideModal, size }) => {
  const { height } = Dimensions.get("window");

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    // minHeight: height * 0.5,
    borderRadius: 30,
  };
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        {children}
      </Modal>
    </Portal>
  );
};

export default ModalComponent;
