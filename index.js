var pdfreader = require('pdfreader');
var readerInstance = new pdfreader.PdfReader()
// var filename = "./pdf/sample.pdf";
var filename = './pdf/bill20180623_BSNL.pdf';
var rows = {};
var uniqueRows = {};
var headers = {};

function printRows() {
    Object.keys(rows) // => array of y-positions (type: float)
      .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
      .forEach((y) => console.log((rows[y] || []).join('')));
  }

// readerInstance.parseFileItems(filename, function(err, item){
//     if (!item || item.page) {
//     // end of file, or page
//     printRows();
//     console.log('PAGE:', item.page);
//     rows = {}; // clear rows for next page
//   }
//   else if (item.text) {
//     // accumulate text items into rows object, per line
//     (rows[item.y] = rows[item.y] || []).push(item.text);
//   }
// })

var y;
var line;
var seperator='~';
var textRows = [];
readerInstance.parseFileItems(filename, function(err, item){
    console.log('please wait while it finish removing duplicates')
    if (!item) {
    // end of file, or page
    // printRows();
    // console.log('PAGE:', item.page);
    // rows = {}; // clear rows for next page
    console.log(textRows);
  }
  else if (item.text) {
    if(y != item.y) {
        if(line) {
            var lineIdexInArray = textRows.findIndex( textrow => {
                return textrow == line;
            })
            if(lineIdexInArray >= 0) {
                console.log('found duplicate ' + line);
            } else {
                textRows.push(line);
            }
            

        }
        // first item of row
        line = item.text;
        y = item.y;

    } else {
        //next item of row
        line = line + seperator + item.text
    }
    // accumulate text items into rows object, per line
    // (rows[item.y] = rows[item.y] || []).push(item.text);
  }
})

function RemoveDuplicate() {
    

}