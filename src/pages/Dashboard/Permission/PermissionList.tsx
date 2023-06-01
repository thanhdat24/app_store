import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Iconify from "../../../components/Iconify";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { deletePermission, getAllPermissions } from "../../../redux/slices/permissionReducer";
import useTable, { emptyRows } from "../../../hooks/useTable";
import { PermissionModel } from "../../../interfaces/PermissionModel";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import PermissionTableRow from "./PermissionTableRow";

type Props = {};

const TABLE_HEAD = [
  { id: "id", label: "ID", align: "left" },
  { id: "TENQUYEN", label: "Tên quyền", align: "left" },
  { id: "" },
];

export default function PermissionList({}: Props) {

  ////----
  const dispatch = useAppDispatch();

  const { permissionList, deletePermissionSuccess } = useAppSelector(
    (state) => state.permission
  );
  useEffect(() => {
    dispatch(getAllPermissions());
  }, [dispatch, deletePermissionSuccess]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultDense: false, defaultOrderBy: "name" });

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<PermissionModel[]>([]);

  const denseHeight = dense ? 60 : 80;

  useEffect(() => {
    if (permissionList && permissionList.length) {
      setTableData(permissionList);
    }
  }, [permissionList ?? []]);

  const handleDeleteRow = (id: number) => {
    dispatch(deletePermission(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.permission.edit(id));
  };
  ////----
  return (
    <Page title="Permission: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách quyền"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Quyền", href: PATH_DASHBOARD.permission.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.permission.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm quyền
            </Button>
          }
        />
        <Card>
          <Divider />
          {/* <Scrollbar> */}
          <TableContainer sx={{ minWidth: 800, position: "relative" }}>
            <Table size={dense ? "small" : "medium"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
              />

              <TableBody>
                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <PermissionTableRow
                      key={row.IDQUYEN}
                      row={row}
                      // selected={selected.includes(row.id)}
                      // onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.IDQUYEN)}
                      onEditRow={() => handleEditRow(row.IDQUYEN)}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />

                {/* <TableNoData isNotFound={isNotFound} /> */}
              </TableBody>
            </Table>
          </TableContainer>{" "}
          <Box sx={{ position: "relative" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tableData?.length ?? 0}
              rowsPerPage={rowsPerPage ?? 5}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
          {/* </Scrollbar> */}
        </Card>
      </Container>
    </Page>
  );
}
