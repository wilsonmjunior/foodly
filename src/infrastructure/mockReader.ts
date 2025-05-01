import path from 'path';
import fs from 'fs/promises';

/**
 * Lê um arquivo JSON dos mocks.
 * @param fileName - Nome do arquivo JSON (sem a extensão .json)
 * @returns Conteúdo do arquivo JSON parseado
 * @note Esta função só funciona no lado do servidor (Server Components, API Routes, Server Actions)
 */
export async function readMock<T>(fileName: string): Promise<T | null> {
    try {
        if (typeof window !== 'undefined') {
            console.error('readMock só pode ser usado no servidor');
            return null;
        }

        const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'mocks', `${fileName}.json`);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContents) as T;
    } catch (error) {
        console.error(`Erro ao ler arquivo mock ${fileName}:`, error);
        return null;
    }
}
