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
import { BillingPeriodModel } from "../../../interfaces/BillingPeriodModel";
import { deleteBillingPeriod, getAllBillingPeriods } from "../../../redux/slices/billingPeriodReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import useTable, { emptyRows } from "../../../hooks/useTable";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import BillingPeriodTableToolbar from "./BillingPeriodTableToolbar";
import BillingPeriodTableRow from "./BillingPeriodTableRow";

type Props = {};
const OPTIONS_INFO = ["Tên kỳ thu"];

const TABLE_HEAD = [
  { id: "id", label: "ID", align: "left" },
  { id: "TENKYTHU", label: "Tên kỳ thu", align: "left" },
  { id: "TRANGTHAIKYTHU", label: "Trạng thái kỳ thu", align: "left" },
  { id: "THAOTAC", label: "Thao tác", align: "right"  },
];

export default function BillingPeriodList({}: Props) {

  ////----
  const dispatch = useAppDispatch();

  const { billingPeriodList, deleteBillingPeriodSuccess } = useAppSelector(
    (state) => state.billingPeriod
  );
  useEffect(() => {
    dispatch(getAllBillingPeriods());
  }, [dispatch, deleteBillingPeriodSuccess]);

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

  const [filterUser, setFilterUser] = useState("Tên kỳ thu");

  const [tableData, setTableData] = useState<BillingPeriodModel[]>([]);

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    filterName,
    filterUser,
  });

  useEffect(() => {
    if (billingPeriodList && billingPeriodList.length) {
      setTableData(billingPeriodList);
    }
  }, [billingPeriodList ?? []]);

  const handleDeleteRow = (id: number) => {
    dispatch(deleteBillingPeriod(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.billingPeriod.edit(id));
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
  ////----

  return (
    <Page title="BillingPeriod: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách kỳ thu"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Kỳ thu", href: PATH_DASHBOARD.billingPeriod.root },
            { name: "Danh sách" },
          ]}
          action={
            <Button
              sx={{ borderRadius: 2, textTransform: "none" }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.billingPeriod.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Thêm kỳ thu
            </Button>
          }
        />
        <Card sx={{ maxWidth: 900}}>
          <Divider />
          <BillingPeriodTableToolbar
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
                    <BillingPeriodTableRow
                      key={row.IDKYTHU}
                      row={row}
                      // selected={selected.includes(row.id)}
                      // onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.IDKYTHU)}
                      onEditRow={() => handleEditRow(row.IDKYTHU)}
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

  if (filterUser === "Tên kỳ thu") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.TENKYTHU.toLowerCase().includes(searchTerm)
      );
    }
  }
  return tableData;
}
