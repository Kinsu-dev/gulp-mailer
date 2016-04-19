function config() {
	this.ftp = {
		// Client settings
		client 			: 'Novobanco', // client name
		deploy			: 'Modular', // folder name
		year 			: new Date().getFullYear(),
		// litmus
		api				: 'supermarocas',
		user			: 'supermarocas@hotmail.com',
		pass			: '123$abcd'
	};

	return {
		src : {
			templates   : 'app/layout/',
			sass        : 'app/_sass/**/*.scss',
			sassMain    : 'app/_sass/main.scss',
			images      : 'app/_images/**/*.*'
		},

		dist : {
			root        : 'dist',
			html        : 'dist',
			htmlFiles   : 'dist/*.html',
			css         : 'dist/css',
			images      : 'dist/images'
		},

		email : {
			key         : 'key-aef1a29b6a1c11d4d62d7ff0070ac00e',
			sender      : 'postmaster@byclients.com',
			recipient   : [
				'bymario.silva@bycom.com.pt'
			],
			subject		: ftp.deploy
		},

		ftp : {

			deploy		: ftp.deploy,
			client 		: ftp.client,
			year 		: ftp.year
		},

		ftpConfig : {
			dest		: 'wwwroot/bycom.pt/subdomains/clientes/httpdocs/' +  ftp.client + '/newsletter/' + ftp.year +'/'+ ftp.deploy,
			absCDN		: 'http://clientes.bycom.pt/' + ftp.client + '/newsletter/' + ftp.year +'/'+ ftp.deploy
		},

		lit : {
			api			: ftp.api,
			user		: ftp.user,
			pass		: ftp.pass,
			url			: 'https://' + ftp.api + '.litmus.com'
		}
	}
};

module.exports = config;