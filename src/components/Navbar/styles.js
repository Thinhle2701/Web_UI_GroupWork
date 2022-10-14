import { makeStyles} from "@material-ui/core/styles";
const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    booxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0,0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  
  },
  title: {
    flexGrow:"0",
    display: "flex",
    textDecoration: "none",
    padding:'15px',

  },
  image: {
    marginRight: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    display: "flex",
    alignItems: "center",
    borderRadius: "25px",
    backgroundColor: "white",
    borderColor: "white",
    border: "1px solid red",
  },
  btnSearch: {
    display: "flex",
    color: "black",
  },
  searchInput: {
    border: "none",
  },
}));
