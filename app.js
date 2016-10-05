const PORT = 8000;

const http = require('http');
const qs = require('querystring');
const md5 = require('md5');
const moment = require('moment');

const server = http.createServer((req, res) => {

  let { url, method } = req;

  switch (method) {
    case 'GET':

      let pathArr = url.split('/').map(num => {
        if(num.toLowerCase() === 'pi') {
          return Math.PI;
        } else if(num.toLowerCase() === 'e') {
          return Math.E;
        } else {
          return num;
        }
      });

      let pathRoot = pathArr[1];

// ---------------------------------- Math -------------------------------------
      switch (pathRoot) {
        case "math":

          let operator = pathArr[2];
          let num1 = parseFloat(pathArr[3]);
          let num2 = parseFloat(pathArr[4]);
          let answer;

          if(operator === 'add') {
            answer = num1 + num2;
          } else if(operator === 'subtract') {
            answer = num1 - num2;
          } else if(operator === 'multiply') {
            answer = num1 * num2;
          } else if(operator === 'devide') {
            answer = num1 / num2;
          } else if(operator === 'exponent') {
            answer = Math.pow(num1, num2);
          } else if(operator === 'squareroot') {
            answer = Math.sqrt(num1)
          } else if(operator === 'cuberoot') {
            answer = Math.cbrt(num1)
          } else if(operator === 'area') {
            answer = num1 * num2
          } else if(operator === 'volume') {
            answer = num1 * num2 * parseFloat(pathArr[5])
          } else {
            answer = 'error';
          }

          res.end(`${answer}\n`)
          break;

// -------------------------------- Gravatar -----------------------------------
        case "gravatar":
          let email = md5(pathArr[2]);
          res.end(`http://www.gravatar.com/avatar/${email} \n`)
          break;

// -------------------------------- Analyzer -----------------------------------
        case "analyze":
          let sentence = decodeURI(pathArr[2]);

          let wordCount = sentence.split(' ').length;
          let charCount = sentence.replace(/\s/g, '').length;
          let avLength = charCount / wordCount;

          let values = {
            wordCount,
            charCount,
            avLength
          }

          res.end(`${ JSON.stringify(values) }\n`)
          break;

// ---------------------------------- Age --------------------------------------
        case "age":
          let month = pathArr[2];
          let day = pathArr[3];
          let year = pathArr[4];

          let age = moment().diff(`${year}${month}${day}`, 'years')

          res.end(`${age}`);
          break;

// ------------------------------ Magic 8 ball ---------------------------------
        case "8ball":
          let answers = {
            1: "Yes",
            2: "No",
            3: "Maybe",
            4: "Don't count on it",
            5: "Probably",
            6: "Ask again later"
          }
          let randNum = Math.floor(Math.random() * 6 + 1);
          let answerBall = answers[randNum];

          res.end(`${answerBall}\n`)
          break;
// -------------------------------- -------- -----------------------------------
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
