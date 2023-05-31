import { useState } from "react";

interface TableProps {
  defaultDense?: boolean;
  defaultOrderBy?: string;
  defaultOrder?: string;
  defaultCurrentPage?: number;
  defaultRowsPerPage?: number;
  defaultSelected?: any[];
}

export default function useTable(props: TableProps) {
  const [dense, setDense] = useState(props?.defaultDense || false);
  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || "name");
  const [order, setOrder] = useState(props?.defaultOrder || "asc");
  const [page, setPage] = useState(props?.defaultCurrentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage || 5
  );
  const [selected, setSelected] = useState(props?.defaultSelected || []);

  const onSort = (id: string) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const onSelectRow = (id: any) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const onSelectAllRows = (checked: boolean, newSelecteds: any[]) => {
    if (checked) {
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const onChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // filter

  return {
    dense,
    order,
    page,
    setPage,
    orderBy,
    rowsPerPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
  };
}

export function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export function emptyRows(
  page: number,
  rowsPerPage: number,
  arrayLength: number
) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
