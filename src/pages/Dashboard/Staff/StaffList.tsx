import { useState, useEffect, ChangeEvent } from "react";
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
import {
  deleteDetailPermission,
  employeePermission,
  resetEmployeePermission,
} from "../../../redux/slices/detailPermissionReducer";
import { toast } from "react-toastify";

type Props = {};

///---

const OPTIONS_INFO = ["Thông tin khách hàng", "Mã nhân viên"];

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
  { id: "THAOTAC", label: "Thao tác" },
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

  const { createDetailPermissionSuccess, deleteDetailPermissionSuccess } =
    useAppSelector((state) => state.detailPermission);

  useEffect(() => {
    dispatch(getAllStaff());
    return () => {
      dispatch(resetEmployeePermission());
    };
  }, [
    dispatch,
    deleteStaffSuccess,
    createDetailPermissionSuccess,
    deleteDetailPermissionSuccess,
  ]);

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

  const [filterUser, setFilterUser] = useState("Thông tin khách hàng");

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterStatus,
    filterName,
    filterUser,
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

  const handleFilterUser = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterUser(event.target.value);
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

  const handleUpdatePermission = async () => {
    if (selected.length === 0)
      return toast.warning("Vui lòng chọn ít nhất 1 Nhân Viên", {
        autoClose: 2000,
        position: "top-center",
      });
    if (selected.length > 0 && selectPermission.length === 0)
      return toast.warning(`Vui lòng chọn ít nhất 1 Quyền`, {
        autoClose: 2000,
        position: "top-center",
      });
    const result: any[] = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < selectPermission.length; j++) {
        const item = {
          IDNHANVIEN: selected[i],
          IDQUYEN: selectPermission[j],
        };
        result.push(item);
      }
    }
    if (result.length > 0) {
      await dispatch(employeePermission(result));
      setSelected([]);
      setSelectPermission([]);
    }
  };

  const handleDeletePermission = async () => {
    if (selected.length === 0)
      return toast.warning("Vui lòng chọn ít nhất 1 Nhân Viên", {
        autoClose: 2000,
        position: "top-center",
      });
    if (selected.length > 0 && selectPermission.length === 0)
      return toast.warning(`Vui lòng chọn ít nhất 1 Quyền`, {
        autoClose: 2000,
        position: "top-center",
      });
    const result: any[] = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < selectPermission.length; j++) {
        const item = {
          IDNHANVIEN: selected[i],
          IDQUYEN: selectPermission[j],
        };
        result.push(item);
      }
    }
    if (result.length > 0) {
      await dispatch(deleteDetailPermission(result));
      setSelected([]);
      setSelectPermission([]);
    }
  };
  console.log("dataFiltered", dataFiltered);
  const dataCSV = dataFiltered.map((row, index) => ({
    STT: index + 1,
    "Mã nhân viên": row.MANHANVIEN,
    "Tên nhân viên": row.HOTEN,
    "Số điện thoại": row.SDT,
    "Địa chỉ": row.DIACHI,
    "Ngày sinh": row.NGAYSINH,
    Quyền: row.CHITIETPHANQUYENs.map((item: any) => item.QUYEN.TENQUYEN).join(
      ", "
    ),
  }));

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
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr);",
                gap: "10px",
              }}
            >
              <Button
                // disabled={
                //   selectPermission.length === 0 || selected.length === 0
                // }
                color="success"
                sx={{ borderRadius: 2, textTransform: "none" }}
                variant="contained"
                startIcon={<Iconify icon={"eva:settings-2-outline"} />}
                onClick={handleUpdatePermission}
              >
                Cập nhật quyền
              </Button>

              <Button
                // disabled={
                //   selectPermission.length === 0 || selected.length === 0
                // }
                color="error"
                sx={{ borderRadius: 2, textTransform: "none" }}
                variant="contained"
                startIcon={<Iconify icon={"eva:trash-2-outline"} />}
                onClick={handleDeletePermission}
              >
                Xóa quyền
              </Button>
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
                    tableData.map((row) => row.IDNHANVIEN)
                  )
                }
                actions={permissionList?.map((permission, index) => (
                  <Button
                    key={index}
                    variant={
                      selectPermission.includes(permission.IDQUYEN)
                        ? "contained"
                        : "outlined"
                    }
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
                    startIcon={
                      <Iconify icon={"eva:checkmark-circle-outline"} />
                    }
                  >
                    {permission.TENQUYEN}
                  </Button>
                ))}
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
                  .map((row: any, index: number) => (
                    <StaffTableRow
                      key={index}
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
  if (filterStatus === "quản trị hệ thống") {
    filterStatus = "Quản trị hệ thống";
  } else if (filterStatus === "nhân viên quản trị") {
    filterStatus = "Nhân viên quản trị";
  } else if (filterStatus === "nhân viên thu ngân") {
    filterStatus = "Nhân viên thu ngân";
  }
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);
  if (filterStatus !== "Tất cả") {
    tableData = tableData.filter((item) =>
      item.CHITIETPHANQUYENs.some(
        (detail: any) => detail.QUYEN.TENQUYEN === filterStatus
      )
    );
  }

  if (filterUser === "Mã nhân viên") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.MANHANVIEN.toLowerCase().includes(searchTerm)
      );
    }
  }

  if (filterUser === "Thông tin khách hàng") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter(
        (item) =>
          item.HOTEN.toLowerCase().includes(searchTerm) ||
          item.SDT.toString().includes(filterName)
      );
    }
  }

  return tableData;
}
