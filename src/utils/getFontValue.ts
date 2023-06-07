export function pxToRem(value: any) {
  return `${value / 16}rem`;
}

interface responsiveFontSizesProps {
  sm: any;
  md: any;
  lg: any;
}

export function responsiveFontSizes({ sm, md, lg }: responsiveFontSizesProps) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}
