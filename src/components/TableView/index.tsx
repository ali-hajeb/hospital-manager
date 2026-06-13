import { Box } from "@mantine/core"
import Modal from './Modal';
import TopBar from "./TopBar";
import TableContainer from "./TableContainer";
import { renderFormFromSchema } from './utils';
import { IBaseModelObject, ITableViewField, SelectOption } from './types';

export interface TableViewProps extends React.PropsWithChildren {
}

const TableView = function TableView({
    children
}: TableViewProps) {
        return <Box>{ children }</Box>
}

TableView.Modal = Modal;
TableView.TopBar = TopBar;
TableView.TableContainer = TableContainer;

export default TableView;
export type {
    ITableViewField,
    IBaseModelObject,
    SelectOption,
};
export { renderFormFromSchema };
