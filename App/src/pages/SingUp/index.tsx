import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
 } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import api from '../../services/api';

import getValidationError from '../../utils/getValidationErros';

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

interface SingUpFormdata {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(async (data: SingUpFormdata) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      name: Yup.string().trim().required('Nome obrigatório.'),
      email: Yup.string().trim().required('Email obrigatório.').email('Digite um email válido.'),
      password: Yup.string().min(6, 'No mínimo 6 dígitos.')
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login na aplicação.'
      );

      navigation.goBack();

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        "Erro ao realizar o cadastro.",
        "Ocorreu um erro ao fazer o cadastro, cheque as credenciais."
      );
    }
  }, [navigation]);

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
