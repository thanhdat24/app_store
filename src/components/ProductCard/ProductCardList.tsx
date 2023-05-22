import PropTypes from "prop-types";
// @mui
import { Box } from "@mui/material";
import { ProductModel } from "../../interfaces/ProductModel";
import product from "../../redux/slices/productReducer";
import ProductCard from "./ProductCard";
//

interface ProductCardListProps {
  productList: ProductModel[] | null;
  isSearch?: boolean;
}

const ProductCardList: React.FC<ProductCardListProps> = ({
  productList,
  isSearch,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: isSearch
          ? "repeat(3, 1fr)"
          : {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
      }}
    >
      {productList?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </Box>
  );
};

ProductCardList.propTypes = {
  productList: PropTypes.array.isRequired,
  isSearch: PropTypes.bool,
};

export default ProductCardList;
