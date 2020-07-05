import React, {useRef, useCallback} from 'react';
import { KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Logo,
  Title,
  BackToLogin,
  BackToLoginTitle,
} from './styles';

interface FormData {
   name:string;
   email: string;
   password: string;
 }

const Register: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
   async (data: FormData) => {
     try {
       formRef.current?.setErrors({});
       const schema = Yup.object().shape({
         name: Yup.string().required('Nome obrigatório'),
         email: Yup.string()
           .email('Digite uma email válido')
           .required('Email obrigatório'),
         password: Yup.string().required('Senha obrigatória').min(6),
       });

       await schema.validate(data, {
         abortEarly: false,
       });

      await api.post('/users', data);

      Alert.alert('Cadastro realizado com sucesso',
      'Agora você já pode fazer seu login'
      );

      navigation.goBack()
     } catch (err) {
       if (err instanceof Yup.ValidationError) {
         const errors = getValidationErrors(err);
         formRef.current?.setErrors(errors);
         return;
       }
       Alert.alert('Erro no cadastro',
       'Ocorreu um erro cadastrar, cheque seus dados'
       )
     }
   },
   []
 );

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView contentContainerStyle={{flex:1}}
          keyboardShouldPersistTaps="handled"
        >
        <Container>
          <Logo source={require('../../assets/logo.png')} />
          <View>
            <Title>Faça seu cadastro</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit} style={{width: '100%'}}>
            <Input name="name" icon="user"
               placeholder="Nome"
               autoCapitalize="words"
               returnKeyType="next"
               onSubmitEditing={() => {
                  emailRef.current.focus()
               }}
            />

            <Input name="email" icon="mail"
               ref={emailRef}
               placeholder="Email"
               keyboardType="email-address"
               returnKeyType="next"
               autoCorrect={false}
               autoCapitalize="none"
               onSubmitEditing={() => {
                  passwordRef.current.focus()
               }}
            />

            <Input name="password" icon="lock"
               ref={passwordRef}
               placeholder="Senha"
               secureTextEntry={true}
               textContentType="newPassword"
               returnKeyType="send"
               onSubmitEditing={() => {
                  formRef.current?.submitForm();
              }}
            />

            <Button onPress={() => {
                  formRef.current?.submitForm();
              }}>
                Cadastrar
            </Button>

          </Form>
        </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogin onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToLoginTitle>Voltar para o login</BackToLoginTitle>
      </BackToLogin>
    </>
  );
};

export default Register;
