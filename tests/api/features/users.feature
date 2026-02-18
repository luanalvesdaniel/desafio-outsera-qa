# language: pt

Funcionalidade: API - Usuários da API
  Como consumidor da API
  Quero gerenciar usuários
  Para garantir que os endpoints funcionam corretamente

  Cenário: Listar usuários
    Quando faço uma requisição GET para "/users"
    Então o status da resposta deve ser 200
    E o corpo da resposta deve ser uma lista de usuários

  Cenário: Criar usuário com sucesso
    Quando faço uma requisição POST para "/users" com o payload:
      | name  | email              |
      | Carol | carol@email.com    |
    Então o status da resposta deve ser 201
    E o corpo da resposta deve conter o usuário criado

  Cenário: Criar usuário com dados inválidos
    Quando faço uma requisição POST para "/users" com o payload:
      | name  | email |
      |       |       |
    Então o status da resposta deve ser 400
    E o corpo da resposta deve conter o erro "Missing fields"

