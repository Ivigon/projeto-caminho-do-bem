#  Projeto Caminho do Bem - Sistema de Gestão Social

Um aplicativo Desktop *offline-first* desenvolvido para otimizar e assegurar o registro de famílias assistidas por um projeto social.

##  O Problema
A equipe de voluntários precisava de uma ferramenta simples, rápida e que funcionasse **sem dependência de internet**, para cadastrar e consultar o histórico de doações e atendimentos às famílias da comunidade de forma segura e com foco na privacidade dos dados.

##  Solução
Desenvolvi uma aplicação Desktop utilizando tecnologias web modernas. O sistema permite o cadastro completo das famílias, registro do histórico de itens entregues e uma busca rápida por CPF, Nome ou Endereço.

Para garantir a segurança da informação e a operação offline, a arquitetura foi desenhada para salvar os dados localmente na máquina física em uso, eliminando a necessidade de servidores em nuvem nesta primeira versão.

##  Tecnologias Utilizadas
* **React.js (com Vite):** Para a construção de uma interface de usuário reativa, rápida e modular.
* **Electron:** Utilizado para "empacotar" a aplicação web transformando-a em um executável `.exe` nativo para Windows.
* **JavaScript (ES6+) & CSS3:** Lógica de manipulação de estados e estilização construída do zero, sem uso de bibliotecas externas de UI, garantindo leveza.
* **Local Storage API:** Estratégia de persistência de dados local (banco de dados offline).

## ⚙️ Principais Funcionalidades
1. **Cadastro Inteligente:** Formulário com validação de campos obrigatórios.
2. **Busca em Tempo Real:** Filtro dinâmico que atualiza a tabela de assistidos instantaneamente ao digitar.
3. **Histórico Detalhado:** Sistema de visualização das observações e necessidades de cada família.
4. **Standalone:** Roda como um software independente, sem necessidade de abrir navegadores.

## 👩‍💻 Sobre o Desenvolvimento
Este projeto foi um excelente desafio de arquitetura. O maior aprendizado foi integrar o ecossistema de desenvolvimento web (React/Vite) com o Electron para criar uma experiência de software tradicional, focando fortemente na experiência do usuário final (voluntários) e na segurança dos processos de registro.
