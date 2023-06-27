import PropTypes from "prop-types";
import { Page, View, Text, Image, Document } from "@react-pdf/renderer";
// utils
// import { fCurrency } from "../../../../utils/formatNumber";
// import { fDate } from "../../../../utils/formatTime";
//
import styles from "./ReceiptStyle";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------
interface ReceiptPDFProps {
  receipt: any;
}
export default function ReceiptPDF({ receipt }: ReceiptPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb25]}>
          <View style={{ alignItems: "flex-start", flexDirection: "column" }}>
            <Text style={[styles.h3]}>VNPT CẦN THƠ</Text>

            <Text>
              <Text style={styles.h5}>Địa chỉ:</Text> 02 Nguyễn Trãi, An Hội,
              Ninh Kiều, Cần Thơ
            </Text>
            <Text>
              <Text style={styles.h5}>Điện thoại:</Text> (0710) 800126 -{" "}
              <Text style={styles.h5}>Fax</Text>: (0710) 3765566
            </Text>
            <Text>
              <Text style={styles.h5}>Email:</Text> cskh@vnpt.vn -{" "}
              <Text style={styles.h5}>Website:</Text>
              http://www.vnptcantho.com.vn
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", flexDirection: "column" }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Text style={styles.h3}>Mẫu số 01 - TT</Text>
              <Text style={styles.fontItalic}>
                (Ban hành theo Thông tư số: 200/2014/TT-BTC
              </Text>
              <Text style={styles.fontItalic}>Ngày 22/12/2014 của BTC)</Text>
            </View>
          </View>
        </View>
        <View style={[styles.gridContainer]}>
          <View
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
              opacity: 0,
            }}
          >
            <Text
              style={{
                opacity: 0,
              }}
            >
              Ngày......tháng.
            </Text>
          </View>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <Text style={[styles.h1, styles.mb3]}>PHIẾU THU</Text>
            <Text style={[styles.h5, styles.fontItalic]}>
              Ngày......tháng......năm......
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <Text style={[styles.h5]}>Quyển số: ..................</Text>
              <Text style={[styles.h5]}>Số: .............................</Text>
              <Text style={[styles.h5]}>Nợ: .............................</Text>
              <Text style={[styles.h5]}>Có: .............................</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "column", marginTop: 5 }}>
          <Text>Họ và tên người nộp tiền: {Array(163).fill(".").join("")}</Text>
          <Text>Địa chỉ: {Array(194).fill(".").join("")}</Text>
          <Text>Lý do nộp: {Array(189).fill(".").join("")}</Text>
          <Text>
            Số tiền: {Array(40).fill(".").join("")}(Viết bằng chữ):{" "}
            {Array(125).fill(".").join("")}
          </Text>
          <Text>Kièm theo: {Array(40).fill(".").join("")} Chứng từ gốc</Text>
        </View>
      </Page>
    </Document>
  );
}
