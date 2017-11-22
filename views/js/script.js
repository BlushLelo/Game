
var dificuldadeJogo;
var cenario;
var setVelocidade;
var ranking;
var arrayRanking=[];


function getDificuldade() {
	// $.get("http://localhost:3000/dificuldade", function(data, status){
	// 	dificuldadeJogo = data;
	// 	console.log(data);
	// })

	$.ajax({
		url: "http://localhost:3000/dificuldade",
		dataType: 'json',
		success: function (data){
			dificuldadeJogo = data;
		}
	});
}

getDificuldade();

function setDificuldade() {
	var nome = document.getElementById("nome");

	if(nome.value == ""){
		alert("Por favor, insira seu nome");

	} else{
			for(var i=0; i<dificuldadeJogo.length; i++){
				if(dificuldadeJogo[i].dificuldade === this.id){
					 cenario = "img/" + dificuldadeJogo[i].cenario;
					 setVelocidade =  dificuldadeJogo[i].velocidade;
				}
			}

			iniciarJogo();
	}


}

function atualizarRanking(nome, pontuacao){
	var ranking;

	$.post("http://localhost:3000/ranking",
        {
          name: nome,
		  score: pontuacao
	  })

	var btnRanking = document.createElement('button');
  	btnRanking.setAttribute("id", "btnRanking");
  	document.getElementById("body").appendChild(btnRanking);
	document.getElementById("btnRanking").addEventListener("click", verRanking);
  	document.getElementById("btnRanking").innerHTML = "Ranking";

}

function verRanking(){


	$.get("http://localhost:3000/ranking", function(data, status){
		ranking = data;
		var listaRanking = document.createElement('ul');
		listaRanking.setAttribute("id", "listaRanking");
		document.getElementById("body").appendChild(listaRanking);


		for (var i=0; i<ranking.length; i++){
			arrayRanking[i] = document.createElement('li');
			arrayRanking[i].setAttribute("id", "arrayRanking"+i);
			var id = "arrayRanking"+i;
			document.getElementById("listaRanking").appendChild(arrayRanking[i]);
			document.getElementById(id).innerHTML = ranking[i].name+": "+ranking[i].score+" pontos";
		}

		document.getElementById("btnRanking").remove();
	})


}




function selecionarNivel() {
	document.getElementById("jogar").remove();

	facil=document.createElement('button');
	facil.setAttribute("id", "facil");

	medio=document.createElement('button');
	medio.setAttribute("id", "medio");

	dificil=document.createElement('button');
	dificil.setAttribute("id", "dificil");

	nome = document.createElement('input');
	nome.setAttribute("id", "nome");

	div = document.createElement('div');
	div.setAttribute("id", "divInput");

	document.getElementById("body").appendChild(div);
	document.getElementById("divInput").appendChild(nome);
	document.getElementById("body").appendChild(facil);
	document.getElementById("body").appendChild(medio);
	document.getElementById("body").appendChild(dificil);


	document.getElementById("facil").innerHTML = "Fácil";
	document.getElementById("medio").innerHTML = "Médio";
	document.getElementById("dificil").innerHTML = "Difícil";
	document.getElementById("nome").placeholder = "Digite seu nome";


	document.getElementById("facil").addEventListener("click", setDificuldade);
	document.getElementById("medio").addEventListener("click", setDificuldade);
	document.getElementById("dificil").addEventListener("click", setDificuldade);


}



