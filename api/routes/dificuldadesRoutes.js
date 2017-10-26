'use restrict';
module.exports = function(app) {
	var dificuldade = require('../controllers/dificuldadesController');
	
	app.route('/dificuldade')
		.get(dificuldade.getDificuldades)
		.post(dificuldade.createDificuldade);
		
	app.route('/dificuldade/:dificuldadeId')
		.get(dificuldade.getDificuldade)
		//.put(dificuldade.updateDificuldade)
		.delete(dificuldade.deleteDificuldade);	
};
