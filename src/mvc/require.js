(function(global) {
	
	var cache = {};
	
	function Module(path) {
		this.pathname = path;
		this.exports = {};
	};
	
	Module.prototype = {
	
		load: function() {
			var request = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(),
				path = this.getPath();
			request.open('GET', path, false); //asynchronous = false
			try {
				request.send();
			} catch(e) { return null; }
			if ( request.status == 500 || request.status == 404 || request.status == 2 ||(request.status == 0 && request.responseText == '') ) return null;
			var source = request.responseText;
			
			if(source === null) {
				throw new Error('Module not found ('+path+')');
			}
			
			this.compile(source);
			return this;
		},
		
		getPath: function() {
			return this.pathname + '.js';
		},
		
		compile: function(source) {
			var fn = new Function('exports', 'require', source);
			fn.apply(this.exports, [this.exports, require]);
			return this;
		}
	
	};
	
	var require = global.require = function(path) {
		if(cache[path]) return cache[path];

		return cache[path] = new Module(path).load().exports
	};
})(this);