import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { List, Collapse } from "@mui/material";
//
import NavItemRoot, { NavItemSub } from "./NavItem";

import { getActive } from ".";

// ----------------------------------------------------------------------
interface NavListRootProps {
  list: any;
  [key: string]: any;
}

const NavListRoot = ({ list, ...other }: NavListRootProps) => {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          item={list}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {(list.children || []).map((item: any) => (
              <NavListSub key={item.title} list={item} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemRoot item={list} active={active} />;
};

NavListRoot.propTypes = {
  list: PropTypes.object,
};

export default NavListRoot;

// ----------------------------------------------------------------------

interface NavListSubProps {
  list: any;
}

function NavListSub({ list }: NavListSubProps) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub
          item={list}
          onOpen={() => setOpen(!open)}
          open={open}
          active={active}
        />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item: any) => (
              <NavItemSub
                key={item.title}
                item={item}
                active={getActive(item.path, pathname)}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={list} active={active} />;
}

NavListSub.propTypes = {
  list: PropTypes.object,
};
