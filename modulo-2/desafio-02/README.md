# Desafio 02 - Refatorando o App

## 💻 Sobre o desafio

Nesse desafio, você deverá refatorar a aplicação construída no desafio anterior afim de isolar responsabilidades no código e facilitar mudanças futuras.

### Contexto

Como você viu, atualmente a funcionalidade de salvar e buscar dados no AsyncStorage estão todas nos dois componentes: Home e RegisterLoginData. Mas e se a aplicação possuir mais componentes  que também precisam realizar essas ações? Ou até mesmo mais ações como por exemplo limpar todo o AsyncStorage?

Nesse caso, precisaríamos ficar repetindo muito código nos componentes além de que precisaríamos passar também a key manualmente em cada ação feita no armazenamento. 

Para resolver isso, o seu primeiro objetivo nesse desafio é centralizar as funções de `getItem` e `setItem` do AsyncStorage em um contexto com um hook `useStorageData` que será usado por toda a aplicação e substituir as chamadas dos métodos do AsyncStorage nos componentes pelas funções do hook que você criou.

### Tema

Um ponto que merece ser observado é que não há a configuração de tema na aplicação. Isso pode ser um obstáculo caso a aplicação precise receber diferentes temas futuramente.

Dito isto, você deve fazer o uso do `ThemeProvider` fornecido pelo pacote styled-components e trocar a estilização estática pela estilização dinâmica (com o uso do tema) em todos os componentes da aplicação.
