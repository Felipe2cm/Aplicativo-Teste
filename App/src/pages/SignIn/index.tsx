import React, { useCallback } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data)
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
        keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form onSubmit={handleSignIn}>
            <Input name="email" icon="mail" placeholder="E-mail" keyboardType="email-address" />

            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => { }}>Entrar</Button>
            </Form>

            <ForgotPassword onPress={() => { }}>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Feather name="log-in" size={24} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn
