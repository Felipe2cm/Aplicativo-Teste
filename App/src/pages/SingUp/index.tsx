import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
 } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native'

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
  FormSign
} from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback((data: object) => {
    console.log(data);
  }, []);

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

            <FormSign ref={formRef} onSubmit={handleSignUp}>

            <Input
            name="name"
            autoCapitalize="words"
            icon="user"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
            ref={emailInputRef}
            name="email"
            icon="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus() }
            />

            <Input
            ref={passwordInputRef}
            name="password"
            icon="lock"
            placeholder="Senha"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
            textContentType="newPassword"
            />

            <Button onPress={() => {
              formRef.current?.submitForm();
             }}>Entrar</Button>
            </FormSign>

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
