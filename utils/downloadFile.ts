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
  const extension = parse(filename).ext;  
  const newFilename = filename.replace(extension, '.jpeg');
  const newFilePath = join(path, newFilename);
  if(fs.existsSync(newFilePath)) {
    return newFilename;
  }
  const response = await fetch(url);
  
  if(!response.ok) {
    console.dir(response.statusText);
    throw new Error('Failed to download drive file');
  }


  const buffer = await response.arrayBuffer();

  try {
    await sharp(buffer)
      .resize(900)
      .jpeg()
      .toFile(newFilePath);
  } catch (error) {

  }
  return newFilename;
};
export default downloadFile;
