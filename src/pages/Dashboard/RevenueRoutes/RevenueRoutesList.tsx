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
import {
  deleteRevenueRoutes,
  getAllRevenueRoutes,
} from "../../../redux/slices/revenueRoutesReducer";
import useTable, { emptyRows } from "../../../hooks/useTable";
import { RevenueRoutesModel } from "../../../interfaces/RevenueRoutesModel";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import RevenueRoutesTableRow from "./RevenueRoutesTableRow";

type Props = {};

const TABLE_HEAD = [
  { id: "id", label: "ID", align: "left" },
  { id: "MATUYENTHU", label: "Mã tuyến thu", align: "left" },
  { id: "TENTUYENTHU", label: "Tên tuyến thu", align: "left" },
  { id: "TENQUANHUYEN", label: "Tên quận huyện", align: "left" },
  { id: "" },
];

export default function RevenueRoutesList({}: Props) {
  ///
  const dispatch = useAppDispatch();

  const { revenueRoutesList, deleteRevenueRoutesSuccess } = useAppSelector(
    (state) => state.revenueRoutes
  );
  useEffect(() => {
    dispatch(getAllRevenueRoutes());
  }, [dispatch, deleteRevenueRoutesSuccess]);

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

  const [tableData, setTableData] = useState<RevenueRoutesModel[]>([]);

  const denseHeight = dense ? 60 : 80;

  useEffect(() => {
    if (revenueRoutesList && revenueRoutesList.length) {
      setTableData(revenueRoutesList);
    }
  }, [revenueRoutesList ?? []]);

  const handleDeleteRow = (id: number) => {
    dispatch(deleteRevenueRoutes(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.revenueRoutes.edit(id));
  };
  ///

  return (
    <Page title="RevenueRoutes: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách tuyến thu"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Tuyến thu", href: PATH_DASHBOARD.revenueRoutes.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.revenueRoutes.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm phiếu thu
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
                    <RevenueRoutesTableRow
                      key={row.IDTUYENTHU}
                      row={row}
                      // selected={selected.includes(row.id)}
                      // onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.IDTUYENTHU)}
                      onEditRow={() => handleEditRow(row.IDTUYENTHU)}
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
