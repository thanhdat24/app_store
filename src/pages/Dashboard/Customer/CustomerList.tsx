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
  deleteCustomer,
  getAllCustomer,
} from "../../../redux/slices/customerReducer";

import useTable, { emptyRows, getComparator } from "../../../hooks/useTable";
import useTabs from "../../../hooks/useTabs";
import Scrollbar from "../../../components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from "../../../components/table";
import { CustomerModel } from "../../../interfaces/CustomerModel";
import CustomerTableRow from "./CustomerTableRow";
import CustomerTableToolbar from "./CustomerTableToolbar";
import { toast } from "react-toastify";

type Props = {};

// ----------------------------------------------------------------------

const OPTIONS_INFO = ["Thông tin khách hàng", "Mã khách hàng"];

const STATUS_OPTIONS = ["Tất cả", "doanh nghiệp", "hộ dân"];

const TABLE_HEAD = [
  { id: "" },
  { id: "id", label: "Id", align: "left" },
  { id: "MAKHACHHANG", label: "Mã", align: "left" },
  { id: "HOTEN", label: "Họ tên", align: "left" },
  { id: "CMT", label: "CMT", align: "left" },
  { id: "NGAYCAP", label: "Ngày cấp", align: "left" },
  { id: "DIACHI", label: "Địa chỉ", align: "left" },
  { id: "LOAIKH", label: "Loại", align: "left" },
  { id: "TENTUYENTHU", label: "Tuyến thu", align: "left" },
  { id: "THAOTAC", label: "Thao tác" },
];

export default function CustomerList({}: Props) {
  const dispatch = useAppDispatch();

  const { customerList, deleteCustomerSuccess } = useAppSelector(
    (state) => state.customer
  );

  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch, deleteCustomerSuccess]);

  console.log("customerList", customerList);

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

  const [filterName, setFilterName] = useState("");

  const [filterUser, setFilterUser] = useState("Thông tin khách hàng");

  const [tableData, setTableData] = useState<CustomerModel[]>([]);

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("Tất cả");

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterStatus,
    filterName,
    filterUser,
  });

  useEffect(() => {
    if (customerList && customerList.length) {
      setTableData(customerList);
    }
  }, [customerList ?? []]);

  const handleDeleteRow = (id: number) => {
    dispatch(deleteCustomer(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.user.edit(id));
  };

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterUser = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterUser(event.target.value);
  };

  const dataCSV = dataFiltered.map((row, index) => ({
    id: index,
    IDKHACHHANG: row.IDKHACHHANG,
    MAKHACHHANG: row.MAKHACHHANG,
    HOTEN: row.HOTEN,
    CMT: row.CMT,
    DIACHI: row.DIACHI,
    NGAYCAP: row.NGAYCAP,
    LOAIKH: row.LOAIKH.TENLOAI,
    TENTUYENTHU: row.TUYENTHU.TENTUYENTHU,
    QUANHUYEN: row.TUYENTHU.XAPHUONG.QUANHUYEN.TENQUANHUYEN,
    XAPHUONG: row.TUYENTHU.XAPHUONG.TENXAPHUONG,
    TRANGTHAI: row.TRANGTHAI,
  }));

  return (
    <Page title="Customer: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách khách hàng"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Khách hàng", href: PATH_DASHBOARD.user.root },
            { name: "Danh sách" },
          ]}
          action={
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr);",
                gap: "10px",
              }}
            >
              <Button
                sx={{ borderRadius: 2, textTransform: "none" }}
                variant="contained"
                component={RouterLink}
                to={
                  selected.length > 0
                    ? PATH_DASHBOARD.receipt.new(selected[0])
                    : ""
                }
                onClick={() =>
                  selected.length === 0 &&
                  toast.warning("Chọn ít nhất 1 khách hàng để tạo!", {
                    autoClose: 2000,
                    position: "top-center",
                  })
                }
                // disabled={selected.length === 0 || selected.length > 1}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                Tạo phiếu thu
              </Button>
              <Button
                sx={{ borderRadius: 2, textTransform: "none" }}
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.user.new}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                Thêm khách hàng
              </Button>
            </Box>
          }
        />
        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: "background.neutral" }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>
          <Divider />
          <CustomerTableToolbar
            dataTable={dataCSV}
            filterName={filterName}
            onFilterName={handleFilterName}
            filterUser={filterUser}
            onFilterUser={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleFilterUser(event)}
            optionsInfo={OPTIONS_INFO}
          />
          {/* <Scrollbar> */}
          <TableContainer sx={{ minWidth: 800, position: "relative" }}>
            {selected.length > 0 && (
              <TableSelectedActions
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.IDKHACHHANG)
                  )
                }
              />
            )}
            <Table size={dense ? "small" : "medium"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                // onSelectAllRows={(checked) =>
                //   onSelectAllRows(
                //     checked,
                //     tableData.map((row) => row.IDKHACHHANG)
                //   )
                // }
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <CustomerTableRow
                      key={row.IDKHACHHANG}
                      row={row}
                      selected={selected.includes(row.IDKHACHHANG)}
                      onSelectRow={() => onSelectRow(row.IDKHACHHANG)}
                      onDeleteRow={() => handleDeleteRow(row.IDKHACHHANG)}
                      onEditRow={() => handleEditRow(row.IDKHACHHANG)}
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
              count={dataFiltered?.length ?? 0}
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

// ----------------------------------------------------------------------

interface ApplySortFilterProps {
  tableData: any[];
  comparator: (a: any, b: any) => number;
  filterStatus?: string;
  filterName?: string;
  filterUser?: string;
}

function applySortFilter({
  tableData,
  comparator,
  filterStatus,
  filterName,
  filterUser,
}: ApplySortFilterProps) {
  if (filterStatus === "hộ dân") {
    filterStatus = "Hộ Dân";
  } else if (filterStatus === "doanh nghiệp") {
    filterStatus = "Doanh Nghiệp";
  }

  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterStatus !== "Tất cả") {
    tableData = tableData.filter(
      (item) => item.LOAIKH.TENLOAI === filterStatus
    );
  }
  if (filterUser === "Mã khách hàng") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.MAKHACHHANG.toLowerCase().includes(searchTerm)
      );
    }
  }

  if (filterUser === "Thông tin khách hàng") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter(
        (item) =>
          item.HOTEN.toLowerCase().includes(searchTerm) ||
          item.CMT.toString().includes(filterName)
      );
    }
  }

  return tableData;
}
