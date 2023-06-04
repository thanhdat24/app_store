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
import useTable, { emptyRows } from "../../../hooks/useTable";
import { WardModel } from "../../../interfaces/WardModel";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { deleteWard, getAllWard } from "../../../redux/slices/wardReducer";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import WardsTableRow from "./WardsTableRow";
import WardsTableToolbar from "./WardsTableToolbar";

type Props = {};

const OPTIONS_INFO = ["Tên xã phường", "Tên quận huyện"];

const TABLE_HEAD = [
  { id: "id", label: "ID", align: "left" },
  { id: "TENXAPHUONG", label: "Tên xã phường", align: "left" },
  { id: "IDQUANHUYEN", label: "Tên quận huyện", align: "left" },
  { id: "THAOTAC", label: "Thao tác", align: "right" },
  
];  

export default function WardsList({}: Props) {


  ///
  const dispatch = useAppDispatch();

  const { wardList, deleteWardSuccess } = useAppSelector(
    (state) => state.ward
  );
  useEffect(() => {
    dispatch(getAllWard());
  }, [dispatch, deleteWardSuccess]);

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

  const [filterUser, setFilterUser] = useState("Tên xã phường");


  const [tableData, setTableData] = useState<WardModel[]>([]);

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    filterName,
    filterUser,
  });
  

  useEffect(() => {
    if (wardList && wardList.length) {
      setTableData(wardList);
    }
  }, [wardList ?? []]);

  const handleDeleteRow = (id: number) => {
    dispatch(deleteWard(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.wards.edit(id));
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


  return (
    <Page title="Wards: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách xã phường"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Xã phường", href: PATH_DASHBOARD.wards.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.wards.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm xã phường
            </Button>
          }
        />
        <Card>
          <Divider />

          <WardsTableToolbar
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
                    <WardsTableRow
                      key={row.IDXAPHUONG}
                      row={row}
                      // selected={selected.includes(row.id)}
                      // onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.IDXAPHUONG)}
                      onEditRow={() => handleEditRow(row.IDXAPHUONG)}
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

  if (filterUser === "Tên xã phường") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.TENXAPHUONG.toLowerCase().includes(searchTerm)
      );
    }
  }
  if (filterUser === "Tên quận huyện") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.QUANHUYEN.TENQUANHUYEN.toLowerCase().includes(searchTerm)
      );
    }
  }


  return tableData;
}
