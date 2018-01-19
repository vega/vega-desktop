import fs from 'fs';
import { getFormatFromFileName, getFormatFromSpec } from './helper';

export default function(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', function (err, data) {
      if (err) {
        reject('An error occurred reading the file :' + err.message);
        return;
      }

      // onSuccess({
      //   filePath,
      //   mode: getFormatFromFileName(filePath),
      // })

      try {
        const spec = JSON.parse(data);
        resolve({
          spec,
          mode: getFormatFromSpec(spec)
        });
      } catch (ex) {
        reject(`Error: ${ex.message}`);
      }
    });
  });
}