import { Button, Flex } from "@mantine/core";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IconPlus, IconPrinter } from "@tabler/icons-react";
// import SearchBox from "@/src/Components/SearchBox";
import { ITableViewField } from "./types";
import { ILocation } from "@/src/lib/module/location";

export interface TableViewTopBarProps {
    reportHandler: () => void;
    newItem: () => void;
    title: string;
    filters: Record<string, string>;
    searchHandler: (query: Record<string, string>) => void;
    reportFields?: ITableViewField<any>[];
    data?: any[];
}

export default function TopBar({
    reportHandler,
    newItem,
    title,
    filters,
    searchHandler,
    reportFields,
    data
}: TableViewTopBarProps) {
    const btnNewOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        newItem();
    }

    const btnReportOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // 1. Build headers with guaranteed order
        const baseHeaders = {
            index: 'ردیف',
            location: 'مرکز'
        } as Record<string, string>;
        
        const dynamicHeaders = reportFields?.reduce((acc, field) => {
            acc[field.key as string] = field.title;
            return acc;
        }, {} as Record<string, string>) ?? {};
        
        // Final headers object (order will be preserved because we build it in order)
        const columnHeaders: Record<string, string> = {
            ...baseHeaders,
            ...dynamicHeaders
        };
        
        // 2. Define the EXACT column order you want (this is what matters!)
        const columnOrder = ['index', 'location', ...Object.keys(dynamicHeaders)];
        
        console.log('Column order:', columnOrder);
        console.log('Headers:', columnHeaders);
        console.log('Data:', data);
        
        // 3. Transform data rows to match this exact order
        const standardData = data?.map((r, idx) => {
            const {_id, location, source, destination, connectedAntenna, ...rest} = r as any;
            
            const row: Record<string, any> = {};
            
            columnOrder.forEach(key => {
                if (key === 'index') {
                    row[key] = idx + 1;
                } else if (key === 'location') {
                    row[key] = (location as ILocation)?.name ?? '';
                } else {
                    row[key] = (rest[key] as string)?.toLocaleString() ?? '-';  // rest already has only the dynamic fields
                }
            });
            
            console.log('Row:', row);
            return row;
        });
        
        if (!standardData || standardData.length === 0) return;
        
        // 4. Create worksheet with explicit header order → guaranteed alignment
        const worksheet = XLSX.utils.json_to_sheet(standardData, {
            header: columnOrder,          // This forces exact column order
            skipHeader: false             // We want headers
        });
        
        // 5. Replace the auto-generated English keys with Persian titles
        columnOrder.forEach((key, colIdx) => {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIdx });
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].v = columnHeaders[key];
            }
        });
        
        // Optional: Make columns wide enough for Persian text
        worksheet['!cols'] = columnOrder.map(() => ({ wch: 18 }));
        
        // 6. Export
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'گزارش');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, "report.xlsx");    
    }
    return (
        <Flex 
            direction={{ base: 'column', sm: 'row' }}
            mb={'md'} 
            gap={'md'}>
            <Button 
                variant="filled"
                rightSection={<IconPrinter size={16}/>}
                onClick={btnReportOnClickHandler}>
                چاپ گزارش
            </Button>
            <Button 
                variant="outline"
                rightSection={<IconPlus size={16}/>}
                onClick={btnNewOnClickHandler}>
                {`افزودن ${title}`}
            </Button>
            {/* <SearchBox filterFields={filters} searchHandler={searchHandler} /> */}
        </Flex>
    );
}
