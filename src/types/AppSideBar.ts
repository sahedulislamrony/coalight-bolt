export type SideBarLink = {
  label: string;
  subLabel?: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  isLinkDissabled?: boolean;
};

export type SidebarContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
};

export type LinkBodyProps = Pick<SideBarLink, "label" | "subLabel">;
