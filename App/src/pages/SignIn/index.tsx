import React, { useCallback, useRef } from 'react';
import { Image, View, ScrollView, TextInput, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
  FormSign
} from './styles';

import logoImg from '../../assets/logo.png';
import getValidationError from '../../utils/getValidationErros';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      email: Yup.string().trim().required('Email obrigatório.').email('Digite um email válido.'),
      password: Yup.string().required('Senha obrigatória.')
    });

    try {

        await schema.validate(data, {
            abortEarly: false,
        });

        // signIn({
        //     email: data.email,
        //     password: data.password
        // });
    } catch (err) {
        const error: Yup.ValidationError = JSON.parse(JSON.stringify(err));

        const errors = getValidationError(err);

        formRef.current?.setErrors(errors);
    }
}, []);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logoImg} />

          <View>
            <Title>Faça seu logon</Title>
          </View>

          <FormSign
          style={{ width: '100%' }}
          ref={formRef}
          onSubmit={handleSignIn}
          >

            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
              textContentType="password"
            />

            <Button onPress={() => {
              formRef.current?.submitForm();
            }}>Entrar</Button>

            </FormSign>

          <ForgotPassword onPress={() => { }}>
            <ForgotPasswordText>
              Esqueci minha senha
            </ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Feather name="log-in" size={24} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn
