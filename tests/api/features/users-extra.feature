# language: pt

Funcionalidade: API - Endpoints avançados de usuários

  Cenário: Atualizar usuário com sucesso
    Quando faço uma requisição PUT para "/users/1" com o payload:
      | name  | email              |
      | Alice | alice@novo.com     |
    Então o status da resposta deve ser 200
    E o corpo da resposta deve conter o usuário criado

  Cenário: Atualizar usuário inexistente
    Quando faço uma requisição PUT para "/users/999" com o payload:
      | name  | email              |
      | Teste | teste@fail.com     |
    Então o status da resposta deve ser 404
    E o corpo da resposta deve conter o erro "User not found"

  Cenário: Deletar usuário com sucesso
    Quando faço uma requisição DELETE para "/users/1"
    Então o status da resposta deve ser 204

  Cenário: Deletar usuário inexistente
    Quando faço uma requisição DELETE para "/users/999"
    Então o status da resposta deve ser 404
    E o corpo da resposta deve conter o erro "User not found"

  Cenário: Requisição com método inválido
    Quando faço uma requisição PATCH para "/users/1"
    Então o status da resposta deve ser 404

  Cenário: Requisição com payload malformado
    Quando faço uma requisição POST para "/users" com o corpo malformado
    Então o status da resposta deve ser 400

  Cenário: Verificar headers de resposta
    Quando faço uma requisição GET para "/users"
    Então o header "content-type" da resposta deve conter "application/json"

  Cenário: Autenticação inválida
    Quando faço uma requisição GET para "/users" com autenticação inválida
    Então o status da resposta deve ser 401
    E o corpo da resposta deve conter o erro "Unauthorized"
