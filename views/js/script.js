
var dificuldadeJogo;
var cenario;
var setVelocidade;
var ranking;
var arrayRanking=[];
var listaUsuarios = [];
var usuarioLogado = {
	login: "",
	password: ""
};
var personagem;
var listaPersonagens = [];


getDificuldade();
getListaUsuarios();
getPersonagens();

function login(tipo){
	document.getElementById("btn-entrar").remove();
	document.getElementById("btn-cadastrar").remove();

	var username=document.createElement('input');
	username.setAttribute("id", "username");
	username.setAttribute("placeholder", "Username");

	var senha=document.createElement('input');
	senha.setAttribute("id", "senha");
	senha.setAttribute("placeholder", "Senha");
	senha.setAttribute("type", "password");

	var logar=document.createElement('button');
	logar.setAttribute("id", "logar");

	var div = document.createElement('div');
	div.setAttribute("id", "divInput");


	document.getElementById("body").appendChild(div);
	document.getElementById("divInput").appendChild(username);
	document.getElementById("divInput").appendChild(senha);
	document.getElementById("body").appendChild(logar);


	document.getElementById("logar").innerHTML = tipo;

	if (tipo == 'cadastrar') {
			document.getElementById("logar").addEventListener("click", cadastrar);
	} else{
			document.getElementById("logar").addEventListener("click", entrar);
	}

}

function cadastrar() {

	var nome = document.getElementById("username");
	var senha = document.getElementById("senha");
	var flag = false;

	if(nome.value == "" || senha.value == ""){
		alert("Username e/ou Senha inválidos");

	} else{
			for(var i=0; i<listaUsuarios.length; i++){
				if(listaUsuarios[i].login == nome.value){
					flag = true;
				}
			}

			if(flag){
				alert("Este username já está sendo utilizado.");
			} else {
				usuarioLogado = {login: nome.value, password: senha.value};
				cadastroNovoUsuario(nome.value, senha.value);
				selecionarNivel();
			}
	}
}

function entrar() {
	var nome = document.getElementById("username");
	var senha = document.getElementById("senha");
	var flag = false;

	if(nome.value == "" || senha.value == ""){
		alert("Username e/ou Senha inválidos");

	} else{
			for(var i=0; i<listaUsuarios.length; i++){
				if(listaUsuarios[i].login == nome.value && listaUsuarios[i].password == senha.value){
					flag = true;
				}
			}

			if(flag){
				usuarioLogado = {login: nome.value, password: senha.value};
				selecionarNivel();
			} else {
				alert("Username e/ou Senha inválidos");
			}
	}

}

function getListaUsuarios() {
	$.ajax({
		url: "https://prezado0.herokuapp.com/registro",
		dataType: 'json',
		success: function (data){
			listaUsuarios = data;
		}
	});
}

function cadastroNovoUsuario(nome, senha){

	$.post("https://prezado0.herokuapp.com/registro",
        {
          login: nome,
		  password: senha
	  })

}

function getDificuldade() {
	$.ajax({
		//url: "http://localhost:3000/dificuldade",
		url: "https://prezado0.herokuapp.com/dificuldade",
		dataType: 'json',
		success: function (data){
			dificuldadeJogo = data;
		}
	});
}

function setDificuldade() {

	for(var i=0; i<dificuldadeJogo.length; i++){
		if(dificuldadeJogo[i].dificuldade === this.id){
			 cenario = "img/" + dificuldadeJogo[i].cenario;
			 setVelocidade =  dificuldadeJogo[i].velocidade;
		}
	}

	escolherPersonagem();

}

function getPersonagens() {
	$.ajax({
		url: "https://prezado0.herokuapp.com/character",
		dataType: 'json',
		success: function (data){
			listaPersonagens = data;
		}
	});
}

function setPersonagem() {

	for(var i=0; i<listaPersonagens.length; i++){
		if(listaPersonagens[i].personagem === this.id){
			console.log(this.id);
			 personagem = "img/" + listaPersonagens[i].img;
			 console.log(personagem);
		}
	}

	iniciarJogo();
}

function atualizarRanking(pontuacao){
	var ranking;

	$.post("https://prezado0.herokuapp.com/ranking",
        {
          name: usuarioLogado.login,
		  score: pontuacao
	  })

	var btnRanking = document.createElement('button');
  	btnRanking.setAttribute("id", "btnRanking");
  	document.getElementById("body").appendChild(btnRanking);
	document.getElementById("btnRanking").addEventListener("click", verRanking);
  	document.getElementById("btnRanking").innerHTML = "Ranking";

}

