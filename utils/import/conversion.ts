"use server"
import * as XLSX from 'xlsx';
import fs from 'fs';
import updateTable from './updateTable';
import { RawCutoff } from '@/lib/variables';

const conversion = async () => {
    try {
        const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSp71hZLWrgwrMpxBb5MN4IbahW6Y3-h7vm_fCxQyslMmNiQmlXeHxZEFXUgWMyd8zKjEufQzSYmNsh/pub?output=xlsx")
        const buffer = await response.arrayBuffer()

        const workbook = XLSX.read(buffer, {
            type: "array"
        });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: RawCutoff[] = XLSX.utils.sheet_to_json(worksheet);
        updateTable(jsonData)

        fs.writeFileSync(
            "data.json",
            JSON.stringify(jsonData, null, 2)
        );
    }
    catch (error) {
        console.error(error)
    }
}

export default conversion;



