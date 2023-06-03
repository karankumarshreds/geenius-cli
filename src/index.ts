import dotenv from 'dotenv';

import { envChecks, getEnvVariable } from './env-checks';
import { ReadFromFS } from './services/read-from-fs';

dotenv.config();

function main() {
    envChecks(['FILE_NAME']);
    const FILE_NAME = getEnvVariable('FILE_NAME');
    const readFromFs = new ReadFromFS(FILE_NAME);
    readFromFs.updateItemStatus(0, 'progress');
}

main();