# Registros do Participante

Este arquivo é um espaço opcional e de uso livre durante a atividade.

Você pode utilizá-lo da forma que considerar mais útil para o seu trabalho. Por exemplo, ele pode servir como:

documentação própria da solução;

- anotações;

- refatorações;

- rascunhos;

- observações;

- lembretes;

- listas ou checklists;

- referências;

qualquer outro registro que você considere útil durante a implementação.

Não existe um formato esperado, nem é necessário preencher este arquivo para concluir a atividade.

Caso utilize este espaço, organize o conteúdo da maneira que preferir.

---

Registros



1 - FUNÇÃO UNDO 
O Undo deve desfazer a última jogada realizada.

O Redo deve refazer a jogada que foi desfeita pelo Undo.

As funcionalidades devem atender aos seguintes comportamentos:

o Undo deve desfazer somente a última jogada realizada;
após um Undo, o tabuleiro deve voltar à situação anterior àquela jogada e o turno deve retornar ao jogador que a realizou;
após realizar um Undo, não deve ser possível desfazer uma segunda jogada consecutivamente;
o Redo deve refazer a jogada desfeita pelo Undo, restaurando o tabuleiro e o jogador da vez correspondentes;
ao desfazer uma jogada que resultou em vitória ou empate, a partida deve voltar a permitir novas jogadas;
ao refazer uma jogada que resulte em vitória ou empate, o resultado correspondente deve voltar a ser reconhecido e a partida deve permanecer encerrada;
se uma nova jogada for realizada após um Undo, a jogada anteriormente disponível para Redo não deve mais poder ser refeita;
o controle de Undo deve ficar indisponível quando não houver uma jogada que possa ser desfeita;
o controle de Redo deve ficar indisponível quando não houver uma jogada que possa ser refeita;
ao iniciar uma nova partida, não deve ser possível desfazer ou refazer jogadas da partida anterior.



## FUNÇÃO UNDOMOVE
A função undoMove deve receber o estado atual do jogo e retornar o estado anterior, desfazendo a última jogada realizada. Ela deve verificar se há uma jogada para desfazer e, caso contrário, não realizar nenhuma ação.
Para isso, a função deve manter um histórico de estados do jogo, permitindo que o jogador volte ao estado anterior. Além disso, a função deve atualizar o turno do jogador para refletir a jogada desfeita.
Primeiro, vamos criar uma variável global chamada "history" que será um array para armazenar os estados do jogo. Em seguida, vamos modificar a função applyMove para adicionar o estado atual do jogo ao histórico antes de aplicar a jogada. A função undoMove irá verificar se há estados no histórico e, se houver, irá remover o último estado e retornar o estado anterior.
Depois, vamos atualizar a função applyMove para que, ao aplicar uma jogada, ela adicione o estado atual do jogo ao histórico antes de fazer a jogada. Isso permitirá que a função undoMove tenha acesso ao estado anterior.
Dessa forma, a função undoMove poderá desfazer a última jogada realizada, retornando o estado anterior do jogo e atualizando o turno do jogador.
Também é importante garantir que a função undoMove não permita desfazer jogadas consecutivas, ou seja, após um Undo, o jogador não poderá desfazer outra jogada até que uma nova jogada seja realizada.



## FUNÇÃO REDOMOVE 
Iremos criar uma função chamada redoMove que permitirá refazer a jogada desfeita pelo Undo. Essa função deve verificar se há uma jogada para refazer e, caso contrário, não realizar nenhuma ação.
Primeiro, vamos criar uma variável global chamada "redoHistory" que será um array para armazenar os estados do jogo que foram desfeitos pelo Undo. Em seguida, vamos modificar a função undoMove para adicionar o estado atual do jogo ao redoHistory antes de desfazer a jogada. A função redoMove irá verificar se há estados no redoHistory e, se houver, irá remover o último estado e retornar o estado anterior.
Depois, vamos atualizar a função applyMove para que, ao aplicar uma jogada, ela limpe o redoHistory, garantindo que não seja possível refazer jogadas após uma nova jogada ser realizada.
Então, a função redoMove poderá refazer a jogada desfeita pelo Undo, retornando o estado anterior do jogo e atualizando o turno do jogador.
Por fim, é importante garantir que a função redoMove não permita refazer jogadas consecutivas, ou seja, após um Redo, o jogador não poderá refazer outra jogada até que uma nova jogada seja realizada.
Ao iniciar uma nova partida, não deve ser possível desfazer ou refazer jogadas da partida anterior.


## SUGESTÕES DE REFATORAÇÃO DO CÓDIGO ORIGINAL, SEM UNDO E REDO
Para implementar as funcionalidades de Undo e Redo, podemos sugerir algumas refatorações no código original do jogo da velha. Essas mudanças visam facilitar a implementação das novas funcionalidades e melhorar a organização do código.
1. Criar uma função separada para atualizar o estado do jogo: Podemos criar uma função chamada updateGameState que será responsável por atualizar o estado do jogo, incluindo o tabuleiro, o jogador atual e o histórico de jogadas. Isso permitirá que as funções de Undo e Redo possam chamar essa função para atualizar o estado do jogo de forma consistente.
2. Utilizar um objeto para armazenar o estado do jogo: Em vez de utilizar variáveis separadas para o tabuleiro, o jogador atual e o histórico de jogadas, podemos criar um objeto chamado gameState que irá armazenar todas essas informações. Isso facilitará a manipulação do estado do jogo e permitirá que as funções de Undo e Redo possam acessar e modificar o estado de forma mais organizada.

3. Separar melhor a renderização em diferentes funções: Podemos criar funções separadas para renderizar o tabuleiro, o status do jogo e os controles. Por exemplo, podemos ter as funções:
- renderBoard();
- renderStatus();
- renderControls().
Isso deixa renderGame() menor e facilita testes.