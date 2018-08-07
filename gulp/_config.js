function config() {
	this.ftp = {
		// Client settings
		client: '', // client name
		deploy: '', // folder name
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
		// litmus
    api: '', // Litmus Account settings > Settings = Customer API Subdomain
    user: '', // Litmis username
    pass: '', // Litmus password
    url: 'https://' + '<%= cfg.litmus.api %>' + '.litmus.com'
	};

	//noinspection JSUnresolvedVariable
	return {
		src: {
			templates: 'app/layout/',
			sass: 'app/_sass/**/*.scss',
			sassMain: 'app/_sass/main.scss',
			images: 'app/_images/**/*.*'
		},

		dist: {
			root: 'dist',
			html: 'dist',
			htmlFiles: 'dist/*.html',
			css: 'dist/css',
			images: 'dist/images'
		},

    // mailgun
		email: {
			key: '',
			sender: '',
			recipient: [''],
			subject: ftp.deploy
		},

		ftp: {
			deploy: ftp.deploy,
			client: ftp.client,
			month: ftp.month,
			year: ftp.year
		},

		ftpConfig: {
			dest: 'wwwroot/email/httpdocs/' + ftp.client + '/newsletter/' + ftp.year + ftp.month + '/' + ftp.deploy,
			absCDN: 'http://your.domain.com/' + ftp.client + '/newsletter/' + ftp.year + ftp.month + '/' + ftp.deploy
		},

		lit: {
			api: ftp.api,
			user: ftp.user,
			pass: ftp.pass,
			url: 'https://' + ftp.api + '.litmus.com'
		}
	}
}

module.exports = config;
