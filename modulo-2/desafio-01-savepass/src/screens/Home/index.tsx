import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import { LoginDataItem } from "../../components/LoginDataItem";

import {
  Container,
  Metadata,
  Title,
  TotalPassCount,
  LoginList,
} from "./styles";

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchText, setSearchText] = useState("");
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  async function loadData() {
    const dataKey = await AsyncStorage.getItem("@savepass:logins");
    if (dataKey !== null) {
      setSearchListData(JSON.parse(dataKey));
      setData(JSON.parse(dataKey));
    }
  }

  function handleFilterLoginData() {
    const filterByTitle = data.find(
      (loginData) => loginData.service_name === searchText
    );

    if (filterByTitle !== undefined) {
      setSearchListData([filterByTitle]);
      return;
    }

    if (data.length === searchListData.length) {
      return;
    }
    setSearchListData(data);
    return;
  }

  function handleChangeInputText(text: string) {
    setSearchText(text);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <>
      <Header
        user={{
          name: "Rocketseat",
          avatar_url: "https://i.ibb.co/ZmFHZDM/rocketseat.jpg",
        }}
      />
      <Container>
        <SearchBar
          placeholder="Qual senha você procura?"
          onChangeText={(text) => handleChangeInputText(text)}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleFilterLoginData}
          onSearchButtonPress={handleFilterLoginData}
        />

        <Metadata>
          <Title>Suas senhas</Title>
          <TotalPassCount>
            {searchListData.length
              ? `${`${searchListData.length}`.padStart(2, "0")} ao total`
              : "Nada a ser exibido"}
          </TotalPassCount>
        </Metadata>

        <LoginList
          keyExtractor={(item) => item.id}
          data={searchListData}
          renderItem={({ item: loginData }) => {
            return (
              <LoginDataItem
                service_name={loginData.service_name}
                email={loginData.email}
                password={loginData.password}
              />
            );
          }}
        />
      </Container>
    </>
  );
}
