const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path')

const makeBlanks = function(schoolName, fyStart) {
    const destName = path.join(__dirname, schoolName+'_BlankLabels.pdf');
    console.log(destName)
    var pdfStream = fs.createWriteStream(destName);
    try {
        const fyString = `FY ${fyStart}-${fyStart+1}`
        const inch = (num) => {
            return num*72;
        };

        const startX = 13.5;
        const startY = 36;

        let y = startY;

        const drawLabel = ((doc, xPos, yPos) => {
            const textStartx = xPos + 17;
            const textStarty = yPos + 10;
            doc.rect(xPos, yPos, inch(2.625),inch(1))
            doc.fontSize(8);
            doc.text(`Consolidation of Funds - ${fyString}`, textStartx, textStarty, {
                width: 150,
                align: 'center'
            });
            
            doc.text(`${schoolName}  ${fyString}`, textStartx, textStarty + 20);
            doc.text("S/N:_________________________________", textStartx-10, textStarty+40)
            
        
        })

        const pdf = new PDFDocument({
            size: [inch(8.5),inch(11)],
            layout: 'portrait',
            margins: {
                top: inch(0.5),
                bottom: inch(0.5),
                left: inch(0.1875),
                right: inch(0.1875)
            }
        });
        
        pdf.pipe(pdfStream);
        for (let i = 0; i<10; i++ ){
            drawLabel(pdf, startX, y);
            drawLabel(pdf, inch(2.9375), y);
            drawLabel(pdf, inch(5.6875), y);
            y += inch(1);
        
        }
        
        pdf.stroke();
        pdf.end();
    } catch (error) {
        console.error("Error Making PDF: ", error);
    }
    pdfStream.addListener('finish', () => {
        console.log(`${schoolName} has finished generating`)
    })

}

module.exports = makeBlanks;