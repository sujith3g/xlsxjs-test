Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
    return [Meteor.subscribe("clex_sheets"),
    Meteor.subscribe("clex_data"),
    Meteor.subscribe("clex_columns")];
   }
});
Router.map(function() {
	this.route('home', {
		path: '/'
	});
	this.route('sheet',{
		path:"sheet/:sheet_id",
		template:"sheet",
		waitOn:function(){
			Session.set("sheet_id",this.params.sheet_id);
		}
	})
});
