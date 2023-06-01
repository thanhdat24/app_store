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
import useTable, { emptyRows, getComparator } from "../../../hooks/useTable";
import { StaffModel } from "../../../interfaces/StaffModel";
import useTabs from "../../../hooks/useTabs";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import StaffTableRow from "./StaffTableRow";
import { deleteStaff, getAllStaff } from "../../../redux/slices/staffReducer";

type Props = {};

///---

const STATUS_OPTIONS = ["Tất cả", "quản trị hệ thống", "nhân viên quản trị", "nhân viên thu ngân"];
const TABLE_HEAD = [
  { id: "id", label: "ID", align: "left" },
  { id: "MANHANVIEN", label: "Mã NV", align: "left" },
  { id: "HOTEN", label: "Họ tên", align: "left" },
  { id: "NGAYSINH", label: "Ngày sinh", align: "left" },
  { id: "DIACHI", label: "Địa chỉ", align: "left" },
  { id: "USERNAME", label: "Tên đăng nhập", align: "left" },
  { id: "PASSWORD", label: "Mật khẩu", align: "left" },
  { id: "QUYEN", label: "Quyền", align: "left" },
  { id: "" },
];

export default function StaffList({}: Props) {

  ////----
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllStaff());
  }, [dispatch]);

  const { staffList, deleteStaffSuccess } = useAppSelector(
    (state) => state.staff
  );

  console.log("staffList", staffList);

  useEffect(() => {
    dispatch(getAllStaff());
  }, [dispatch, deleteStaffSuccess]);


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

  const [tableData, setTableData] = useState<StaffModel[]>([]);

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("Tất cả");

  console.log("filterStatus", filterStatus);

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterStatus,
  });

  useEffect(() => {
    if (staffList && staffList.length) {
      setTableData(staffList);
    }
  }, [staffList ?? []]);


  const handleDeleteRow = (id: number) => {
    dispatch(deleteStaff(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.staff.edit(id));
  };
  ////----
  return (
    <Page title="StaffList: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách nhân viên"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Nhân viên", href: PATH_DASHBOARD.staff.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.staff.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm nhân viên
            </Button>
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
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.IDNHANVIEN)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <StaffTableRow
                      key={row.IDNHANVIEN}
                      row={row}
                      // selected={selected.includes(row.id)}
                      // onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.IDNHANVIEN)}
                      onEditRow={() => handleEditRow(row.IDNHANVIEN)}
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

///------------------
interface ApplySortFilterProps {
  tableData: any[];
  comparator: (a: any, b: any) => number;
  filterStatus?: string;
}

function applySortFilter({
  tableData,
  comparator,
  filterStatus,
}: ApplySortFilterProps) {
  if (filterStatus === "quản trị hệ thống") {
    filterStatus = "Quản Trị Hệ Thống";
  } else if (filterStatus === "nhân viên quản trị") {
    filterStatus = "Nhân Viên Quản Trị";
  } else if (filterStatus === "nhân viên thu ngân") {
    filterStatus = "Nhân Viên Thu Ngân";
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
      (item) => item.IDNHANVIEN.TENQUYEN === filterStatus
    );
  }

  // if (filterName) {
  //   tableData = tableData.filter(
  //     (item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   );
  // }

  return tableData;
}
