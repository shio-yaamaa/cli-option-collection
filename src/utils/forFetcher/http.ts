import path from 'path';
import fs from 'fs';
import https from 'https';
import { exec } from 'child_process';
import axios from 'axios';
import { ensureDirSync, rmSync, moveSync } from 'fs-extra';
import { JSDOM, VirtualConsole } from 'jsdom';
import decompress from 'decompress';

const decompressTarxz = require('decompress-tarxz');

export const DOWNLOADS_DIRECTORY = path.resolve(process.cwd(), 'downloads');

export const fetchPlainTextFromURL = async (url: URL): Promise<string> => {
  const response = await axios.get(url.toString());
  return response.data;
};

export const fetchDocumentFromURL = async (url: URL): Promise<Document> => {
  const virtualConsole = new VirtualConsole();
  const dom = await JSDOM.fromURL(url.toString(), { virtualConsole });
  return dom.window.document;
};

// When you want to apply some filters before feeding response to the JSDOM parser,
// use this instead of fetchDocumentFromURL.
export const fetchDocumentFromURLViaFilter = async (
  url: URL,
  filter: (data: string) => string
): Promise<Document> => {
  const response = await axios.get(url.toString());
  const data = filter(response.data);
  return new JSDOM(data).window.document;
};

export const fetchDocumentFromManPageURL = async (
  url: URL
): Promise<Document> => {
  return new Promise((resolve, reject) => {
    exec(`curl -s "${url}" | mandoc -T html`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(new JSDOM(stdout).window.document);
    });
  });
};

export const fetchDocumentFromManFile = async (
  filename: string
): Promise<Document> => {
  return new Promise((resolve, reject) => {
    exec(`cat ${filename} | mandoc -T html`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(new JSDOM(stdout).window.document);
    });
  });
};

// Returns the path to the downloaded file.
export const download = async (url: URL, filename: string): Promise<string> => {
  ensureDirSync(DOWNLOADS_DIRECTORY);
  const filePath = path.resolve(DOWNLOADS_DIRECTORY, filename);
  const file = fs.createWriteStream(filePath);
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(filePath);
        });
      })
      .on('error', (error) => {
        fs.unlink(filePath, () => {});
        reject(error);
      });
  });
};

const decompressPlugins = new Map<string, any[]>([
  ['.tar.xz', [decompressTarxz()]],
]);

// Download and decompresses an archive.
// ext: extension (e.g. ".tar.xz")
export const downloadArchive = async (
  url: URL,
  ext: string,
  filename: string
) => {
  const basename = path.basename(url.toString());
  const basenameWithoutExt = path.basename(url.toString(), ext);

  await download(url, basename);

  const archivePath = path.resolve(DOWNLOADS_DIRECTORY, basename);
  await decompress(archivePath, DOWNLOADS_DIRECTORY, {
    plugins: decompressPlugins.get(ext),
  });
  rmSync(archivePath);

  // Rename the decompressed directory.
  moveSync(
    path.resolve(DOWNLOADS_DIRECTORY, basenameWithoutExt),
    path.resolve(DOWNLOADS_DIRECTORY, filename)
  );
};
