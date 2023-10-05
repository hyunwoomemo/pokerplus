import React from 'react'
import styled from 'styled-components/native'
import BackBtn from './BackBtn'

const ScreenLayout = ({back,children}) => {
  const Container = styled.View`
    padding: 20px;
    flex: 1
  `


  return (
    <Container>
      {back && <BackBtn />}
      {children}
    </Container>
  )
}

export default ScreenLayout