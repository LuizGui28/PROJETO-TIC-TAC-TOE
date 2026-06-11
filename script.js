let jogadorAtual = 'X';
let playerX = "";
let playerO = ""; 
let tabuleiro = ["", "", "", "", "", "", "","", ""];
let jogoAtivo = true;
 const combinacoesVitoria = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
 ]

const input1 = document.getElementById('jogador1')
const input2 = document.getElementById('jogador2')
const buttons = document.querySelectorAll('.tictok')
const name = document.getElementById('nomes')


document.getElementById('iniciar').addEventListener('click', function() {

    playerX = input1.value
    playerO = input2.value
    name.innerText = "Go!"

    
    const iniciarBtn = document.getElementById('iniciar');
    iniciarBtn.disabled = true;
    iniciarBtn.setAttribute('aria-disabled', 'true');
    input1.disabled = true;
    input2.disabled = true;

    document.getElementById('jogador1').value = ""
    document.getElementById('jogador2').value = ""
})


 
buttons.forEach(function (clickBtn) {
    clickBtn.addEventListener('click', (function(ev) {
        const indice = ev.target.getAttribute('data-indice');

        if (tabuleiro[indice] === '' && jogoAtivo) {
            tabuleiro[indice] = jogadorAtual;
            ev.target.innerText = jogadorAtual;

            verificarVencedorOuEmpate();
            
            
            if (jogoAtivo) {
                jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'


                  const display = document.getElementById("nomes");

                   if (jogadorAtual === "X") {
                    display.innerText = "Vez de: " + playerX + " (X)";
                   } else {
                    display.innerText = "Vez de: " + playerO + " (O)";
                } 
            }

        }

    }))

})

function verificarVencedorOuEmpate() {
    

    for (let combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            
            jogoAtivo = false;


            document.getElementById(`cell-${a}`).classList.add('winner');
            document.getElementById(`cell-${b}`).classList.add('winner');
            document.getElementById(`cell-${c}`).classList.add('winner');

            let nomeVencedor = '';

            if(jogadorAtual === "X"){
                nomeVencedor = playerX;
            } else if (jogadorAtual === "O") {
                nomeVencedor = playerO;
            }

            
            document.getElementById('nomes').innerText = `Jogador ${`${nomeVencedor}`} (${`${jogadorAtual}`}) venceu!`;
            
            return;

        }}

        if (!tabuleiro.includes('')) {
            jogoAtivo = false;
            document.getElementById('nomes').innerText = "Deu velha!"

            for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).classList.add('loser');
            }
        }
      
}