import { Box, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

interface SearchNotFoundProps {
  searchQuery?: string;
}

const SearchNotFound: React.FC<SearchNotFoundProps> = ({
  searchQuery = "",
  ...other
}) => {
  return searchQuery ? (
    <Box {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không tìm thấy
      </Typography>
      <Typography variant="body2" align="center">
        Không tìm thấy kết quả cho
        <strong>"{searchQuery}"</strong>. Hãy thử kiểm tra lỗi chính tả hoặc sử
        dụng các từ hoàn chỉnh.
      </Typography>
    </Box>
  ) : (
    <Typography variant="body2"> Vui lòng nhập từ khóa</Typography>
  );
};

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default SearchNotFound;
