const fs = require('fs')
const camelCase = require('lodash.camelcase');
const converter = (csvData) => {
    csvData = csvData.split('\n').map(row => row.trim().replace(/"/g, ""))

    let headings = csvData[0].split(',')

    let xml = ``

    for(let i = 1; i < csvData.length; i++) {
        let details = csvData[i].split(',').map(v => v.replace(/"/g, ""))
        xml += "<productData>\n"
        for(let j = 0; j < headings.length; j++) {
            const s = camelCase(headings[j])
            xml += `<${s}>${details[j]}</${s}>
    `;
        }
        xml += "</productData>\n"
    }

    return `<CATALOG>${xml}</CATALOG>`
}

fs.readFile('./test.csv', 'utf8', (err, result) => {
    if (err) {
        throw new Error('File is broken')
    }

    const content = converter(result)

    fs.writeFile('./result.xml', content, (err) => {
        if (err) {
            throw new Error('Could not write file')
        }

        console.log('Check result.xml')
    })
})

