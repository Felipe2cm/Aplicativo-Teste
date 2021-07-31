import styled from 'styled-components/native';
import { Platform } from 'react-native';


export const Container = styled.View`
  flex: 1;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${ Platform.OS === 'android' ? 100 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  margin: 64px 0px 24px;
  font-family: 'RobotoSlab_500Medium';
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab_500Medium';
`;

export const BackToSignInButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSignInButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab_500Medium';
  margin-left: 16px;
`;
