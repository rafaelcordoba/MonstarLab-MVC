/*
	Model.Fields - Field types for the $data in Models.
	Dependencies: mvc/Model.js
*/
Model.Fields = {
	
	Field: new Class({
		
		Implements: Options,
		
		options: {
			type: String
		},
		
		initialize: function(type, options) {
			options = options || {};
			options.type = type || options.type;
			this.setOptions(options);
		},
		
		screen: function(value) {
			return value instanceof this.options.type ? value : new this.options.type(value);
		}
		
	}),
	
	TextField: function(options) {
		return new this.Field(String, options);
	},
	
	NumberField: function(options) {
		return new this.Field(Number, options);
	},
	
	AutoField: function(options) {
		return this.NumberField(options);
	}
	
};