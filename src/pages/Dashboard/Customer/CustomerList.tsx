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
  Stack,
  DialogTitle,
  DialogActions,
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
import { getCustomersByCashier } from "../../../redux/slices/cashierReducer";
import { CashierModel } from "../../../interfaces/CashierModel";
import TagFiltered from "../../../components/TagFiltered";
import { FormProvider } from "../../../components/hook-form";
import { useForm } from "react-hook-form";
import { CSVLink } from "react-csv";
type Props = {};

// ----------------------------------------------------------------------

const OPTIONS_INFO = ["Thông tin khách hàng", "Mã khách hàng"];

const STATUS_OPTIONS = ["Tất cả", "doanh nghiệp", "hộ dân"];

export default function CustomerList({}: Props) {
  const dispatch = useAppDispatch();

  const { customerList, deleteCustomerSuccess } = useAppSelector(
    (state) => state.customer
  );
  const { customersByCashierList } = useAppSelector((state) => state.cashier);
  const { userLogin } = useAppSelector((state) => state.admin);

  const TABLE_HEAD = [
    { id: "" },
    { id: "STT", label: "STT", align: "left" },
    { id: "MAKHACHHANG", label: "Mã", align: "left" },
    { id: "HOTEN", label: "Họ tên", align: "left" },
    { id: "CMT", label: "CMT", align: "left" },
    { id: "NGAYCAP", label: "Ngày cấp", align: "left" },
    { id: "DIACHI", label: "Địa chỉ", align: "left" },
    { id: "LOAIKH", label: "Loại", align: "left" },
    { id: "TENTUYENTHU", label: "Tuyến thu", align: "left" },
    { id: "TRANGTHAI", label: "Trạng thái", align: "left" },
    { id: "THAOTAC", label: "Thao tác", align: "left" },
  ];

  useEffect(() => {
    if (userLogin?.USERNAME === "admin") {
      dispatch(getAllCustomer());
    } else {
      dispatch(getCustomersByCashier(Number(userLogin?.IDNHANVIEN)));
    }

    // if()
    // dispatch(getCustomersByCashier(userLogin?.idNhanVien));
  }, [dispatch, deleteCustomerSuccess]);

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

  const [tableData, setTableData] = useState<CustomerModel[] | CashierModel[]>(
    []
  );

  const methods = useForm({});

  const { reset, watch, setValue, handleSubmit } = methods;

  const values = watch();
  const onSubmit = () => {};
  const isDefault = values.TUYENTHU?.length === 0;
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("Tất cả");

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterStatus,
    filterName,
    filterUser,
    values,
  });

  useEffect(() => {
    if (customerList && customerList.length) {
      setTableData(customerList);
    } else if (customersByCashierList && customersByCashierList.length > 0) {
      setTableData(customersByCashierList);
    }
  }, [customerList ?? [], customersByCashierList ?? []]);

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

  const handleRemoveRevenueRoute = (value: any) => {
    const newValue = values.TUYENTHU.filter((item: any) => item !== value);
    setValue("TUYENTHU", newValue);
  };

  const handleRemoveActive = (value: any) => {
    const newValue = values.TRANGTHAI.filter((item: any) => item !== value);
    setValue("TRANGTHAI", newValue);
  };

  const handleResetFilter = () => {
    reset();
  };

  const dataCSV = dataFiltered.map((row, index) => ({
    STT: index + 1,
    "ID Khách hàng": row.IDKHACHHANG,
    "Mã khách hàng": row.MAKHACHHANG,
    "Họ tên": row.HOTEN,
    CMT: row.CMT,
    "Địa chỉ": row.DIACHI,
    "Ngày cấp": row.NGAYCAP,
    "Loại khách hàng": row.LOAIKH.TENLOAI,
    "Tên tuyến thu": row.TUYENTHU.TENTUYENTHU,
    "Quận huyện": row.TUYENTHU.XAPHUONG.QUANHUYEN.TENQUANHUYEN,
    "Xã phường": row.TUYENTHU.XAPHUONG.TENXAPHUONG,
    "Trạng thái": row.TRANGTHAI,
  }));

  return (
    <Page title="Customer: List">
      <HeaderBreadcrumbs
        heading="Danh sách khách hàng"
        links={[
          { name: "Trang chủ", href: PATH_DASHBOARD.root },
          { name: "Khách hàng", href: PATH_DASHBOARD.user.list },
          { name: "Danh sách" },
        ]}
        action={
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            {userLogin?.USERNAME === "admin" && (
              <>
                <Button
                  sx={{ borderRadius: 2, textTransform: "none" }}
                  variant="contained"
                  component={RouterLink}
                  to={
                    selected.length < 2 && selected.length === 1
                      ? PATH_DASHBOARD.receipt.new(selected[0])
                      : ""
                  }
                  onClick={() =>
                    (selected.length === 0 || selected.length > 1) &&
                    toast.warning(
                      "Vui lòng chọn duy nhất 1 khách hàng để tạo!",
                      {
                        autoClose: 2000,
                        position: "top-center",
                      }
                    )
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
              </>
            )}
            <Box className="flex items-center leading-[1]">
              <CSVLink filename="Danh_sach_khach_hang" data={dataCSV}>
                <Tooltip title="Xuất danh sách">
                  <img
                    src="/icons/ic_excel.png"
                    alt="export excel"
                    className="w-7 h-7 leading-3 block"
                  />
                </Tooltip>
              </CSVLink>
            </Box>
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CustomerTableToolbar
            optionRevenueRoute={tableData}
            dataTable={dataCSV}
            filterName={filterName}
            onFilterName={handleFilterName}
            filterUser={filterUser}
            onFilterUser={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleFilterUser(event)}
            optionsInfo={OPTIONS_INFO}
          />
        </FormProvider>
        {(values.TUYENTHU?.length > 0 || values.TRANGTHAI?.length > 0) && (
          <Stack spacing={2} direction={{ md: "column" }} sx={{ py: 0, px: 3 }}>
            <Box>
              <strong>{dataFiltered.length}</strong>
              <span className="ml-1 !text-[#637381]">Kết quả tìm thấy</span>
            </Box>
            <TagFiltered
              filters={values}
              onRemoveRevenueRoute={handleRemoveRevenueRoute}
              isShowReset={!isDefault}
              onResetAll={handleResetFilter}
              onRemoveActive={handleRemoveActive}
            />
          </Stack>
        )}
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
                .map((row: any, index: number) => (
                  <CustomerTableRow
                    userLogin={userLogin}
                    key={row.IDKHACHHANG}
                    row={row}
                    index={index}
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
  filterRevenueRoute?: string;
  values: any;
}

function applySortFilter({
  tableData,
  comparator,
  filterStatus,
  filterName,
  filterUser,
  values,
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
  if (values.TUYENTHU?.length > 0) {
    tableData = tableData.filter((TT) =>
      values.TUYENTHU.includes(TT.TUYENTHU.TENTUYENTHU)
    );
  }

  if (values.TRANGTHAI?.length > 0) {
    tableData = tableData.filter((TT) =>
      values.TRANGTHAI.includes(TT.TRANGTHAI === true ? "Hoạt động" : "Khoá")
    );
  }

  return tableData;
}
