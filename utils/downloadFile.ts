import fs from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

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
  if(fs.existsSync(filePath)) {
    return null;
  }
  const response = await fetch(url);
  
  const extension = parse(filename).ext;  
  const newFilename = filename.replace(extension, '.jpeg');
  const newFilePath = join(path, newFilename);

  const buffer = await response.arrayBuffer();

  await sharp(buffer)
    .resize(900)
    .jpeg()
    .toFile(newFilePath);
  return newFilename;
  
  // console.log({ filename, newFilename, newFilePath});
  // const writeStream = fs.createWriteStream(newFilePath);
  // await finished(
  //   body
  //     .pipe(compressImageAndSaveStream)
  //     .pipe(writeStream)
  // );
  // return newFilename;
};
export default downloadFile;
