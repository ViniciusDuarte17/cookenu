# projeto cookenu


### Sobre o projeto:

Esse produto nada mais é do que uma rede social, na qual os usuário podem dividir informações relevantes sobre comidas e receitas que tenham experimentado. Ela possui todas funcionalidade mais comuns em rede sociais. Em baixo listei as funcionalidade criada para essa aplicação.

### Funcionalidade:

- ```Cadastro```. O usuário só precisa informar: email, nome e sua senha para realizar o cadastro.
- ``` Login.``` Basta informar email e a senha corretamente que o usuário poderá se logar na aplicação.
- ```Informação do próprio perfil```. Apartir do token de autenticação fornecido, usuário deve ser capaz de ver as suas informações não sensíveis salvas no banco (id, name, e email).
- ```Feed.``` Um usuário pode visualizar as receitas criadas pelos usuários que ele segue. As receitas são retornadas em ordem de criação.
- ```Criar receita.``` Um usuário logado pode criar suas receitas.
- ```Pegar receita.``` Um usuário logado pode pegar suas receita passando o id da receita.
- ```Seguir usuário.``` Um usuário logado pode seguir algum usuário que existe na aplicação, passando o id do usuário que queira seguir.
- ```Deixar de seguir usuário.``` Um usuário logado pode deixar de seguir algum usuário que ele esteja seguindo.


### Tecnologias utilizadas BACK-END
 - NodeJs
 - Typescript
 - Express
 - Postman
 - Mysql
 - Knex
 - Paradigma de orientação a objetos
 - Arquitetura em camadas
 
 ### Instruções para rodar aplicação localmente
 
 Clone o projeto

```bash
git clone https://github.com/ViniciusDuarte17/cookenu.git
```
Instale as dependências

```bash
npm install
```

```bash
Criar o arquivo .env no back-end
```

Inicie o servidor

```
npm run dev 
```

 ### Documentação
```
BASE_URL DO BACK-END: https://cookenu-user.herokuapp.com
```
[Documentação]( https://documenter.getpostman.com/view/19713876/VUr1Gso8)

## Desenvolvedor

<table> 
<tr>
  <td align="center"><a href="https://github.com/ViniciusDuarte17"><img style="border-radius: 50%" src="https://user-images.githubusercontent.com/92999708/210431021-9923435c-eefe-4757-b8e2-e441910a4e88.png" width="100px" alt=""/>
 <br />
 <sub><b>Vinicius Duarte</b></sub></a> <a href="https://github.com/ViniciusDuarte17">👩🏻‍💻</a></td>
 </tr>
</table>

