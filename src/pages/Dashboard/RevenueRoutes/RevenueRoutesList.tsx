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
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  SelectChangeEvent,
  MenuItem,
  Checkbox,
  ListItemText,
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
import { staffPermissionRoutes } from "../../../redux/slices/permissionRevenueRoutesReducer";

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

  const { revenueRoutesList, deleteRevenueRoutesSuccess } = useAppSelector(
    (state) => state.revenueRoutes
  );

  const { staffList } = useAppSelector((state) => state.staff);

  const { createPermissionRevenueSuccess } = useAppSelector( (state) => state.permissionRevenueRoutes);
  useEffect(() => {
    dispatch(getAllRevenueRoutes());
    dispatch(getAllStaff());
  }, [dispatch, deleteRevenueRoutesSuccess, createPermissionRevenueSuccess]);

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

  const [staffId, setStaffId] = useState<string[]>([]);
  console.log("staffId", staffId);
  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    filterName,
    filterUser,
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
    if (selected.length > 1 || selected.length === 0)
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
      const item = {
        idTuyenThu: selected[0],
        idNhanVien: staffId[i],
      };
      result.push(item);
    }
    if (staffId.length > 0) {
      await dispatch(staffPermissionRoutes(result));
      setSelected([]);
      setStaffId([]);
    }
  };

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
                        checked={staffId.indexOf(Number(name.IDNHANVIEN)) > -1}
                      />{" "}
                      {/* Thay đổi tại đây */}
                      <ListItemText primary={name.HOTEN} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                sx={{ borderRadius: 2, textTransform: "none", marginRight: 1 }}
                variant="contained"
                startIcon={<Iconify icon={"eva:plus-fill"} />}
                color="success"
                onClick={handleePermissionStaff}
              >
                Phân quyền
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
          }
        />
        <Card>
          <Divider />
          <RevenueRoutesTableToolbar
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
      </Container>
    </Page>
  );
}

//////-----

interface ApplySortFilterProps {
  tableData: any[];
  filterName?: string;
  filterUser?: string;
}

function applySortFilter({
  tableData,
  filterName,
  filterUser,
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

  return tableData;
}
