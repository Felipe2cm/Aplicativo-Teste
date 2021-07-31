import React from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Dimensions
 } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText
} from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>

   <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
        keyboardShouldPersistTaps='handled'
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="E-mail" keyboardType="email-address" />
            <Input name="email" icon="mail" placeholder="E-mail" keyboardType="email-address" />

            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => { }}>Entrar</Button>

          </Container>
        </ScrollView>
        </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Feather name="log-in" size={24} color="#ff9000" />
        <BackToSignInButtonText>Voltar para o login</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
}

export default SignUp
