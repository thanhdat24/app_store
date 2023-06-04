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
import { deleteDistrict, getAllDistricts } from "../../../redux/slices/districtReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { DistrictModel } from "../../../interfaces/DistrictModel";
import useTable, { emptyRows } from "../../../hooks/useTable";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import DistrictTableRow from "./DistrictTableRow";
import PermissionTableToolbar from "../Permission/PermissionTableToolbar";

type Props = {};

const OPTIONS_INFO = ["Tên quận huyện"];

const TABLE_HEAD = [
  { id: "id", label: "ID", align: "left" },
  { id: "TENQUANHUYEN", label: "Tên quận huyện", align: "left" },
  { id: "THAOTAC", label: "Thao tác", align: "right"  },
];

export default function districtList({}: Props) {

  ///
  const dispatch = useAppDispatch();

  const { districtList, deleteDistrictSuccess } = useAppSelector(
    (state) => state.district
  );
  useEffect(() => {
    dispatch(getAllDistricts());
  }, [dispatch, deleteDistrictSuccess]);

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

  const [filterUser, setFilterUser] = useState("Tên quận huyện");

  const [tableData, setTableData] = useState<DistrictModel[]>([]);

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    filterName,
    filterUser,
  });

  useEffect(() => {
    if (districtList && districtList.length) {
      setTableData(districtList);
    }
  }, [districtList ?? []]);

  const handleDeleteRow = (id: number) => {
    dispatch(deleteDistrict(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.district.edit(id));
    
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
  ///

  return (
    <Page title="District: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách quận huyện"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Quận huyện", href: PATH_DASHBOARD.district.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.district.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm quận huyện
            </Button>
          }
        />
        <Card sx={{ maxWidth: 900}}>
          <Divider />
          <PermissionTableToolbar
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
                  .map((row: any) => (
                    <DistrictTableRow
                      key={row.IDQUANHUYEN}
                      row={row}
                      // selected={selected.includes(row.id)}
                      // onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.IDQUANHUYEN)}
                      onEditRow={() => handleEditRow(row.IDQUANHUYEN)}
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

interface ApplySortFilterProps {
  tableData: any[];
  filterStatus?: string;
  filterName?: string;
  filterUser?: string;
}

function applySortFilter({
  tableData,
  filterName,
  filterUser,
}: ApplySortFilterProps) {

  if (filterUser === "Tên quận huyện") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.TENQUANHUYEN.toLowerCase().includes(searchTerm)
      );
    }
  }
  return tableData;
}
