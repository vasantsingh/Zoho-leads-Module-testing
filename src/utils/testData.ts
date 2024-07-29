import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '..', 'test-data.json');

export function readTestData() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) || {};
  } catch (error) {
    console.error('Error reading or parsing JSON:', error);
    return {};
  }
}

export function writeTestData(data: object) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
