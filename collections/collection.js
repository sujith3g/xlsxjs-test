fullAccess = function(doc,user){
  return true;
}
db_clex_sheets = new Meteor.Collection("clex_sheets");
db_clex_columns = new Meteor.Collection("clex_columns");
db_clex_data = new Meteor.Collection("clex_data");
db_clex_sheets.allow({
  insert:fullAccess,
  remove:fullAccess
});
db_clex_columns.allow({
  insert:fullAccess,
  remove:fullAccess
});
db_clex_data.allow({
  insert:fullAccess,
  remove:fullAccess
});
