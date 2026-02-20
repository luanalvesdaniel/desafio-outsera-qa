# language: pt
@type_e2e

Funcionalidade: E2E - Fluxo de compra na Automation Exercise

  Cenário: Compra completa com dados válidos
    Dado que eu estou logado na aplicação
    Quando eu adiciono um produto ao carrinho
    E eu prossigo para o checkout
    E eu finalizo o pagamento com dados válidos
    Então devo visualizar a confirmação de pedido realizado

  Cenário: Tentativa de pagamento com cartão inválido
    Dado que eu estou logado na aplicação
    Quando eu adiciono um produto ao carrinho
    E eu prossigo para o checkout
    E eu tento finalizar o pagamento com cartão inválido
    Então devo visualizar mensagem de erro no pagamento
