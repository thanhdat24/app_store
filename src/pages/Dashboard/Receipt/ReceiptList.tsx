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
  Dialog,
  DialogActions,
  alpha,
} from "@mui/material";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Iconify from "../../../components/Iconify";
import { TableEmptyRows, TableHeadCustom } from "../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  deleteReceipt,
  getAllReceipt,
} from "../../../redux/slices/receiptReducer";
import useTable, { emptyRows, getComparator } from "../../../hooks/useTable";
import { ReceiptModel } from "../../../interfaces/ReceiptModel";
import ReceiptTableRow from "./ReceiptTableRow";
import useTabs from "../../../hooks/useTabs";
import ReceiptTableToolbar from "./ReceiptTableToolbar";
import useToggle from "../../../hooks/useToggle";
import { PDFViewer } from "@react-pdf/renderer";
import ReceiptPDF from "./ReceiptPDF";
import AlertDialog from "../../../components/Dialog";
import {
  resetCasher,
  updateReceiptStatus,
} from "../../../redux/slices/cashierReducer";

type Props = {};

// ----------------------------------------------------------------------

const OPTIONS_INFO = ["Thông tin khách hàng", "Mã số phiếu"];

const STATUS_OPTIONS = ["Tất cả", "chưa thu", "đã thu"];

const TABLE_HEAD = [
  { id: "MAUSOPHIEU", label: "Mãu số phiếu", align: "left" },
  { id: "KYHIEU", label: "Ký hiệu", align: "left" },
  { id: "NGAYTAO", label: "Ngày tạo", align: "left" },
  { id: "TRANGTHAIPHIEU", label: "Trạng thái", align: "left" },
  { id: "KYTHU", label: "Kỳ thu", align: "left" },
  { id: "KHACHHANG", label: "Người nộp/nhận", align: "left" },
  { id: "LOAIKH", label: "Loại người nộp/nhận", align: "left" },
  { id: "SOTIEN", label: "Giá trị", align: "left" },
  { id: "CONFIRM", label: "Xác nhận" },
  { id: "ACTION", label: "Thao Tác" },
];

export default function ReceiptList({}: Props) {
  ///
  const dispatch = useAppDispatch();

  const { toggle: open, onOpen, onClose } = useToggle(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { receiptList, deleteReceiptSuccess } = useAppSelector(
    (state) => state.receipt
  );

  const { updateReceiptStatusSuccess } = useAppSelector(
    (state) => state.cashier
  );
  console.log("receiptList", receiptList);
  useEffect(() => {
    dispatch(getAllReceipt());
  }, [dispatch, deleteReceiptSuccess, updateReceiptStatusSuccess]);

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
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultDense: false, defaultOrderBy: "name" });

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState("");

  const [filterUser, setFilterUser] = useState("Thông tin khách hàng");

  const [tableData, setTableData] = useState<ReceiptModel[]>([]);

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("Tất cả");

  const [viewRow, setViewRow] = useState<ReceiptModel | null>(null);

  const denseHeight = dense ? 60 : 80;

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterStatus,
    filterName,
    filterUser,
  });

  useEffect(() => {
    if (receiptList && receiptList.length) {
      setTableData(receiptList);
    }
  }, [receiptList ?? []]);

  const handleDeleteRow = (id: number) => {
    dispatch(deleteReceipt(id));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.receipt.edit(id));
  };

  const handleViewRow = (row: ReceiptModel) => {
    setViewRow(row);
    onOpen();
  };

  const handleOpenDialog = (id: number) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmRow = async (id: number) => {
    await dispatch(updateReceiptStatus(id));
    setOpenConfirm(false);
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
    "Mẫu số phiếu": row.MAUSOPHIEU,
    "Ký hiệu": row.KYHIEU,
    "Ngày tạo": row.NGAYTAO,
    "Trạng thái phiếu": row.TRANGTHAIPHIEU ? "Đã thu" : "Chưa thu",
    "Kỳ thu": row.KYTHU.TENKYTHU,
    "Khách hàng": row.KHACHHANG.HOTEN,
    "Loại khách hàng": row.KHACHHANG.LOAIKH.TENLOAI,
    "Giá trị": row.CHITIETPHIEUTHUs[0]?.SOTIEN,
  }));

  useEffect(() => {
    if (updateReceiptStatusSuccess) {
      dispatch(resetCasher());
    }
  }, [updateReceiptStatusSuccess]);

  return (
    <Page title="Receipt: List">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Danh sách phiếu thu"
          links={[
            { name: "Trang chủ", href: PATH_DASHBOARD.root },
            { name: "Phiếu thu", href: PATH_DASHBOARD.receipt.root },
            { name: "Danh sách" },
          ]}
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
          <ReceiptTableToolbar
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
                    <ReceiptTableRow
                      key={index}
                      row={row}
                      onDeleteRow={() => handleDeleteRow(row.IDPHIEU)}
                      onEditRow={() => handleEditRow(row.IDPHIEU)}
                      onViewRow={() => handleViewRow(row)}
                      onConfirmRow={() => handleOpenDialog(row.IDPHIEU)}
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

      <Dialog fullScreen open={open}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: "12px !important",
              boxShadow: `0 8px 16px 0 ${alpha("#919EAB", 0.16)}`,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={onClose}>
                <Iconify icon={"eva:close-fill"} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
            <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
              <ReceiptPDF receipt={viewRow} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
      <AlertDialog
        open={openConfirm}
        title={"Xác nhận thu phiếu này?"}
        onConfirm={() => {
          if (selectedId !== null) {
            handleConfirmRow(selectedId);
          }
        }}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      />
    </Page>
  );
}

// ----------------------------------------------------------------------

interface ApplySortFilterProps {
  tableData: any[];
  comparator: (a: any, b: any) => number;
  filterStatus?: string | boolean;
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
  if (filterStatus === "chưa thu") {
    filterStatus = false;
  } else if (filterStatus === "đã thu") {
    filterStatus = true;
  }

  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  console.log("tableData", tableData);
  tableData = stabilizedThis.map((el) => el[0]);

  if (filterStatus !== "Tất cả") {
    tableData = tableData.filter(
      (item) => item.TRANGTHAIPHIEU === filterStatus
    );
  }
  if (filterUser === "Mã số phiếu") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter((item) =>
        item.MAUSOPHIEU.toLowerCase().includes(searchTerm)
      );
    }
  }

  if (filterUser === "Thông tin khách hàng") {
    if (filterName) {
      const searchTerm = filterName.toLowerCase();
      tableData = tableData.filter(
        (item) =>
          item.KHACHHANG.HOTEN.toLowerCase().includes(searchTerm) ||
          item.KHACHHANG.MAKHACHHANG.toLowerCase().includes(searchTerm) ||
          item.KHACHHANG.CMT.includes(searchTerm)
      );
    }
  }

  return tableData;
}
