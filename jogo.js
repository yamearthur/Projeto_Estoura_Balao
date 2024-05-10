var timerId = null;

function iniciajogo(){
    
    var url = window.location.search;
    var nivel_jogo = url.replace("?", "")

    var tempo_segundos = 0;
    
    if(nivel_jogo == 1){
        tempo_segundos = 120;
    }
    if(nivel_jogo == 2){
        tempo_segundos = 60;
        
    }
    if(nivel_jogo == 3){
        tempo_segundos = 30;
        
    }

    document.getElementById('cronometro').innerHTML = tempo_segundos

    var qtd_baloes = 80;

    cria_baloes(qtd_baloes);

    document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos+1);

}

function contagem_tempo(segundos){

    segundos -= 1

    if(segundos == -1){
        game_over();
        clearTimeout(timerId);
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

  timerId = setTimeout( "contagem_tempo("+segundos+")" , 1000 );



}

function game_over(){
    remove_eventos_baloes();
    alert('Game Over - Você não conseguiu estourar os balões a tempo.');
}

function cria_baloes(qtd_baloes){

    for(var i = 1; i <= qtd_baloes ; i++){

        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';

        balao.id ='b'+i;
        balao.onclick = function (){ estourar(this)}
        
        document.getElementById('cenario').appendChild(balao);

    }

}
function estourar(e){
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");

    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    pontuacao(-1);
}

function pontuacao(acao){

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML

    var baloes_inteiros = parseInt(baloes_inteiros);
    var baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros+ acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){

    if(baloes_inteiros==0){
        alert('Parabéns, você conseguiu estourar todos osbalões a tempo');
        parar_jogo();
    }

}

function parar_jogo(){
    clearTimeout(timerId);
}


function remove_eventos_baloes() {
    var i = 1;
    
    while(document.getElementById('b'+i)) {
        document.getElementById('b'+i).onclick = '';
        i++;
    }
}