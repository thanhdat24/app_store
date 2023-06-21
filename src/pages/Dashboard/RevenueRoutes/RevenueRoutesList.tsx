import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  SelectChangeEvent,
  MenuItem,
  Checkbox,
  ListItemText,
  Stack,
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
import {
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from "../../../components/table";
import RevenueRoutesTableRow from "./RevenueRoutesTableRow";
import RevenueRoutesTableToolbar from "./RevenueRoutesTableToolbar";
import { getAllStaff } from "../../../redux/slices/staffReducer";
import { toast } from "react-toastify";
import {
  deletePermissionRoutes,
  resetPermissionRoutes,
  staffPermissionRoutes,
} from "../../../redux/slices/permissionRevenueRoutesReducer";
import { CSVLink } from "react-csv";
import { FormProvider } from "../../../components/hook-form";
import TagFiltered from "../../../components/TagFiltered";

type Props = {};

const OPTIONS_INFO = ["Thông tin tuyến thu", "Mã tuyến thu"];

const TABLE_HEAD = [
  { id: "" },
  { id: "id", label: "ID", align: "left" },
  { id: "MATUYENTHU", label: "Mã tuyến thu", align: "left" },
  { id: "TENTUYENTHU", label: "Tên tuyến thu", align: "left" },
  { id: "TENQUANHUYEN", label: "Tên quận huyện", align: "left" },
  { id: "TENXAPHUONG", label: "Tên xã phường", align: "left" },
  { id: "PHANQUYENTUYENTHU", label: "Phân quyền tuyến thu", align: "left" },
  { id: "THAOTAC", label: "Thao tác", align: "right" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function RevenueRoutesList({}: Props) {
  ///
  const dispatch = useAppDispatch();

  const { revenueRoutesList } = useAppSelector((state) => state.revenueRoutes);

  const { staffList } = useAppSelector((state) => state.staff);
  const { createPermissionRevenueSuccess, deletePermissionRoutesSuccess } =
    useAppSelector((state) => state.permissionRevenueRoutes);
  useEffect(() => {
    dispatch(getAllRevenueRoutes());
    dispatch(getAllStaff());
    return () => {
      dispatch(resetPermissionRoutes());
    };
  }, [dispatch, deletePermissionRoutesSuccess, createPermissionRevenueSuccess]);

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

  const [filterUser, setFilterUser] = useState("Thông tin tuyến thu");

  const [tableData, setTableData] = useState<RevenueRoutesModel[]>([]);

  const methods = useForm({});

  const { reset, watch, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = () => {};

  const isDefault = values.TUYENTHU?.length === 0;

  const [staffId, setStaffId] = useState<string[]>([]);
  console.log("staffId", staffId);
  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    filterName,
    filterUser,
    values,
  });

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
  const handleRemoveStaff = (value: any) => {
    const newValue = values.NHANVIENTHU.filter((item: any) => item !== value);
    setValue("NHANVIENTHU", newValue);
  };
  const handleResetFilter = () => {
    reset();
  };

  ///CSV
  const dataCSV = dataFiltered.map((row, index) => ({
    STT: index + 1,
    "ID Tuyến thu": row.IDTUYENTHU,
    "Mã tuyến thu": row.MATUYENTHU,
    "Tên tuyến thu": row.TENTUYENTHU,
    "Tên quận huyện": row.XAPHUONG.QUANHUYEN.TENQUANHUYEN,
    "Tên xã phường": row.XAPHUONG.TENXAPHUONG,
  }));
  const handleChangeStaff = (event: SelectChangeEvent<typeof staffId>) => {
    const {
      target: { value },
    } = event;
    setStaffId(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleePermissionStaff = async () => {
    if (selected.length === 0)
      return (
        (selected.length === 0 || selected.length > 1) &&
        toast.warning("Vui lòng chọn duy nhất 1 tuyến thu!", {
          autoClose: 2000,
          position: "top-center",
        })
      );

    if (staffId.length === 0)
      return toast.warning("Vui lòng chọn ít nhất 1 nhân viên!", {
        autoClose: 2000,
        position: "top-center",
      });
    const result: any[] = [];
    for (let i = 0; i < staffId.length; i++) {
      for (let j = 0; j < selected.length; j++) {
        const item = {
          idTuyenThu: selected[j],
          idNhanVien: staffId[i],
        };
        result.push(item);
      }
    }
    if (result.length > 0) {
      await dispatch(staffPermissionRoutes(result));
      setSelected([]);
      setStaffId([]);
    }
  };

  const handleDeletePermissionStaff = async () => {
    if (selected.length === 0)
      return (
        (selected.length === 0 || selected.length > 1) &&
        toast.warning("Vui lòng chọn duy nhất 1 tuyến thu!", {
          autoClose: 2000,
          position: "top-center",
        })
      );

    if (staffId.length === 0)
      return toast.warning("Vui lòng chọn ít nhất 1 nhân viên!", {
        autoClose: 2000,
        position: "top-center",
      });
    const result: any[] = [];
    for (let i = 0; i < staffId.length; i++) {
      for (let j = 0; j < selected.length; j++) {
        const item = {
          idTuyenThu: selected[j],
          idNhanVien: staffId[i],
        };
        result.push(item);
      }
    }
    console.log("result", result);
    if (result.length > 0) {
      await dispatch(deletePermissionRoutes(result));
      setSelected([]);
      setStaffId([]);
    }
  };

  return (
    <Page title="RevenueRoutes: List">
      <HeaderBreadcrumbs
        heading="Danh sách tuyến thu"
        links={[
          { name: "Trang chủ", href: PATH_DASHBOARD.root },
          { name: "Tuyến thu", href: PATH_DASHBOARD.revenueRoutes.root },
          { name: "Danh sách" },
        ]}
        action={
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Box className="flex items-center">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Nhân viên
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={staffId} // Thay đổi tại đây
                  onChange={handleChangeStaff}
                  input={<OutlinedInput label="Nhân viên" />}
                  renderValue={(selected) =>
                    selected
                      .map((staffId) => {
                        const staff = staffList?.find(
                          (staff) =>
                            Number(staff.IDNHANVIEN) === Number(staffId)
                        );
                        return staff ? staff.HOTEN : "";
                      })
                      .join(", ")
                  }
                  MenuProps={MenuProps}
                >
                  {staffList?.map((name) => (
                    <MenuItem key={name.IDNHANVIEN} value={name.IDNHANVIEN}>
                      <Checkbox
                        checked={
                          staffId.indexOf(name.IDNHANVIEN.toString()) > -1
                        }
                      />
                      {/* Thay đổi tại đây */}
                      <ListItemText primary={name.HOTEN} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  marginRight: 1,
                }}
                variant="contained"
                startIcon={<Iconify icon={"eva:plus-fill"} />}
                color="success"
                onClick={handleePermissionStaff}
              >
                Phân quyền
              </Button>
              <Button
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  marginRight: 1,
                }}
                variant="contained"
                startIcon={<Iconify icon={"eva:plus-fill"} />}
                color="error"
                onClick={handleDeletePermissionStaff}
              >
                Xóa quyền
              </Button>
              <Button
                sx={{ borderRadius: 2, textTransform: "none" }}
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.revenueRoutes.new}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                Thêm tuyến thu
              </Button>
            </Box>
            <Box className="flex items-center leading-[1]">
              <CSVLink filename="Danh_sach_tuyen_thu" data={dataCSV}>
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
        <Divider />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RevenueRoutesTableToolbar
            optionStaffList={staffList || []}
            optionRevenueRoute={tableData}
            filterName={filterName}
            onFilterName={handleFilterName}
            filterUser={filterUser}
            onFilterUser={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleFilterUser(event)}
            optionsInfo={OPTIONS_INFO}
          />
        </FormProvider>
        {(values.TUYENTHU?.length > 0 || values.NHANVIENTHU?.length > 0) && (
          <Stack spacing={2} direction={{ md: "column" }} sx={{ py: 0, px: 3 }}>
            <Box>
              <strong>{dataFiltered.length}</strong>
              <span className="ml-1 !text-[#637381]">Kết quả tìm thấy</span>
            </Box>
            <TagFiltered
              filters={values}
              onRemoveStaff={handleRemoveStaff}
              onRemoveRevenueRoute={handleRemoveRevenueRoute}
              // onRemoveBillPeriod={handleRemoveBillPeriod}
              isShowReset={!isDefault}
              onResetAll={handleResetFilter}
              // onRemoveActive={handleRemoveActive}
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
                  tableData.map((row) => row.IDTUYENTHU)
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
            />

            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <RevenueRoutesTableRow
                    key={row.IDTUYENTHU}
                    row={row}
                    selected={selected.includes(row.IDTUYENTHU)}
                    onSelectRow={() => onSelectRow(row.IDTUYENTHU)}
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

//////-----

interface ApplySortFilterProps {
  tableData: any[];
  filterName?: string;
  filterUser?: string;
  values: any;
}

function applySortFilter({
  tableData,
  filterName,
  filterUser,
  values,
}: ApplySortFilterProps) {
  if (filterUser === "Mã tuyến thu") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.MATUYENTHU.toLowerCase().includes(searchTerm)
      );
    }
  }

  if (filterUser === "Thông tin tuyến thu") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter(
        (item) =>
          item.TENTUYENTHU.toLowerCase().includes(searchTerm) ||
          item.XAPHUONG.TENXAPHUONG.toLowerCase().includes(searchTerm) ||
          item.XAPHUONG.QUANHUYEN.TENQUANHUYEN.toLowerCase().includes(
            searchTerm
          )
      );
    }
  }

  if (values.TUYENTHU?.length > 0) {
    tableData = tableData.filter((TT) =>
      values.TUYENTHU.includes(TT.TENTUYENTHU)
    );
  }
  console.log("tableData", tableData);
  if (values.NHANVIENTHU?.length > 0) {
    tableData = tableData.filter((item) => {
      const phanQuyenThu = item.PHANQUYENTUYENTHUs.find((element: any) => {
        return values.NHANVIENTHU.includes(element.NHANVIEN.HOTEN);
      });
      return phanQuyenThu !== undefined;
    });
  }

  return tableData;
}
