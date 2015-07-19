Template.home.helpers({
  'sheets':function(){
    return db_clex_sheets.find({},{sort:{time:-1}});
  }
});
