import React from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { RFValue } from "react-native-responsive-fontsize";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import { Container, HeaderTitle, Form } from "./styles";

interface FormData {
  title: string;
  email: string;
  password: string;
}

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

let data: Array<LoginDataProps> = [];

const schema = Yup.object().shape({
  title: Yup.string().required("Título é obrigatório!"),
  email: Yup.string()
    .email("Não é um email válido")
    .required("Email é obrigatório!"),
  password: Yup.string().required("Senha é obrigatória!"),
});

export function RegisterLoginData() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegister(formData: FormData) {
    const newLoginData = {
      id: String(uuid.v4()),
      ...formData,
    };

    const getData = await AsyncStorage.getItem("@passmanager:logins");

    if (getData !== null) {
      const dataParsed = JSON.parse(getData);
      data = dataParsed;
    }

    data.push(newLoginData);

    await AsyncStorage.setItem("@passmanager:logins", JSON.stringify(data));

    reset({
      title: "",
      email: "",
      password: "",
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <Container>
        <HeaderTitle>Salve o login de algum serviço!</HeaderTitle>

        <Form>
          <Input
            title="Título"
            name="title"
            error={errors.title?.message}
            control={control}
            placeholder="Escreva o título aqui"
            autoCapitalize="sentences"
            autoCorrect
          />
          <Input
            title="Email"
            name="email"
            error={errors.email?.message}
            control={control}
            placeholder="Escreva o Email aqui"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            title="Senha"
            name="password"
            error={errors.password?.message}
            control={control}
            secureTextEntry
            placeholder="Escreva a senha aqui"
          />

          <Button
            style={{
              marginTop: RFValue(26),
            }}
            title="Salvar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
}
