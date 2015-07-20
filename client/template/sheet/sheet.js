Template.sheet.rendered = function(){
  var data = new Array();
  var my_table = $('#my_table');
  var sheet_id  = Session.get("sheet_id");
  var col_titles = db_clex_columns.find({sheet_id:sheet_id},{sort:{index:1}}).fetch().map(function(item){
    return item.col_title;
  });
  console.log(col_titles);
  var col_widths = db_clex_columns.find({sheet_id:sheet_id},{sort:{index:1}}).fetch().map(function(item){
    return (item.col_title.length * 11) < 50 ? 50 : (item.col_title.length * 11);
  });
  var columns =  db_clex_columns.find({sheet_id:sheet_id},{sort:{index:1}}).fetch().map(function(item){
    return {data:item.col_name};
  });
  console.log(columns);
  if(sheet_id){
    data = db_clex_data.find({sheet_id:sheet_id},{sort:{time:1}}).fetch();
    console.log(data);
  }
  var width = $('#core_header_panel').width() || 600;
  my_table.handsontable({
		colHeaders: col_titles,
		colWidths:col_widths,
		columns: columns,
		rowHeaders: true,
		contextMenu: true,
		autoWrapCol: true,
		autoWrapRow: true,
		stretchH: "last",
		data:data,
		fixedColumnsLeft:1,
		// height:window.innerHeight-($('header').height()+$('.row').height()+30),
		// width: width,
		minSpareRows:50
  });
}
