'use restrict';
module.exports = function(app) {
	var ranking = require('../controllers/rankingController');
	
	app.route('/ranking')
		.get(ranking.getRanking)
		.post(ranking.setRanking);
		
};
