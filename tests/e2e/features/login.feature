# language: pt
@type_e2e

Funcionalidade: E2E - Login na aplicação Automation Exercise

  Cenário: Login com credenciais válidas
    Dado que eu estou na página de login
    Quando eu faço login com email "username@gmail.com" e senha "A3LcUWvZkxTV@ea"
    Então devo visualizar que estou logado com sucesso

  Esquema do Cenário: Login inválido
    Dado que eu estou na página de login
    Quando eu faço login com email "<email>" e senha "<senha>"
    Então devo visualizar mensagem de erro

    Exemplos:
      | email                  | senha            |
      | username@gmail.com     | senha_errada     |
      | usuario_invalido@x.com | A3LcUWvZkxTV@ea  |

  Esquema do Cenário: Campos obrigatórios em branco
    Dado que eu estou na página de login
    Quando eu faço login com email "<email>" e senha "<senha>"
    Então devo permanecer na página de login

    Exemplos:
      | email               | senha              |
      |                     | A3LcUWvZkxTV@ea    |
      | username@gmail.com  |                    |
      |                     |                    |
