import { parse } from 'csv-parse/sync';
import * as path from "path";
import * as fs from "fs";

export function getLocalizationData() {
    const csvPath = path.resolve(process.cwd(), 'src/test-data/localizationData.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    return records.map(row => ({
        languageName: row.languageName.trim(),
        url: row.url.trim(),
        headerKeywords: row.headerKeywords.split(',').map(k => k.trim()),
        footerKeywords: row.footerKeywords.split(',').map(k => k.trim()),
    }));
}
