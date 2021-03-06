function checkIfArrayIsUnique(arr) {
  var map = {},
    i;
  for (i = 0; i < arr.length; i++) {
    if (map[arr[i]]) {
      return false;
    }
    map[arr[i]] = true;
  }
  return true;
}

function arrays_to_objects(data) {
  if (data && data instanceof Array) {
    var result = [];
    var headers = data[0];
    for (var i = 1; i < data.length; i++) {
      if(data[i].length > 0){
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j]] = data[i][j];
        }
        result.push(row);
      }
    }
    return result;
  } else {
    return [];
  }
}

function to_array(workbook, config) {
  var result = {};
  if (config && config.sheet_name) {
    if (workbook.SheetNames.indexOf(config.sheet_name) > -1) {
      var obj = {};
      obj["header"] = config.header ? config.header : 1;
      var roa = XLSX.utils.make_json(workbook.Sheets[config.sheet_name], obj);
      if (roa.length > 0) {
        if (config.header_row) {
          result[config.sheet_name] = roa.slice(config.header_row);
        } else {
          result[config.sheet_name] = roa;
        }
      }
    }
  } else {
    workbook.SheetNames.forEach(function(sheetName) {
      var roa = XLSX.utils.make_json(workbook.Sheets[sheetName], {
        header: 1
      });
      if (roa.length > 0) {
        result[sheetName] = roa;
      }
    });
  }
  return result;
}
var SHEET = {};
SHEET.extractColumns = function(row) {
  if (row) {
    var col_titles = Object.keys(row);
    var columns = [];
    if (checkIfArrayIsUnique(col_titles)) {
      col_titles.forEach(function(col) {
        var obj = {};
        obj.col_title = col;
        obj.col_name = col.replace(/\s+/g, "_").replace(/[^A-Z0-9_]/ig, "").toLowerCase();
        columns.push(obj);
      });
      return columns;
    } else {
      console.log("Duplicate columns");
      return null;
    }
  } else {
    return null;
  }
};
Template.file_upload.events({
  'change #file_upload': function() {
    var file = $('#file_upload')[0].files[0];
    var filename = file ? file.name : "";
    var header_row = parseInt($('#header_row').val(), 0);
    var reader = new FileReader();
    reader.onload = function(event) {
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      ///========== reads data from first sheet, consider first row as header row =========//
      var cfg;
      if (header_row && (!isNaN(header_row))) {
        cfg = {
          sheet_name: workbook.SheetNames[0],
          header: 1,
          header_row: 2
        };
      } else {
        cfg = {
          sheet_name: workbook.SheetNames[0],
          header: 1
        };
      }
      var wb_data = to_array(workbook, cfg);
      // var first_sheet_data = wb_data[];
      console.log(wb_data);
      var headers = wb_data[workbook.SheetNames[0]][0],
        columns = [],
        map = {};
      // if (checkIfArrayIsUnique(headers)) {
        headers.forEach(function(col,index) {
          var obj = {};
          obj.col_title = col;
          obj.index = index;
          obj.col_name = col.replace(/\s+/g, "_").replace(/[^A-Z0-9_]/ig, "").toLowerCase().substr(0, 8);
          var i = 1;
          var new_col_name = obj.col_name;
          while (_.findWhere(columns, {col_name: new_col_name})) {
            new_col_name = obj.col_name + i;
            i++;
          }
          obj.col_name = new_col_name;
          columns.push(obj);
        });
        // console.log();
        var sheet_id = db_clex_sheets.insert({
          name: filename,
          time: Date.now()
        });
        columns.forEach(function(column) {
          map[column.col_title] = column.col_name;
          column.sheet_id = sheet_id;
          db_clex_columns.insert(column);
        });
        // ===== replace headers with col_name in wb_data========//
        wb_data[workbook.SheetNames[0]][0] = wb_data[workbook.SheetNames[0]][0].map(function(header,index) {
          column = _.findWhere(columns, {index: index});
          return column ? column.col_name : undefined;
        })
        var sheet_data_json = arrays_to_objects(wb_data[workbook.SheetNames[0]]);
        console.log(sheet_data_json);
        sheet_data_json.forEach(function(row) {
          row.time = Date.now();
          row.sheet_id = sheet_id;
          db_clex_data.insert(row);
        });
      // } else {
        // console.log("Error: Duplicate column headers..");
      // }
    }
    if (file) {
      reader.readAsBinaryString(file);
    }
  }
});
