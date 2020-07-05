import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
   Alert, KeyboardAvoidingView,
   Platform,
   ScrollView,
   TextInput, View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import {
   Container,
   CreateAccount,
   CreateAccountTitle, ForgotPassword,
   ForgotPasswordTitle, Logo,
   Title
} from './styles';
import { useAuth } from '../../context/AuthContext';

interface FormData {
   email: string;
   password: string;
 }

const Login: React.FC = () => {
   const navigation = useNavigation();
   const formRef = useRef<FormHandles>(null);
   const passwordRef = useRef<TextInput>(null);
   const {signIn, user} = useAuth();

   const handleSubmit = useCallback(
      async (data: FormData) => {
        try {
          formRef.current?.setErrors({});
          const schema = Yup.object().shape({
            email: Yup.string()
              .email('Digite uma email válido')
              .required('Email obrigatório'),
            password: Yup.string().required('Senha obrigatória'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

         await signIn({
             email: data.email,
             password: data.password,
         });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
            return;
          }

          Alert.alert('Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque seus dados'
          )
        }
      },
      [signIn]
    );

   return (
      <>
         <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
            enabled
         >
            <ScrollView
               contentContainerStyle={{ flex: 1 }}
               keyboardShouldPersistTaps="handled"
            >
               <Container>
                  <Logo source={require('../../assets/logo.png')} />
                  <View>
                     <Title>Faça seu Login</Title>
                  </View>
                  <Form
                     ref={formRef}
                     onSubmit={handleSubmit}
                     style={{ width: '100%' }}
                  >
                     <Input
                        name="email"
                        icon="mail"
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                           passwordRef.current.focus();
                        }}
                     />
                     <Input
                        name="password"
                        icon="lock"
                        ref={passwordRef}
                        placeholder="Senha"
                        secureTextEntry={true}
                        returnKeyType="send"
                        onSubmitEditing={() => {
                           formRef.current?.submitForm();
                        }}
                     />

                     <Button
                        onPress={() => {
                           formRef.current?.submitForm();
                        }}
                     >
                        Entrar
                     </Button>
                  </Form>

                  <ForgotPassword>
                     <ForgotPasswordTitle>
                        Esqueci minha senha
                     </ForgotPasswordTitle>
                  </ForgotPassword>
               </Container>
            </ScrollView>
         </KeyboardAvoidingView>

         <CreateAccount onPress={() => navigation.navigate('register')}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountTitle>Criar um conta</CreateAccountTitle>
         </CreateAccount>
      </>
   );
};

export default Login;
