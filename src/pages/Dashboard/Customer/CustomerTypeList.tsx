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
  deleteCustomerType,
  getAllCustomerTypes,
} from "../../../redux/slices/customerTypeReducer";
import { CustomerTypeModel } from "../../../interfaces/CustomerTypeModel";
import useTable, { emptyRows } from "../../../hooks/useTable";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import CustomerTypeTableRow from "./CustomerTypeTableRow";

type Props = {};

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "id", label: "Id", align: "left" },
  { id: "TENLOAI", label: "Tên loại", align: "left" },
  { id: "TENLOAIPHI", label: "Loại phí", align: "left" },
  { id: "GIA", label: "Giá", align: "left" },
  { id: "" },
];

export default function CustomerTypeList({}: Props) {
  const dispatch = useAppDispatch();

  const { customerTypeList, deleteCustomerTypeSuccess } = useAppSelector(
    (state) => state.customerType
  );
  useEffect(() => {
    dispatch(getAllCustomerTypes());
  }, [dispatch, deleteCustomerTypeSuccess]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultDense: false, defaultOrderBy: "name" });

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<CustomerTypeModel[]>([]);

  const denseHeight = dense ? 60 : 80;

  useEffect(() => {
    if (customerTypeList && customerTypeList.length) {
      setTableData(customerTypeList);
    }
  }, [customerTypeList ?? []]);

  const handleDeleteRow = (id: number) => {
    dispatch(deleteCustomerType(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.userType.edit(id));
  };

  return (
    <Page title="User: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách loại khách hàng"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Khách hàng", href: PATH_DASHBOARD.userType.root },
            { name: "Danh sách loại" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.userType.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm loại khách hàng
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
                    <CustomerTypeTableRow
                      key={row.IDLOAIKH}
                      row={row}
                      // selected={selected.includes(row.id)}
                      // onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.IDLOAIKH)}
                      onEditRow={() => handleEditRow(row.IDLOAIKH)}
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
