/*
	GetClass - a class to implement into other classes that provides get_class
	function. Returns classname of the instance. Uses Hash.findKey
*/
// [object Object].get_class() == 'Model.Ajax'
/*Hash.implement({
	findKey: function(key) {  
        if(key === null || typeof key == 'undefined') return null;
		var val = this.keyOf(key);
        if(val && val != 'constructor') return val;
        for(var prop in this) {   
            if(this.hasOwnProperty(prop) && typeof this[prop] == 'object') {
				if($type(this[prop]) == 'window' || $type(this[prop]) == 'element' || $type(this[prop]) == 'document') continue; // HACK: prevents window.top circular loop, but no others.
				console.log('this: %o, prop: %o',this, prop);
				//alert(this+ ' ' + prop);
				
				val = $H(this[prop]).findKey(key);
                if(val) {
					return this.findKey(prop) + '.' + val;
                }
            }
        }
		return '';
    }   
});*/

var GetClass = new Class({
	get_class: function() {
		return this.$class ?
			this.$class :
			this.$class = GetClass.get_class(this);//keyOf(this.constructor);
	}
});

GetClass.get = (function() {
	var ignore = ['sessionStorage'];
	return function(obj) {
		var win = new Hash({});
		for(var key in window) {
			if(ignore.indexOf(key) !== -1) continue;			
			win.set(key, window[key]);
		}
		return win.keyOf(obj);//.keyOf(obj);
	}
})();

GetClass.getName = function(obj) {
	return obj.$name ?
		obj.$name :
		obj.$name = obj.prototype.$class || GetClass.get(obj)
};
GetClass.get_class = function(obj) {
	return obj.$class ?
		obj.$class :
		obj.$class = (obj.constructor && GetClass.get(obj.constructor));
}