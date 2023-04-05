import fs from 'node:fs';
import { join } from 'node:path';
import stream from 'node:stream';
import { finished } from 'node:stream/promises';

const scandicRegex = /[ÄäÖöÅå]/g;
const scandicCharMap:Record<string, string> = {
  Ä: 'A',
  ä: 'a',
  Ö: 'O',
  ö: 'o',
  Å: 'a',
  å: 'a'
};

export const replaceScandicCharacters = (text: string) =>
  text.replace(scandicRegex, char => scandicCharMap[char]);
  
const downloadFile = async (url: string, path: string, filename: string) => {
  if(!fs.existsSync(path)) { 
    fs.mkdirSync(path, { recursive: true });
  }
  const filePath = join(path, filename);
  console.log(filePath, path, filename);
  if(fs.existsSync(filePath)) {
    return;
  }
  const response = await fetch(url);
  // @ts-ignore fromWeb is not found even it is there
  const body = stream.Readable.fromWeb(response.body);
  const writeStream = fs.createWriteStream(filePath);
  await finished(
    body
      .pipe(writeStream)
  );
};
export default downloadFile;
