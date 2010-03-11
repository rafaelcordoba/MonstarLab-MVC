////MVC init.js. Copyright (c) 2009-2010 Sean McArthur <http://monstarlab.com/>, MIT Style License.

(function(context) {

if(context.init) throw new Error('init.js already included.');

var eachArg = function(func) {
		return function() {
			for(var i = 0; i < arguments.length; i++) {
				func(arguments[i]);
			}
			return this;
		};
	};


var init = function(p) {
	return require(p);
};

init.core = function() {
	var core_files = ['mootools-1.2.4-core','mootools-1.2.4.2-more'];
	if(priv.env.test) {
		core_files = (core_files.join('-nc|')+'-nc').split('|');
	}
	core_files.push('Core');
	return init(core_files, priv.ROOT.dir() + 'core');
};

init.mvc = function() {
	//require MVC packages
};

init.app = function() {
	
};

init.models = eachArg(function(p) {
	init(p.replace('Controller','') + 'Controller', priv.APP_DIR + 'controllers');
});

init.controllers = function() {
	
};

init.views = function() {
	
}

context.init = init;

})(this.exports || this);