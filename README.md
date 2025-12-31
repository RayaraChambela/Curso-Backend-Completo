Documentação API HubSpot: https://developers.hubspot.com/docs/guides/crm/understanding-the-crm

### Métodos HTTP

Os métodos HTTP são responsáveis pela comunicação entre cliente e servidor.

## GET

Busca dados. Não altera nada no servidor, apenas lê informações.

```js 
app.get('/users', (req, res) => {
  res.send('Lista de usuários');
});
```

## POST

Cria algo novo. Envia dados no corpo da requisição para criar um novo recurso.

```js 
app.post('/users', (req, res) => {
  res.send('Usuário criado');
});
```

## PUT

Atualiza um recurso existente (geralmente todos os campos).

```js 
app.put('/users/:id', (req, res) => {
  res.send('Usuário atualizado');
});
```

## DELETE

Remove um recurso existente.

```js 
app.delete('/users/:id', (req, res) => {
  res.send('Usuário removido');
});
```

## Respostas da API (Status Codes)

- 200 OK → sucesso padrão
- 201 Created → recurso criado com sucesso
- 204 No Content → sucesso sem corpo de resposta

## Rotas (Routes)

As rotas dizem onde e como alguém pode se comunicar com o sistema.

São responsáveis por definir:

- Qual a URL
- Qual o método HTTP
- Quem vai lidar com a request (middlewares + controllers)

## Middlewares

Middlewares são filtros no meio do caminho. Executam antes do controller e decidem se a request pode continuar.

Usados para:

- Autenticação (JWT)
- Validação
- Logs
- Rate limit
- Tratamento de erros

Não conhecem a regra de negócio, apenas validam o contexto.

## Validators

Validators definem as regras do formato dos dados. Garantem que os dados recebidos estejam corretos antes de chegar ao controller.

```js 
Exemplo
const addToWatchListSchema = z.object({
  movieId: z.string().uuid(),
  status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"]),
});
```

Isso define:

movieId = deve ser um UUID
status = só pode assumir valores pré-definidos

## Controllers

Controllers são o cérebro da aplicação. Aqui fica toda a regra de negócio.

Responsáveis por:

- Acessar o banco de dados
- Criar, atualizar ou remover dados
- Decidir a resposta HTTP

Assumem que todos os dados já foram validados antes.

```js 
Exemplo
export const addToWatchList = async (req, res) => {
  // lógica de negócio
};
```

O controller:

- verifica se o filme existe
- verifica se já está na watchlist
- cria o item
- retorna a resposta

Fluxo de uma Request
Request
  ↓
Routes → escolhe o caminho
  ↓
Middlewares → valida / autoriza
  ↓
Validators → valida formato dos dados
  ↓
Controllers → executam a lógica
  ↓
Response

## Schema

Schema é um contrato que define a estrutura e as regras dos dados.

Ele especifica:

- quais campos existem
- quais são obrigatórios
- tipos dos dados
- validações (ex: UUID)

É usado para garantir que os dados recebidos estejam corretos antes de serem processados, evitando erros e deixando o código mais seguro e organizado.

## Diferença entre Schema e Validator

|     Schema    |     Validator      |
|---------------|--------------------|
| Define regras | Executa a validação |
| Descreve o formato | Aplica o formato |
| Não roda sozinho | Roda na request |
| Não bloqueia nada | Bloqueia request inválida |


Exemplo prático: 

- Schema
addToWatchListSchema → “movieId tem que ser UUID”

- Validator
validateRequest(addToWatchListSchema) → “verifica se o body respeita o schema”

## VPS

VPS (Virtual Private Server) é como um mini computador que funciona na nuvem e roda aplicações e APIs continuamente.

## Toda comunicação HTTP é uma API?

Nem toda comunicação HTTP é uma API, mas toda aplicação moderna que troca dados entre cliente e servidor usa uma API.

Regra prática:
Se o servidor responde JSON em vez de HTML, você está criando uma API.