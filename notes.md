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

ROTAS: dizem onde e como alguém pode falar com seu sistema.

SCHEMA: é um contrato que define a estrutura e as regras dos dados.
Ele especifica quais campos existem, quais são obrigatórios, o tipo de cada campo e possíveis validações (ex: formato UUID).
É usado para garantir que os dados recebidos estejam corretos antes de serem processados, evitando erros e deixando o código mais seguro e organizado.

VPS: como um mini computador que funciona na nuvem
