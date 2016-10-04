const PORT = 8000;

const http = require('http');
const qs = require('querystring');

const server = http.createServer((req, res) => {

  let { url, method } = req;
  //let [ path, queryStr ] = url.split('?');
  //let query = qs.parse(queryStr);
  //console.log(`path: ${path} query: ${JSON.stringify(query)}`);


  switch (method) {
    case 'GET':
      let pathArr = url.split('/');
      let pathRoot = pathArr[1];

      switch (pathRoot) {
        case "math":

          let equationObj = {
            add: '+',
            subtract: '-',
            multiply: '*',
            devide: '/'
          }

          let operatorStr = pathArr[2]
          let operator = equationObj[operatorStr];

          if (operator) {
            let equation = pathArr[3] + operator + pathArr[4];
            let answer;
            try {
              answer = eval(equation).toString() + '\n';
            }
            catch(e) {
              res.end(`Err`);
            }
            res.end(answer);
          }


          break;
        default:
          res.statusCode = 404;
          res.end(`Err`);
      }


      break;

    default:
      res.statusCode = 404;
      res.end(`Not found`);

  }

  // switch (path) {
  //   case '/math':
  //
  //       res.end( JSON.stringify(path) );
  //
  //     // res.end('math \n');
  //     break;
  //   default:
  //     let pathStr = JSON.stringify(path);
  //     res.statusCode = 404;
  //     res.end(`Not found`)
  //
  // }

});

server.listen(PORT, err => {
  console.log(err || `Server is listening on port ${PORT}`)
})
