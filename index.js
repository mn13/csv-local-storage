const papa = require('papaparse');
const fs = require('fs');

let data = [];

module.exports = {
  update(path) {
    return new Promise((resolve, reject) => {
      try {
        const b = fs.readFileSync(path);
        let csv;
        const [header, ...rest] = b.toString(); // 'utf8'
        csv = [header.toLowerCase(), ...rest].join('\n');
        papa.parse(csv, {
          header: true,
          delimiter: ';',
          complete: function (results) {
            data = results.data;
            resolve(data);
          }
        })
      } catch (error) {
        reject(error);
      }
    })
  },
  getCollection(key) {
    return [...new Set(data.map(o => o[key]))]
  },
  get() {
    return [...data]
  }
}