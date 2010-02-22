(function(global) {
	
	var pathify = function(path) {
		return path + '.js';
	}
	
	var xhr = function(path) {
		var request = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		request.open('GET', path, false); //asynchronous = false
		try {
			request.send();
		} catch(e) { return null; }
		if ( request.status == 500 || request.status == 404 || request.status == 2 ||(request.status == 0 && request.responseText == '') ) return null;
		return request.responseText;
	};
	
	var wrap = function(source) {
		return new Function('exports', source + '\nreturn exports;');
	}
	
	global.require =  function(path) {
		var source = xhr(pathify(path));
		if(source === null) {
			throw new Error('Module not found ('+path+')');
		}
		
		var fn = wrap(source);
		return fn({});
	};
})(this);