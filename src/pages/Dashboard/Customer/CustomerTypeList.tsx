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
import CustomerTypeTableToolbar from "./CustomerTypeTableToolbar";
import { CSVLink } from "react-csv";

type Props = {};

// ----------------------------------------------------------------------
const OPTIONS_INFO = ["Thông tin loại khách hàng", "Giá"];

const TABLE_HEAD = [
  { id: "STT", label: "STT", align: "left" },
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
    setPage,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultDense: false, defaultOrderBy: "name" });

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState("");

  const [filterUser, setFilterUser] = useState("Thông tin loại khách hàng");

  const [tableData, setTableData] = useState<CustomerTypeModel[]>([]);

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    filterName,
    filterUser,
  });

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
    STT: index + 1,
    "Tên loại": row.TENLOAI,
    "Tên loại phí": row.TENLOAIPHI,
    "Giá": row.GIA,
  }));

  return (
    <Page title="User: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách loại khách hàng"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Loại khách hàng", href: PATH_DASHBOARD.userType.root },
            { name: "Danh sách loại" },
          ]}
          action={
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                sx={{ borderRadius: 2, textTransform: "none" }}
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.userType.new}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                Thêm loại khách hàng
              </Button>
              <Box className="flex items-center leading-[1]">
                <CSVLink filename="Danh_sach_loai_khach_hang" data={dataCSV}>
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
          <CustomerTypeTableToolbar
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
                  .map((row: any, index: number) => (
                    <CustomerTypeTableRow
                      key={row.IDLOAIKH}
                      row={row}
                      index={index}
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
  if (filterUser === "Giá") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.GIA.toString().includes(filterName)
      );
    }
  }

  if (filterUser === "Thông tin loại khách hàng") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter(
        (item) =>
          item.TENLOAI.toLowerCase().includes(searchTerm) ||
          item.TENLOAIPHI.toLowerCase().includes(searchTerm)
      );
    }
  }

  return tableData;
}
