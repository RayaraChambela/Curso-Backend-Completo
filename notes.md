Métodos HTTP:

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