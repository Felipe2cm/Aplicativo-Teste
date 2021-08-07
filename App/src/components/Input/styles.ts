import styled, { css } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;

  ${ (props) => props.isErrored  && css`
    border: red solid 2px;
  `}

  ${ (props) => props.isFocused  && css`
    border: #ff9000 solid 2px;
  `}
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
