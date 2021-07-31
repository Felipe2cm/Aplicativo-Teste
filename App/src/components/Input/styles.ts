import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
`;


export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab_500Medium';
`;

export const Icon = styled(AntDesign)`
  margin-right: 16px;
`;
