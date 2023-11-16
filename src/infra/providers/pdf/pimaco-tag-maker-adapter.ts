import PDFKit from 'pdfkit'

import { TagMaker } from './tag-maker'
import { Patient } from '@/domain/enterprise/entities/patient'

const format = {
  pimaco_6180: {
    cols: [4.8, 74.6, 144.4],
    rows: [12.7, 38.1, 63.5, 88.9, 114.3, 139.7, 165.1, 190.5, 215.9, 241.3],
    maxTagsInPage: 30,
    tagSize: {
      width: 66.7,
      height: 25.4,
      align: 'left',
    },
    paperSize: [215.9, 279.4],
    paperMargins: {
      top: 12.7,
      bottom: 12.7,
      left: 4.8,
      right: 4.8,
    },
  },
}

export class Pimaco6180TagMakerAdapter implements TagMaker {
  private currentPage = 0
  private currentTag = 0
  private row = 0
  private column = 0
  private document

  constructor() {
    this.document = new PDFKit()
  }

  async make(data: Patient[]): Promise<{ fileUrl: string }> {
    console.log(JSON.stringify(data, null, 2))
    return { fileUrl: 'file.pdf' }
  }
}

// var pt = new PrintTag('pimaco_6080');
//     const lineHeight = 4

//     pt.doc.pipe( fs.createWriteStream('./assets/pdf/etiquetas.pdf') );
//     pt.doc.fontSize(4);

//     pt.makeTickets({
//       count: input.length
//     }, function (index: number, marginLeft, marginTop, size, next) {

//       pt.doc.text(input[index].name, marginLeft,  marginTop, size)
//       // ticket box
//       pt.doc.lineWidth(0.3);

//       pt.doc.rect(marginLeft, marginTop, size.width, size.height).stroke();

//       next();
//     }, function() {
//       pt.doc.end();
//     });

//     pt.doc.on('end', function() {
//       console.log('finalizou');
//     })
