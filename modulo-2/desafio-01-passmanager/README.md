# Desafio 01 - PassManager

## 💻 Sobre o desafio

Nesse desafio, você irá implementar uma aplicação de gerenciamento de senhas: PassManager.

Essa aplicação possui duas telas, sendo a primeira delas uma listagem das senhas salvas e a segunda a tela de cadastro de novos logins.

## O que devo editar na aplicação?

Com o template já clonado e as dependências instaladas, você deve completar onde não possui código com o código para atingir os objetivos de cada teste. Nesse desafio, você deve editar os seguintes arquivos para completar as funcionalidades da aplicação:

- [src/screens/Home/index.tsx](https://github.com/rocketseat-education/ignite-template-react-native-passmanager/blob/main/src/screens/Home/index.tsx).
- [src/screens/RegisterLoginData/index.tsx](https://github.com/rocketseat-education/ignite-template-react-native-passmanager/blob/main/src/screens/RegisterLoginData/index.tsx);

### screens/Home/index.tsx

Essa é a página do aplicativo. Aqui é feita a listagem dos dados de login que estão salvos no AsyncStorage e a busca de logins pelo título a partir da barra de busca.

Aqui você deve implementar duas funções:

- **loadData:** Essa função é a responsável por buscar os dados no AsyncStorage e colocar nos estados `searchListData` e `data`.

    Os dados quando armazenados no AsyncStorage estarão em uma lista no seguinte formato: 

    ```tsx
    type LoginDataProps = Array<{
      id: string;
      title: string;
      email: string;
      password: string;
    }>;
    ```

    A key que você deverá usar para salvar e buscar os dados no AsyncStorage é `**@passmanager:logins**`. 

    Lembre-se de sempre usar essa key ou os testes não passarão corretamente.

    Após buscar os dados, eles devem ser salvos nos dois estados: `searchListData` e `data`

- **handleFilterLoginData:** Essa função deve receber uma string enviada pela barra de pesquisa `SearchBar`. Ao receber o valor digitado no input, você deve buscar por logins no estado `data` que tenha a string `search` incluída no `title`.
Ao filtrar esse dado, altere o estado `setSearchListData` com o resultado. Cuide para sempre manter o estado `data` com os dados originais. É importante que você também valide se a string recebida na função é uma string válida antes de realizar a filtragem.

### screens/RegisterLoginData/index.tsx

Essa página é responsável por realizar o cadastro de novos logins no AsyncStorage, possuindo apenas uma função que deve ser implementada:

- **handleRegister:** Essa função recebe os dados do formulário enviados pelo react-hook-form e salva no AsyncStorage com a key `**@passmanager:logins**`. Use sempre essa key para garantir que os testes passem.

    Assim como visto durante as aulas, é importante que você mantenha as informações salvas anteriormente e adicione a nova sempre que um novo registro for feito.

    Outro ponto importante é que você adicione as validações do formulário usando o schema pronto disponível no mesmo arquivo do componente.

### Testes Home

- **should be able to get data on async storage**:

    Para que esse teste passe, você deve buscar os dados salvos no AsyncStorage e salvar no estado corretamente para que as informações sejam exibidas no lista de acordo com o que foi descrito acima (você pode voltar [clicando aqui](https://www.notion.so/Desafio-01-PassManager-c5789857e647492887d6e7f1381501ad));

- **should be able to show message when list is empty**:

    Para que esse teste passe, você deve manter os estados `searchListData` e `data` vazios caso não haja nada no armazenamento local quando a busca for feita.

### Testes RegisterLoginData

- **should be able to save login data on async storage:**

    Para que esse teste passe, você deve salvar corretamente novos dados de login sempre que o botão de submit do formulário for pressionado. Para isso, é importante que você mantenha as informações anteriores e adicione a nova. Lembre também de fazer a validação dos campos de acordo com o que é [descrito aqui](https://www.notion.so/Desafio-01-PassManager-c5789857e647492887d6e7f1381501ad).

- **should be able to show errors message on data validation:**

    Para que esse teste passe, você deve garantir que a validação de todos os campos seja feita antes de salvar no AsyncStorage (você precisa configurar a validação ao chamar o useForm na página e adicionar as mensagens de erro nos inputs). 
