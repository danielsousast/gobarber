import React, { useRef, useCallback } from 'react';
import {
   KeyboardAvoidingView,
   Platform,
   View,
   ScrollView,
   TextInput,
   Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
   Container,
   Title,
   UserAvatar,
   UserAvatarButton,
   BackButton,
} from './styles';

interface FormData {
   name: string;
   email: string;
   password: string;
   old_password: string;
   password_confirmation: string;
}

const Profile: React.FC = () => {
   const { user, updateUser } = useAuth();
   const navigation = useNavigation();

   const formRef = useRef<FormHandles>(null);
   const emailRef = useRef<TextInput>(null);
   const passwordRef = useRef<TextInput>(null);
   const oldPasswordRef = useRef<TextInput>(null);
   const confirmPasswordRef = useRef<TextInput>(null);

   const handleSubmit = useCallback(
      async (data: FormData) => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               name: Yup.string().required('Nome obrigatório'),
               email: Yup.string()
                  .email('Digite um e-mail válido')
                  .required('E-mail obrigatório'),
               old_password: Yup.string(),
               password: Yup.string().when('old_password', {
                  is: val => !!val.length,
                  then: Yup.string().required('Campo obrigatório'),
                  otherwise: Yup.string(),
               }),
               password_confirmation: Yup.string()
                  .when('old_password', {
                     is: val => !!val.length,
                     then: Yup.string().required('Campo obrigatório'),
                     otherwise: Yup.string(),
                  })
                  .oneOf([Yup.ref('password'), ''], 'Confirmação incorreta'),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            const {
               name,
               email,
               old_password,
               password,
               password_confirmation,
            } = data;

            const formData = {
               name,
               email,
               ...(old_password
                  ? {
                       old_password,
                       password,
                       password_confirmation,
                    }
                  : {}),
            };

            const response = await api.put('/profile', formData);

            updateUser(response.data);

            Alert.alert('Perfil atualizado com sucesso');

            navigation.goBack();
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);
               return;
            }
            Alert.alert(
               'Erro ao atualizar',
               'Ocorreu um erro ao tentar atualizar seu perfil, tente novamente',
            );
         }
      },
      [navigation, updateUser],
   );

   const handleGoBack = useCallback(() => {
      navigation.goBack();
   }, [navigation]);

   const handleUpdateAvatar = useCallback(() => {
      ImagePicker.showImagePicker(
         {
            title: 'Selecione um avatar',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Usar câmera',
            chooseFromLibraryButtonTitle: 'Escolher da galeria',
         },
         response => {
            if (response.didCancel) {
               return;
            }

            if (response.error) {
               Alert.alert('Erro ao atualizar seu avatar');
               return;
            }

            const source = { uri: response.uri };

            const data = new FormData();

            data.append('avatar', {
               type: 'image/jpg',
               name: `${user.id}.jpg`,
               uri: response.uri,
            });

            api.patch('users/avatar', data).then(apiResponse => {
               updateUser(apiResponse.data);
            });
         },
      );
   }, [updateUser, user.id]);

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
                  <BackButton onPress={handleGoBack}>
                     <Icon name="chevron-left" size={24} color="#999591" />
                  </BackButton>
                  <UserAvatarButton onPress={handleUpdateAvatar}>
                     <UserAvatar
                        source={{
                           uri:
                              user.avatar_url ||
                              'https://avatars2.githubusercontent.com/u/15719314?s=460&u=7bc792a5320c7546f3fc239e4d85ca2e3d7d1e3c&v=4',
                        }}
                     />
                  </UserAvatarButton>
                  <View>
                     <Title>Meu perfil</Title>
                  </View>

                  <Form
                     initialData={user}
                     ref={formRef}
                     onSubmit={handleSubmit}
                     style={{ width: '100%' }}
                  >
                     <Input
                        name="name"
                        icon="user"
                        placeholder="Nome"
                        autoCapitalize="words"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                           emailRef.current.focus();
                        }}
                     />

                     <Input
                        name="email"
                        icon="mail"
                        ref={emailRef}
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onSubmitEditing={() => {
                           oldPasswordRef.current.focus();
                        }}
                     />

                     <Input
                        containerStyle={{ marginTop: 16 }}
                        name="old_password"
                        icon="lock"
                        ref={oldPasswordRef}
                        placeholder="Senha atual"
                        secureTextEntry={true}
                        textContentType="newPassword"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                           passwordRef.current?.focus();
                        }}
                     />

                     <Input
                        name="password"
                        icon="lock"
                        ref={passwordRef}
                        placeholder="Nova Senha"
                        secureTextEntry={true}
                        textContentType="newPassword"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                           confirmPasswordRef.current?.focus();
                        }}
                     />

                     <Input
                        name="password_confirmation"
                        icon="lock"
                        ref={confirmPasswordRef}
                        placeholder="Confirmar Senha"
                        secureTextEntry={true}
                        textContentType="newPassword"
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
                        Confirmar mudanças
                     </Button>
                  </Form>
               </Container>
            </ScrollView>
         </KeyboardAvoidingView>
      </>
   );
};

export default Profile;
