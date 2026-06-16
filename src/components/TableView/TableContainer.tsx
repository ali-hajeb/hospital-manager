import { toFarsiNumber } from "@/src/utils/number";
import { Box, Button, Group, Table, TableScrollContainer, Text } from "@mantine/core";
import { IconCheckupList, IconChevronLeft, IconChevronRight, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { ITableViewField, IBaseModelObject } from "./types";

export interface TableContainerProps<T extends IBaseModelObject> {
    data: T[];
    fields: ITableViewField<T>[];
    customFieldValue: (data: T, field: keyof T) => string | React.ReactElement | null
    editItemHandler?: (id: string) => void;
    deleteItemHandler?: (id: string) => void;
    viewItemHandler?: (id: string) => void;
    viewServerChecklistHandler?: (id: string) => void;
    maxRows?: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
    isLoading: boolean;
    scrollContainer?: number;
}

export default function TableContainer<T extends IBaseModelObject>({
    fields,
    data,
    customFieldValue,
    editItemHandler,
    deleteItemHandler,
    viewItemHandler,
    viewServerChecklistHandler,
    maxRows,
    page, 
    setPage,
    totalPages,
    isLoading,
    scrollContainer
}: TableContainerProps<T>) {

    const btnPrevPageOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPage(p => p > 0 ? p - 1 : 0);
    }

    const btnNextPageOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPage(p => p + 1 < totalPages ? p + 1 : p);
    }

    const btnEditOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        if (id && editItemHandler) {
            editItemHandler(id);
        }
    }

    const btnDeleteOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        if (id && deleteItemHandler) {
            deleteItemHandler(id);
        }
    }

    const btnViewOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        if (viewItemHandler && id) {
            console.log('table', id);
            viewItemHandler(id);
        }
    };

    const btnViewChecklistOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        if (viewServerChecklistHandler && id) {
            console.log('table', id);
            viewServerChecklistHandler(id);
        }
    };
    return <Box>
        <TableScrollContainer minWidth={scrollContainer || 0}>
            <Table highlightOnHover withTableBorder>
                <Table.Thead bg={'gray.1'}>
                    <Table.Tr>
                        <Table.Th fz={'xs'} ta={'center'}>ردیف</Table.Th>
                        {
                            (editItemHandler || deleteItemHandler || viewItemHandler || viewServerChecklistHandler) &&
                                <Table.Th fz={'xs'} ta={'center'}>عملیات</Table.Th>
                        }
                        {
                            fields.map(item => item.viewCol !== false &&
                                <Table.Th 
                                    fz={'xs'}
                                    key={item.key.toString()}
                                    id={item.key.toString()}
                                    ta={'center'}
                                    title={item.alt}>
                                    {item.title}
                                </Table.Th>)
                        }
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        data?.slice(page * (maxRows || 25), page * (maxRows || 25) + (maxRows || 25)).map((item, i) => <Table.Tr key={item._id}>
                            <Table.Td fz={'xs'} ta={'center'}>
                                {toFarsiNumber((maxRows || 25) * page + i + 1)}
                            </Table.Td>
                            {
                                (editItemHandler || deleteItemHandler || viewItemHandler || viewServerChecklistHandler) && 
                                    <Table.Td fz={'xs'}>
                                        <Group gap={8} justify="center" wrap="nowrap">
                                            {
                                                editItemHandler &&
                                                    <Button p={0} 
                                                        variant="transparent"
                                                        id={item._id}
                                                        c={'gray'}
                                                        title="ویرایش"
                                                        onClick={btnEditOnClickHandler}>
                                                        <IconPencil size={16} />
                                                    </Button>
                                            }
                                            {
                                                deleteItemHandler &&
                                                    <Button p={1} 
                                                        variant="transparent"
                                                        id={item._id}
                                                        c={'gray'}
                                                        title="حذف"
                                                        loading={isLoading}
                                                        onClick={btnDeleteOnClickHandler}>
                                                        <IconTrash size={16} />
                                                    </Button>
                                            }
                                            {
                                                viewItemHandler && 
                                                    <Button p={1} 
                                                        variant="transparent"
                                                        id={item._id}
                                                        c={'gray'}
                                                        title="مشاهده"
                                                        loading={isLoading}
                                                        onClick={btnViewOnClickHandler}>
                                                        <IconEye size={16} />
                                                    </Button>
                                            }
                                            {
                                                viewServerChecklistHandler &&
                                                    <Button p={1}
                                                        variant="transparent"
                                                        id={item._id}
                                                        c={'gray'}
                                                        title="چک لیست"
                                                        onClick={btnViewChecklistOnClickHandler}>
                                                        <IconCheckupList size={16} />
                                                    </Button>
                                            }
                                        </Group>
                                    </Table.Td>
                            }
                            {
                                fields.map(field => field.viewCol !== false && <Table.Td 
                                    fz={'xs'}
                                    key={field.key.toString()}
                                    ta={'center'}
                                    title={field.alt}>
                                    {customFieldValue(item, field.key)}
                                </Table.Td>)
                            }
                        </Table.Tr>)
                    }
                </Table.Tbody>
            </Table>
        </TableScrollContainer>
        <Group align="center" justify="center" mt={'md'}>
            <Button 
                onClick={btnPrevPageOnClickHandler}
                disabled={page - 1 <= -1}
                p={0}
                variant="subtle">
                <IconChevronRight size={24} />
            </Button>
            <Text>{toFarsiNumber(`${page + 1}/${totalPages}`)}</Text>
            <Button 
                onClick={btnNextPageOnClickHandler}
                disabled={page + 1 >= totalPages}
                p={0}
                variant="transparent">
                <IconChevronLeft size={24} />
            </Button>
        </Group>
    </Box>
}