function iniciarJogo() {
	document.getElementById("menu").remove();
	document.getElementById("facil").remove();
	document.getElementById("medio").remove();
	document.getElementById("dificil").remove();
	var nome = document.getElementById("nome");
	var nomeValor = nome.value;
	document.getElementById("divInput").remove();

	console.log(nomeValor);

	// Criando o canvas
	var canvas = document.createElement("canvas");
	canvas.setAttribute("id", "canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 512;
	canvas.height = 480;
	document.body.appendChild(canvas);

	// Background
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = cenario;


	// Estudante
	var estudanteReady = false;
	var estudanteImage = new Image();
	estudanteImage.onload = function () {
		estudanteReady = true;
	};
	estudanteImage.src = "img/estudante3.png";

	// Cerveja
	var cervejaReady = false;
	var cervejaImage = new Image();
	cervejaImage.onload = function () {
		cervejaReady = true;
	};
	cervejaImage.src = "img/cerveja.png";

	// // Bala
	// var balaReady = false;
	// var balaImage = new Image();
	// balaImage.onload = function () {
	// 	balaReady = true;
	// };
	// balaImage.src = "img/bala.png";

	// DP
	var dpReady = false;
	var dpImage = new Image();
	 	dpImage.onload = function () {
	 	dpReady = true;
	};
	dpImage.src = "img/dp.png";

	// DECLARACAO DE VARIÁVEIS E OBJETOS
	var estudante = {
		velocidade: setVelocidade //pixels por segundo
	};

	if (setVelocidade == 256) {
		var velocidadeJogo = 8;
	} else if (setVelocidade == 456) {
		var velocidadeJogo = 5;
	} else {
		var velocidadeJogo = 0.0001;
	}


	var crazy;
	var cerveja = {};
	var bala = {};
	var dp = {};
	var pontuacao = 0;
	var vidas = 3;
	var flagCrazy = 0;

	// Controle do teclado
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);


	var inicio =  false;

	var reset = function () {


	    if (inicio == false){
	        estudante.x = canvas.width / 2;
	    	estudante.y = canvas.height - 50;
	        inicio = true;
	    }

		// Cria a DP em um lugar aleatorio
		dp.x = 32 + (Math.random() * (canvas.width - 64));
		dp.y = canvas.height - 480;


		// Cria a cerveja em um lugar aleatorio
	    cerveja.x = 32 + (Math.random() * (canvas.width - 64));
		cerveja.y = canvas.height - 480;

		// Cria a bala em um lugar aleatorio
		// if (flagCrazy == 0) {
		// 	crazy = Math.random();
		// 	console.log(crazy);
		// 	if(crazy > 0.8){
		// 		bala.x = 32 + (Math.random() * (canvas.width - 64));
		// 		bala.y = canvas.height - 470;
		// 	}
		// }


	};

	setInterval(function(){ dp.y = dp.y+1}, velocidadeJogo);
	// setInterval(function(){ bala.y = bala.y+1}, velocidadeJogo);
	setInterval(function(){ cerveja.y = cerveja.y+1}, velocidadeJogo);


	// Update game objects
	var update = function (modifier) {

		if (37 in keysDown && estudante.x >= 0) { // Player holding left
			estudante.x -= estudante.velocidade * modifier;
		}
		if (39 in keysDown && estudante.x <= 480) { // Player holding right
			estudante.x += estudante.velocidade * modifier;
		}


		//VERIFICAR SE PEGOU ALGUM DOS ITENS
		// if ( estudante.x <= (bala.x + 32) && bala.x <= (estudante.x + 32) && estudante.y <= (bala.y + 32) && bala.y <= (estudante.y + 32)) {
        //
		// 	var cores = ["#b100ba", "#9900b0", "#8000b3", "#5600b8", "#2c00bd", "#7b00c2", "#b500af", "#b100ba", "#9900b0", "#8000b3"];
		// 	var bkg = ["img/bkg4.jpg", "img/bkg1.jpg"];
		// 	var i=0;
		// 	var j=0;
		// 	reset();
	    //     bgImage.src = "img/bkg4.jpg";
	    //     estudanteImage.src = "img/estudante2.png";
		// 	estudante.velocidade = 1000;
		// 	velocidadeJogo = 2;
		// 	flagCrazy = 1;
		// 	var myVar = setInterval(function() {
		// 	      document.body.style.backgroundColor = cores[i];
        //
		// 		  bgImage.src = bkg[j];
		// 	      i++;
		// 		  j++;
		// 	      if (i == cores.length) {
		// 	        i =  0;
		// 	      }
		// 	      if (j == bkg.length) {
		// 	        j =  0;
		// 	      }
        //
		// 	}, 100);
        //
        //
        //
		// 	setInterval(function(){
		// 		clearInterval(myVar);
		// 		bgImage.src = "img/bkg1.jpg";
		//         estudanteImage.src = "img/estudante3.png";
		// 		document.body.style.backgroundColor = "#003aad";
		// 		estudante.velocidade = setVelocidade;
		// 		flagCrazy = 0;
		// 	}, 5000);
		// }

		if ( estudante.x <= (cerveja.x + 32) && cerveja.x <= (estudante.x + 32) && estudante.y <= (cerveja.y + 32) && cerveja.y <= (estudante.y + 32)) {

			pontuacao++;
			estudante.velocidade = estudante.velocidade+20;
			reset();
		}

		if ( estudante.x <= (dp.x + 32) && dp.x <= (estudante.x + 32) && estudante.y <= (dp.y + 32) && dp.y <= (estudante.y + 32)) {
			if(vidas == 1){
				acabou();
			} else{
				vidas--;
				reset();
			}

		}

		if(cerveja.y >= canvas.height || dp.y >= canvas.height){
			if(vidas == 1){
				acabou();
			} else{
				reset();
				vidas--;
			}
		}
	};

	var acabou = function(){
		document.getElementById("canvas").remove();
		var jubilou = document.createElement('h2');
		jubilou.setAttribute("id", "jubilou");
		document.getElementById("body").appendChild(jubilou);
		document.getElementById("jubilou").innerHTML = nomeValor + " você JUBILOU! <br> Sua pontuação foi: "+pontuacao;
		atualizarRanking(nomeValor, pontuacao);
	}

	// DESENHAR OBJETOS NO CANVAS
	var desenhar = function () {

		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}

		if (estudanteReady) {
			ctx.drawImage(estudanteImage, estudante.x, estudante.y);

		}

		if (dpReady) {

			ctx.drawImage(dpImage, dp.x, dp.y);

		}

		if (cervejaReady) {

			ctx.drawImage(cervejaImage, cerveja.x, cerveja.y);

		}

		// if (balaReady) {
		// 	if ( crazy > 0.8){
		// 	ctx.drawImage(balaImage, bala.x, bala.y);
		// 	}
		// }



		// Score
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.font = "24px VT323";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Pontuação: " + pontuacao, 32, 32);
		ctx.fillText("Vidas: " + vidas, 400, 32);
	};

	// The main game loop
	var main = function () {

		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		desenhar();

		then = now;

		// Request to do this again ASAP
		requestAnimationFrame(main);
	};




	// Cross-browser support for requestAnimationFrame
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	// Let's play this game!
	var then = Date.now();
	reset();
	main();
}
