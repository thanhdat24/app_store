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
} from "@mui/material";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Iconify from "../../../components/Iconify";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import useTable, { emptyRows, getComparator } from "../../../hooks/useTable";
import { StaffModel } from "../../../interfaces/StaffModel";
import useTabs from "../../../hooks/useTabs";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from "../../../components/table";
import StaffTableRow from "./StaffTableRow";
import { deleteStaff, getAllStaff } from "../../../redux/slices/staffReducer";
import StaffTableToolbar from "./StaffTableToolbar";
import { getAllPermissions } from "../../../redux/slices/permissionReducer";

type Props = {};

///---

const ARRAY_ROLE = [
  "Quản trị hệ thống",
  "Nhân viên quản trị",
  "Nhân viên thu ngân",
];

const STATUS_OPTIONS = [
  "Tất cả",
  "quản trị hệ thống",
  "nhân viên quản trị",
  "nhân viên thu ngân",
];
const TABLE_HEAD = [
  { id: "" },
  { id: "id", label: "ID", align: "left" },
  { id: "MANHANVIEN", label: "Mã NV", align: "left" },
  { id: "HOTEN", label: "Họ tên", align: "left" },
  { id: "SDT", label: "Số điện thoại", align: "left" },
  { id: "NGAYSINH", label: "Ngày sinh", align: "left" },
  { id: "DIACHI", label: "Địa chỉ", align: "left" },
  { id: "QUYEN", label: "Quyền", align: "left", width: 250 },
  { id: "" },
];

export default function StaffList({}: Props) {
  ////----
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllStaff());
    dispatch(getAllPermissions());
  }, [dispatch]);

  const { staffList, deleteStaffSuccess } = useAppSelector(
    (state) => state.staff
  );

  const { permissionList } = useAppSelector((state) => state.permission);

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

  const [filterName, setFilterName] = useState("");

  const [selectPermission, setSelectPermission] = useState<number[]>([]);

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

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id: number) => {
    dispatch(deleteStaff(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.staff.edit(id));
  };

  const handleDeleteRows = (selected: any) => {
    console.log("selected", selected);
  };
  const handleSelectPermission = (IDQUYEN: number) => {
    if (selectPermission.includes(IDQUYEN)) {
      setSelectPermission((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== IDQUYEN)
      );
    } else {
      setSelectPermission((prevPermissions) => [...prevPermissions, IDQUYEN]);
    }
  };

  console.log("selectPermission", selectPermission);
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
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  marginRight: "10px",
                }}
              >
                <Button
                  disabled={selectPermission.length === 0}
                  color="success"
                  sx={{ borderRadius: 2, textTransform: "none" }}
                  variant="contained"
                  startIcon={<Iconify icon={"eva:plus-fill"} />}
                >
                  Cập nhật quyền
                </Button>
              </Box>

              <Button
                sx={{ borderRadius: 2, textTransform: "none" }}
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.staff.new}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                Thêm nhân viên
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
          <StaffTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
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
                    tableData.map((row) => row.IDNHANVIEN)
                  )
                }
                actions={
                  // <Tooltip title="Delete">
                  //   <IconButton
                  //     color="primary"
                  //     onClick={() => handleDeleteRows(selected)}
                  //   >
                  //     <Iconify icon={"eva:trash-2-outline"} />
                  //   </IconButton>
                  // </Tooltip>
                  permissionList?.map((permission, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      onClick={() => handleSelectPermission(permission.IDQUYEN)}
                      color={
                        permission.TENQUYEN === "Quản trị hệ thống"
                          ? "error"
                          : permission.TENQUYEN === "Nhân viên quản trị"
                          ? "secondary"
                          : "info"
                      }
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        margin: 3,
                      }}
                      startIcon={<Iconify icon={"eva:plus-fill"} />}
                    >
                      {permission.TENQUYEN}
                    </Button>
                  ))
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
                      selected={selected.includes(row.IDNHANVIEN)}
                      onSelectRow={() => onSelectRow(row.IDNHANVIEN)}
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

  return tableData;
}
