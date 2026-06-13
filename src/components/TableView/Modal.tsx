import { Alert, Box, Button, Group, Modal, Table, Text } from '@mantine/core'
import { PropsWithChildren } from 'react';
import { IBaseModelObject, ITableViewField } from './types';
import { IconX } from '@tabler/icons-react';

export interface TableViewModalProps<T extends IBaseModelObject> extends PropsWithChildren {
    fields?: ITableViewField<T>[];
    customFieldValue?: (data: T, field: keyof T) => string | React.ReactElement | null;
    opened: boolean;
    close: () => void;
    closeHandler: () => void;
    deleteItemHandler?: (id: string) => void;
    editMode: string | null;
    deleteMode: string | null;
    title: string;
    viewMode?: T | null;
    error?: string | null;
}
export default function TableViewModal<T extends IBaseModelObject>({
    opened,
    // close,
    closeHandler,
    deleteMode,
    editMode,
    title,
    deleteItemHandler,
    viewMode,
    fields,
    customFieldValue,
    error,
    children,
}: TableViewModalProps<T>) {
    const modalOnCloseHandler = () => {
        closeHandler();
        // close();
    }

    const btnDeleteOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (deleteMode && deleteItemHandler) {
            deleteItemHandler(deleteMode);
            closeHandler();
        }
    }

    return <Modal
        opened={opened} 
        onClose={modalOnCloseHandler}
        title={viewMode ? 'نمایش' : editMode ? `ویرایش ${title}` : deleteMode ? `حذف ${title}` : `افزودن ${title}`}>
        {
            error && 
                <Alert variant='light' color='red' title='خطا' icon={<IconX />}>
                    {error}
                </Alert>
        }
        { (viewMode && fields && customFieldValue) ? <Table variant='vertical'>
            <Table.Tbody>
                {
                    fields.map(field =>  <Table.Tr key={field.key.toString()} >
                        <Table.Th 
                            fz={'xs'}
                            key={`${field.key.toString()}-${field.title}`}
                            id={field.key.toString()}
                            ta={'center'}
                            title={field.alt}>
                            {field.title}
                        </Table.Th>
                        <Table.Td 
                            fz={'xs'}
                            ta={'center'}
                            style={{whiteSpace: 'pre-wrap'}}
                            title={field.alt}>
                            {customFieldValue(viewMode, field.key)}
                        </Table.Td>
                    </Table.Tr>)
                }
            </Table.Tbody>
        </Table> : deleteMode ? <Box>
                <Text>آیا از حذف ردیف مطمئن هستید؟</Text>
                <Group justify='end'>
                    <Button onClick={btnDeleteOnClickHandler}>بله</Button>
                    <Button variant='transparent' onClick={modalOnCloseHandler}>خیر</Button>
                </Group>
            </Box>: children}
    </Modal>
}
