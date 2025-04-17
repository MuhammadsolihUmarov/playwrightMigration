import * as fs from 'fs';
import { Download, expect } from "@playwright/test";
import Papa from 'papaparse';
import * as path from "path";

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
        expect(
            fileName.toLowerCase().endsWith(expectedExtension),
            `Expected file extension "${expectedExtension}", got "${fileName}"`
        ).toBeTruthy();
    }

    private static parseCSV(filePath: string): Array<Record<string, string>> {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data, errors } = Papa.parse<Record<string, string>>(content, {
            header: true,
            skipEmptyLines: true,
        });
        if (errors.length) {
            throw new Error(
                'CSV parse errors:\n' +
                errors.map(e => `${e.row}: ${e.message}`).join('\n')
            );
        }
        return data;
    }

    private static detectTotalPriceHeader(headers: string[]): string {
        const header = headers.find(h => /total[_ ]?price/i.test(h));
        if (!header) {
            throw new Error(
                `No "total price" column found in CSV headers: ${headers.join(', ')}`
            );
        }
        return header;
    }

    static validateCSVStructure(filePath: string) {
        const records = this.parseCSV(filePath);
        expect(records.length, 'CSV should have at least one data row').toBeGreaterThan(0);

        const headers = Object.keys(records[0]);
        this.detectTotalPriceHeader(headers);
    }

    static extractTotalFromCSV(filePath: string): number {
        const records = this.parseCSV(filePath);
        const headers = Object.keys(records[0]);
        const priceCol = this.detectTotalPriceHeader(headers);

        const summaryRow = records.find(r =>
            typeof r.sku === 'string' && r.sku.trim().startsWith('Total Price:')
        );
        if (!summaryRow) {
            throw new Error(`Cannot find the summary row ("Total Price:") in the CSV`);
        }

        const rawValue = summaryRow[priceCol]!;
        const n = parseFloat(rawValue);
        if (Number.isNaN(n)) {
            throw new Error(`Invalid number in column "${priceCol}": ${rawValue}`);
        }
        return n;
    }
}
