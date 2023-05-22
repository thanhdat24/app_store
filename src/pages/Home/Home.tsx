// @mui
import { styled } from "@mui/material/styles";
// components
import Page from "../../components/Page";
import { HomeSection } from "../../sections/home";

type Props = {};

const RootStyle = styled("div")(() => ({
  height: "100%",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

export default function HomePage({}: Props) {
  return (
    <Page title="TypeScript">
      <RootStyle>
        <ContentStyle>
          <HomeSection />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
