Template.sheet_entry.events({
  'click .sheet_item':function(e){
    e.preventDefault();
    var el = e.currentTarget;
    var sheet_id = $(el).attr("sheet_id");
    if(sheet_id){
      Router.go('sheet',{sheet_id:sheet_id});
    }
  },
  'click .del_btn':function(e){
    e.preventDefault();
    var el = e.currentTarget;
    var sheet_id = $(el).attr("sheet_id");
    // console.log("dle",sheet_id);
    var prompt = confirm("Do you really want to delete this sheet ?");
    if(sheet_id && prompt){
      // console.log(db_clex_data.find({sheet_id:sheet_id}).count());
      db_clex_data.find({sheet_id:sheet_id}).forEach(function(item){
        db_clex_data.remove({_id:item._id});
      });
      db_clex_columns.find({sheet_id:sheet_id}).forEach(function(item){
        db_clex_columns.remove({_id:item._id});
      });
      db_clex_sheets.find({_id:sheet_id}).forEach(function(item){
        db_clex_sheets.remove({_id:item._id});
      });
    }
  }
});
