import * as fs from 'fs';
import * as path from 'path';
import { expect } from "@playwright/test";
import { Download } from "@playwright/test";


export class DownloadHelper {
    static cleanup(dirPath: string) {
        if (fs.existsSync(dirPath)) {
            fs.readdirSync(dirPath).forEach(file =>
                fs.unlinkSync(path.join(dirPath, file))
            );
        }
    }

    static validateFileExtension(download: Download, expectedExtension = '.csv') {
        const fileName = download.suggestedFilename();
        expect(fileName.toLowerCase().endsWith(expectedExtension)).toBeTruthy();
    }

    static extractTotalFromCSV(filePath: string): number {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const line = fileContent.split('\n').find(l => l.includes('Total Price:'));
        if (!line) throw new Error('Total Price line not found in CSV');
        const columns = line.split(',');
        return parseFloat(columns[columns.findIndex(c => c.includes('Total Price:')) + 1]);
    }

    static validateCSVStructure(filePath: string) {
        const fileContent = fs.readFileSync(filePath!, 'utf8');
        const totalPriceLine = fileContent
            .split('\n')
            .find(line => line.includes('Total Price:'));

        expect(totalPriceLine).toBeTruthy();

        const columns = totalPriceLine.split(',');
        const csvTotal = parseFloat(columns[columns.findIndex(col => col.includes('Total Price:')) + 1]);
        return csvTotal;
    }
}