import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationError from '../../utils/getValidationErros';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { useToast } from '../../hooks/toast';

import api from '../../services/apiClient';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: object) => {
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

      await api.post('/user', data);

      addToast({
        type: 'success',
        title: 'Cadastro realizado com sucesso',
        description: 'Você já pode fazer seu logon.'
      });

      history.push('/');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: "error",
        title: 'Erro',
        description: 'Erro ao realizar o cadastro.',
      });
    }
  }, [history, addToast]);


  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit} >
            <h1>Faça seu Cadatro</h1>

            <Input autoComplete="off" name="name" icon={FiUser} placeholder="Nome" />
            <Input autoComplete="off" name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
}


export default SignUp;