function verRanking(){


	//$.get("http://localhost:3000/ranking", function(data, status){
	$.get("https://prezado0.herokuapp.com/ranking", function(data, status){
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
	document.getElementById("username").remove();
	document.getElementById("senha").remove();
	document.getElementById("logar").remove();

	facil=document.createElement('button');
	facil.setAttribute("id", "facil");

	medio=document.createElement('button');
	medio.setAttribute("id", "medio");

	dificil=document.createElement('button');
	dificil.setAttribute("id", "dificil");

	document.getElementById("body").appendChild(facil);
	document.getElementById("body").appendChild(medio);
	document.getElementById("body").appendChild(dificil);


	document.getElementById("facil").innerHTML = "Fácil";
	document.getElementById("medio").innerHTML = "Médio";
	document.getElementById("dificil").innerHTML = "Difícil";


	document.getElementById("facil").addEventListener("click", setDificuldade);
	document.getElementById("medio").addEventListener("click", setDificuldade);
	document.getElementById("dificil").addEventListener("click", setDificuldade);

}

function escolherPersonagem() {
	document.getElementById("facil").remove();
	document.getElementById("medio").remove();
	document.getElementById("dificil").remove();

	var faceca=document.createElement('img');
	faceca.setAttribute("id", "faceca");
	faceca.setAttribute("src", "img/faceca.png");
	faceca.setAttribute("class", "escolher-personagem");

	var lep=document.createElement('img');
	lep.setAttribute("id", "lep");
	lep.setAttribute("src", "img/lep.png");
	lep.setAttribute("class", "escolher-personagem");

	var comunica=document.createElement('img');
	comunica.setAttribute("id", "comunica");
	comunica.setAttribute("src", "img/comunica.png");
	comunica.setAttribute("class", "escolher-personagem");



	document.getElementById("body").appendChild(faceca);
	document.getElementById("body").appendChild(lep);
	document.getElementById("body").appendChild(comunica);


	document.getElementById("faceca").addEventListener("click", setPersonagem);
	document.getElementById("lep").addEventListener("click", setPersonagem);
	document.getElementById("comunica").addEventListener("click", setPersonagem);
}

function iniciarJogo() {
	document.getElementById("faceca").remove();
	document.getElementById("lep").remove();
	document.getElementById("comunica").remove();
	document.getElementById("menu").remove();

	var cerveja = {};
	var dp = {};
	var dp1 = {};
	var dp2 = {};
	var dp3 = {};
	var dp4 = {};
	var dp5 = {};
	var dp6 = {};
	var pontuacao = 0;
	var vidas = 3;


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
	estudanteImage.src = personagem;

	// Cerveja
	var cervejaReady = false;
	var cervejaImage = new Image();
	cervejaImage.onload = function () {
		cervejaReady = true;
	};
	cervejaImage.src = "img/cerveja.png";

	// DP
	var dpReady = false;
	var dpImage = new Image();
	 	dpImage.onload = function () {
	 	dpReady = true;
	};
	dpImage.src = "img/dp.png";

	var dp1Ready = false;
	var dp1Image = new Image();
	 	dp1Image.onload = function () {
	 	dp1Ready = true;
	};
	dp1Image.src = "img/dp.png";

	var dp2Ready = false;
	var dp2Image = new Image();
	 	dp2Image.onload = function () {
	 	dp2Ready = true;
	};
	dp2Image.src = "img/dp.png";

	var dp3Ready = false;
	var dp3Image = new Image();
		dp3Image.onload = function () {
		dp3Ready = true;
	};
	dp3Image.src = "img/dp.png";

	var dp4Ready = false;
	var dp4Image = new Image();
		dp4Image.onload = function () {
		dp4Ready = true;
	};
	dp4Image.src = "img/dp.png";

	var dp5Ready = false;
	var dp5Image = new Image();
		dp5Image.onload = function () {
		dp5Ready = true;
	};
	dp5Image.src = "img/dp.png";

	var dp6Ready = false;
	var dp6Image = new Image();
		dp6Image.onload = function () {
		dp6Ready = true;
	};
	dp6Image.src = "img/dp.png";



	// DECLARACAO DE VARIÁVEIS E OBJETOS
	var estudante = {
		velocidade: setVelocidade
	};

	if (setVelocidade == 256) {
		var velocidadeJogo = 8;
	} else if (setVelocidade == 456) {
		var velocidadeJogo = 5;
	} else {
		var velocidadeJogo = 0.0001;
	}

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

		dp1.x = 32 + (Math.random() * (canvas.width - 64));
		dp1.y = canvas.height - 480;

		dp2.x = 32 + (Math.random() * (canvas.width - 64));
		dp2.y = canvas.height - 480;

		dp3.x = 32 + (Math.random() * (canvas.width - 64));
		dp3.y = canvas.height - 480;

		dp4.x = 32 + (Math.random() * (canvas.width - 64));
		dp4.y = canvas.height - 480;

		dp5.x = 32 + (Math.random() * (canvas.width - 64));
		dp5.y = canvas.height - 480;

		dp6.x = 32 + (Math.random() * (canvas.width - 64));
		dp6.y = canvas.height - 480;

		// Cria a cerveja em um lugar aleatorio
	    cerveja.x = 32 + (Math.random() * (canvas.width - 64));
		cerveja.y = canvas.height - 480;
	};

	setInterval(function(){ dp.y = dp.y+1}, velocidadeJogo);
	setInterval(function(){ dp1.y = dp1.y+1}, velocidadeJogo);
	setInterval(function(){ dp2.y = dp2.y+1}, velocidadeJogo);
	setInterval(function(){ dp3.y = dp3.y+1}, velocidadeJogo);
	setInterval(function(){ dp4.y = dp4.y+1}, velocidadeJogo);
	setInterval(function(){ dp5.y = dp5.y+1}, velocidadeJogo);
	setInterval(function(){ dp6.y = dp6.y+1}, velocidadeJogo);
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

		if ( estudante.x <= (dp1.x + 32) && dp1.x <= (estudante.x + 32) && estudante.y <= (dp1.y + 32) && dp1.y <= (estudante.y + 32)) {
			if(vidas == 1){
				acabou();
			} else{
				vidas--;
				reset();
			}

		}

		if ( estudante.x <= (dp2.x + 32) && dp2.x <= (estudante.x + 32) && estudante.y <= (dp2.y + 32) && dp2.y <= (estudante.y + 32)) {
			if(vidas == 1){
				acabou();
			} else{
				vidas--;
				reset();
			}

		}

		if ( estudante.x <= (dp3.x + 32) && dp3.x <= (estudante.x + 32) && estudante.y <= (dp3.y + 32) && dp3.y <= (estudante.y + 32)) {
			if(vidas == 1){
				acabou();
			} else{
				vidas--;
				reset();
			}

		}

		if ( estudante.x <= (dp4.x + 32) && dp4.x <= (estudante.x + 32) && estudante.y <= (dp4.y + 32) && dp4.y <= (estudante.y + 32)) {
			if(vidas == 1){
				acabou();
			} else{
				vidas--;
				reset();
			}

		}

		if ( estudante.x <= (dp5.x + 32) && dp5.x <= (estudante.x + 32) && estudante.y <= (dp5.y + 32) && dp5.y <= (estudante.y + 32)) {
			if(vidas == 1){
				acabou();
			} else{
				vidas--;
				reset();
			}

		}

		if ( estudante.x <= (dp6.x + 32) && dp6.x <= (estudante.x + 32) && estudante.y <= (dp6.y + 32) && dp6.y <= (estudante.y + 32)) {
			if(vidas == 1){
				acabou();
			} else{
				vidas--;
				reset();
			}

		}

		if(cerveja.y >= canvas.height
			|| dp.y >= canvas.height
			|| dp1.y >= canvas.height
			|| dp2.y >= canvas.height
			|| dp3.y >= canvas.height
			|| dp4.y >= canvas.height
			|| dp5.y >= canvas.height
			|| dp6.y >= canvas.height){
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
		document.getElementById("jubilou").innerHTML = usuarioLogado.login + " você JUBILOU! <br> Sua pontuação foi: "+pontuacao;
		atualizarRanking(pontuacao);
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

		if (dp1Ready) {
			ctx.drawImage(dp1Image, dp1.x, dp1.y);
		}

		if (dp2Ready) {
			ctx.drawImage(dp2Image, dp2.x, dp2.y);
		}

		if (dp3Ready) {
			ctx.drawImage(dp3Image, dp3.x, dp3.y);
		}

		if (dp4Ready) {
			ctx.drawImage(dp4Image, dp4.x, dp4.y);
		}

		if (dp5Ready) {
			ctx.drawImage(dp5Image, dp5.x, dp5.y);
		}

		if (dp6Ready) {
			ctx.drawImage(dp6Image, dp6.x, dp6.y);
		}

		if (cervejaReady) {
			ctx.drawImage(cervejaImage, cerveja.x, cerveja.y);
		}

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
