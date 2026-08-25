# Registros do Participante

Este arquivo é um espaço opcional e de uso livre durante a atividade.

Você pode utilizá-lo da forma que considerar mais útil para o seu trabalho. Por exemplo, ele pode servir como:

documentação própria da solução;



IMPORTANTE:

Inicialmente, interpretei que um redo que terminasse uma partida, nao necessariamente impediria a continuidade. Mas lendo no readme, entendi que apos um redo vencedor, a partida nao pode ser retornada.
Decidi criar uma simples flag de checagem caso o jogo tenha sido finalizado por um redo, impossibilitando quaisquer outras jogadas posteriormente.

- anotações;

Analise inicial do codigo de game.js:
O codigo ja apresenta uma boa divisao das possiveis winning conditions, organizadas em arrays
Possui uma funcao especifica para inicializar o estado inicial
Usa um ternario para determinar o proximo jogador de uma jogada
Possui uma funcao especifica para determinar o proximo estado do board apos aplicar uma jogada

Analise inicial do codigo script.js:
Define as variaveis e constantes iniciais
Renderiza o estado inicial, e nao guarda estado no html
Funcao que faz o handle dos clicks


Por enquanto os botoes undo e redo estao funcionando em algum certo nivel. Porem a implementacao da checagem de vitoria ainda nao esta tao correta.
Copiei a checagem de vitoria do handleClick e coloquei no redo. so eh possivel "vencer" o jogo em um redo.
Crie uma funcao winAnimate(result) que faz o processo de colocar as celulcas verdezinhas. Extrai o comportamento da secao de check e result do handleClick.
Chamo ela tanto em handleClick quanto em redoGame.

Ainda nao esta correta a diferenciacao de linhas de jogada apos um undo q


- refatorações;
Nao apliquei, porem o nome da funcao de checagem de vitoria ser "check" apenas parece muito curto. "checkWinner" soa melhor.

A principal refatoracao, que se refere as minhas proprias mudancas, se refere a conseguir copiar propriamente a data atual para os backups, sem a necessidade de se criar 3 variaveis desorganizadas. Nao sei usar array direito em javascripts perdao.


- rascunhos;
O estado anterior, descrito por estado do tabulheiro, estado atual de vitoria ou nao, jogador atual e entre outros detalhes, pode ser salvo como um backup para a implementacao do undo. Aps ter feito o undo uma vez, uma flag como has_undone pode ser levantada, travando uma outra volta na jogada. 
Deve ser identificado tambem as situacoes em que sao de fato possiveis fazer um undo. Na primeira jogada, esse nao seria o caso. Caso o backup do undo esteja vazio, pode ser identificado que nao eh possivel dar Undo.

Caso uma nova jogada seja feita apos o Undo, o backup do undo se torna o antigo estado atual, e vamos para uma nova linha de acoes.

O Redo comeca sendo dependente do Undo. Ele so deve ser liberado quando a flag do Undo esteja ligada. Assim, ele retorna o jogo para o estado anterior, possivelmente tambem copiando o estado anterior em um "backup_redo".

Adicionei a funcao undoGame(rascunho) em script.js
Adicionei a funcao redoGame(raschunho) em script.js

Adicionei listeners no script.js tanto para o button de undo quanto para o button de redo

- observações;

- lembretes;

- listas ou checklists;

- referências;

qualquer outro registro que você considere útil durante a implementação.

Não existe um formato esperado, nem é necessário preencher este arquivo para concluir a atividade.

Caso utilize este espaço, organize o conteúdo da maneira que preferir.

---

Registros
