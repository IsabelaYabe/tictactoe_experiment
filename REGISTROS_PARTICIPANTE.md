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
1 - Função undo recebe o tabuleiro e o index da ultima jogada realizada, retornando o tabuleiro atualizado e o index da jogada desfeita. 
Primeiro, faremos uma checagem de erro para ver se a posição do último movimento é válida (vendo se ela está fora do tabuleiro
ou não existe).
Depois, iremos criar uma cópia do tabuleiro atual e, nessa cópia, atualizar a posição do último movimento para vazio, indicando que não houve movimento para aquela casa específica. 


## FUNÇÃO REDOMOVE