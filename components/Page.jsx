import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import {Dimensions} from 'react-native'


const PageItem = styled.View`
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-top: 30px;
`;

const PageNum = styled.Text``;
const PosterImg = styled.Image`
flex: 1;
width: 80%;
height: 80%;
overflow: hidden;
`;

const PosterWrapper = styled.TouchableHighlight`
flex: 1;
justify-content: center;
align-items: center;
`


export default function Page({ item, style }) {
  const {width, height} = Dimensions.get('window')
  return (
    <PageItem color={item.color} style={style}>
      <PosterWrapper style={{width: width, height: height, }}>
        <PosterImg source={{ uri: item.poster_url }} resizeMode={"contain"} style={{ borderRadius: width / 15 }} />
      </PosterWrapper>
      {/* <PageNum>{item.poster_url}</PageNum> */}
    </PageItem>
  );
}
