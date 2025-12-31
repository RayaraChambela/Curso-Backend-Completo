Métodos HTTP: Responsáveis pela comunicação do cliente - servidor

GET -> Buscar dados, não altera nada no servidor, apenas lê.

Exemplo:

app.get('/users', (req, res) => {
  res.send('Lista de usuários');
});


POST -> Cria algo novo, envia dados no corpo da requisição, cria um novo recurso.

Exemplo: 

app.post('/users', (req, res) => {
  res.send('Usuário criado');
});

PUT -> Atualiza algo existente (geralmente tudo)

Exemplo: 

app.put('/users/:id', (req, res) => {
  res.send('Usuário atualizado');
});

DELETE -> Apagar algo

Exemplo: 

app.delete('/users/:id', (req, res) => {
  res.send('Usuário removido');
});

RESPOSTAS API:

- 200 OK → sucesso padrão
- 201 Created → algo foi criado
- 204 No Content → sucesso sem resposta

ROTAS: dizem onde e como alguém pode falar com seu sistema -> Para onde a request vai.  É responsável por dizer:

- Qual a URL
- Qual o método HTTP 
- Quem vai lidar com a request (middlewares + controllers)

MIDDLEWARES - São como filtros no meio do caminho, executam antes do controller e decidem se a request pode continuar. São usados para:

- Autenticação (JWT)
- Validação
- Logs
- Rate Limit
- Tratar erros 

Não sabem nada do negócio, só validam contexto.

VALIDATORS - As regras do formado dos dados, definem COMO os dados devem ser.

Exemplo: 

const addToWatchListSchema = z.object({
  movieId: z.string().uuid(),
  status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"]),
});

Isso diz: 
- movieId = precisa ser UUID
- status = só pode ser valores

CONTROLLERS - O cérebro da aplicação, aqui está a regra do negócio. Responsável por:

- Acessar o banco
- Cria / atualiza / remove dados
- Decide repostas HTTP

Assume que tudo já foi validado antes

Exemplo: 
export const addToWatchList = async (req, res) => {
  // lógica de negócio
};

- Verifica se o filme existe
- Verifica se já está na watchlist
- Cria o item
- Responde

Resumindo:

Request
  ↓
Routes → escolhe o caminho
  ↓
Middlewares → valida / autoriza
  ↓
Validators → valida formato dos dados
  ↓
Controller → executa a lógica
  ↓
Response

SCHEMA: é um contrato que define a estrutura e as regras dos dados.
Ele especifica quais campos existem, quais são obrigatórios, o tipo de cada campo e possíveis validações (ex: formato UUID).
É usado para garantir que os dados recebidos estejam corretos antes de serem processados, evitando erros e deixando o código mais seguro e organizado.

DIFERENÇAS ENTRE SCHEMA E VALIDAROS: Schema define como os dados devem ser; validator usa o schema para verificar se os dados estão corretos.

  Schema	                  Validator
Define regras	          Executa validação
Descreve formato      	Aplica o formato
Não roda sozinho	      Roda na request
Não bloqueia nada	      Bloqueia request inválida

Exemplo:

- Schema
addToWatchListSchema
→ “movieId tem que ser UUID”

- Validator
validateRequest(addToWatchListSchema)
→ “verifica agora se o body respeita isso”

VPS: como um mini computador que funciona na nuvem

TODA COMUNICAÇÃO HTTP É UMA API?

Resposta: Nem toda comunicação HTTP é uma API, mas toda aplicação moderna que troca dados entre cliente e servidor usa uma API. Se o servidor responde dados (JSON) em vez de páginas (HTML), você está criando uma API.