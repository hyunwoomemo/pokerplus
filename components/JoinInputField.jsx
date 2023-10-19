import React, { useRef } from 'react'
import styled from 'styled-components/native'

const mergeRefs = (...refs) => {
  return (node) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  }
}

const ErrorText = styled.Text`
  font-size: 12px;
  color: red;
  padding-top: 5px;
  padding-right: 20px;
`

const JoinInputField = ({ label, require, check, touched, error, value, ...props }, ref) => {
  
const innerRef = useRef(null);

const handlePressInput = () => {
  innerRef.current?.focus();
};

  const Container = styled.View``
  const LabelWrapper = styled.View`
    flex-direction: row;
  `
  const Label = styled.Text``
  const Require = styled.Text``
  const InputWrapper = styled.Pressable``
  const Input = styled.TextInput``
  const CheckBtn = styled.TouchableOpacity``
  const CheckText= styled.Text``

  return (
    <Container>
      <LabelWrapper>
        <Label>{label}</Label>
        {require && <Require> (필수)</Require>}
      </LabelWrapper>
      <InputWrapper onPress={handlePressInput}>
        <Input ref={mergeRefs(innerRef, ref)} {...props} />
        {error && value.length > 0 && <ErrorText>{error}</ErrorText>}
        {check && <CheckBtn><CheckText>중복 확인</CheckText></CheckBtn>}
      </InputWrapper>
    </Container>
  )
}

export default JoinInputField