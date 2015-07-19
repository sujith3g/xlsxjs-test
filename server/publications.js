Meteor.publish('clex_sheets',function(opts,filter){
    opts = opts || {};
    if(filter){
      return db_clex_sheets.find(opts,filter);
    }
    return db_clex_sheets.find(opts);
  });
Meteor.publish("clex_data",function(opts,filter){
    opts = opts || {};
    if(filter){
      return db_clex_data.find(opts,filter);
    }
    return db_clex_data.find(opts);
  });
Meteor.publish("clex_columns",function(opts,filter){
    opts = opts || {};
    // filter = filter || {};
    if(filter){
        return db_clex_columns.find(opts,filter);
    }
    return db_clex_columns.find(opts);
  });
