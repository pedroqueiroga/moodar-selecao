## Seleção estágio Moodar

Aplicativo em React. Mini plataforma de gerenciamento de ações.

Para iniciar o servidor dev:
```bash
moodar-selecao$ yarn run dev
```

### Funcionalidades desenvolvidas:

1. [x] Barra de navegação (presente em todas as páginas)
    * [x] Caixa de texto para buscar por palavra-chave (título / categoria) **
        * [ ] Busca em tempo real.
    * [x] Botão de perfil **
2. [x] Página de listagem de ações 
    * [x] Barra lateral de de filtragem: categoria, audiência e duração. *
    * [x] Lista de ações (filtrada ou completa) **
        * [x] Clicar numa ação leva para a página de detalhe dessa ação
        * [x] Ordena lista.
        * [x] Paginação.
3. [x] Página de detalhe de ação 
    * [x] Título. **
    * [x] Categoria a qual pertence, audiência, duração. **
    * [x] Descrição da ação. **
    * [x] Botões:
        * [x] Solicitar ação    (se a ação não foi solicitada) **
        * [x] Cancelar ação     (se a ação foi solicitada) **
4. [x] "Perfil" da empresa - homepage 
    * [x] Lista de ações solicitadas **
        * [x] Acompanhar ação - leva para a página de detalhe dessa ação **
