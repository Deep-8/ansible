import { ITableCellHeader } from "@/interfaces/requirements";

export const TableRowRenderer = ({ status, children, colorClass }: ITableCellHeader) => (
    <span className={`${status === 0 ? 'text-grey-med' : colorClass}`}>{children}</span>
);

export const TableCellHeader = ({ children }: ITableCellHeader) => (
    <div className="ant-table-column-header">{children}</div>
);