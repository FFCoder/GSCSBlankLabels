const fs = require('fs');
const csv = require('csv-parser')
const results = [];
const maker = require('./index');

fs.createReadStream('schools.txt')
    .pipe(csv({
        separator: '\\n'
    }))
    .on('data', data => {
        console.log(data)
        results.push(data);
    })
    .on('end', () => {
        results.map(async (school) => {
            await maker(school.School, 20);
            await setTimeout(()=>{}, 1000)
        })
    });