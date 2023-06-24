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
  Grid,
  Stack,
  Typography,
  Switch,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Iconify from "../../../components/Iconify";
import { BillingPeriodModel } from "../../../interfaces/BillingPeriodModel";
import {
  deleteBillingPeriod,
  getAllBillingPeriods,
  resetBillingPeriod,
  updateBillingPeriod,
} from "../../../redux/slices/billingPeriodReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import useTable, { emptyRows } from "../../../hooks/useTable";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import BillingPeriodTableToolbar from "./BillingPeriodTableToolbar";
import BillingPeriodTableRow from "./BillingPeriodTableRow";
import { CSVLink } from "react-csv";
import useToggle from "../../../hooks/useToggle";
import AlertDialog from "../../../components/Dialog";
import RHFSwitch from "../../../components/hook-form/RHFSwitch";
import { FormProvider } from "../../../components/hook-form";
import Label from "../../../components/Label";
import { fMonthYear } from "../../../utils/formatTime";

type Props = {};
const OPTIONS_INFO = ["Tên kỳ thu"];

const TABLE_HEAD = [
  { id: "STT", label: "STT", align: "left" },
  { id: "TENKYTHU", label: "Tên kỳ thu", align: "left" },
  { id: "TRANGTHAIKYTHU", label: "Trạng thái kỳ thu", align: "left" },
  { id: "THAOTAC", label: "Thao tác", align: "right" },
];

export default function BillingPeriodList({}: Props) {
  ////----
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { toggle: open, onOpen, onClose } = useToggle(false);

  const [activeRow, setActiveRow] = useState<BillingPeriodModel | null>(null);

  const [checked, setChecked] = useState(activeRow?.TRANGTHAIKYTHU || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  
  const {
    billingPeriodList,
    deleteBillingPeriodSuccess,
    updateBillingPeriodSuccess,
  } = useAppSelector((state) => state.billingPeriod);

  useEffect(() => {
    dispatch(getAllBillingPeriods());
    return () => {
      dispatch(resetBillingPeriod());
    };
  }, [dispatch, deleteBillingPeriodSuccess, updateBillingPeriodSuccess]);

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

  const handleOpenDialog = (row: BillingPeriodModel) => {
    // navigate(PATH_DASHBOARD.billingPeriod.edit(id));
    setActiveRow(row);
    setChecked(row.TRANGTHAIKYTHU || false);
    onOpen();
    // setOpenConfirm(true);
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
  const handleConfirm = async (activeRow: any) => {
    activeRow = { ...activeRow, TRANGTHAIKYTHU: checked };
    await dispatch(updateBillingPeriod(activeRow));
    onClose();
  };

  ////----

  const dataCSV = dataFiltered.map((row, index) => ({
    STT: index + 1,
    "ID Kỳ thu": row.IDKYTHU,
    "Tên kỳ thu": row.TENKYTHU,
  }));

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
                to={PATH_DASHBOARD.billingPeriod.new}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                Thêm kỳ thu
              </Button>
              <Box className="flex items-center leading-[1]">
                <CSVLink filename="Danh_sach_ky_thu" data={dataCSV}>
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
        <Grid container justifyContent="center" alignItems="center">
          <Card>
            <BillingPeriodTableToolbar
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
                      <BillingPeriodTableRow
                        key={row.IDKYTHU}
                        row={row}
                        index={index}
                        // selected={selected.includes(row.id)}
                        // onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.IDKYTHU)}
                        onEditRow={() => handleOpenDialog(row)}
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
        </Grid>
      </Container>
      <AlertDialog
        open={open}
        title={"Trạng thái kỳ thu"}
        onConfirm={() => handleConfirm(activeRow)}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack
          mx={2}
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography>
            <Label
              variant={"outlined"}
              color={"error"}
              sx={{ textTransform: "uppercase", mb: 1 }}
            >
              Đã kết thúc
            </Label>
          </Typography>
          {/* <AntSwitch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
            /> */}
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography>
            <Label
              variant={"outlined"}
              color={"success"}
              sx={{ textTransform: "uppercase", mb: 1 }}
            >
              Đang hoạt động
            </Label>
          </Typography>
        </Stack>
      </AlertDialog>
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
    console.log("tableData", tableData);
    if (filterName) {
      tableData = tableData.filter((item) =>
        fMonthYear(item.TENKYTHU).includes(filterName)
      );
    }
  }
  return tableData;
}
