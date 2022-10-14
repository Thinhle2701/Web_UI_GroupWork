import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#F5F5F7",
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  filter: {
    marginTop: "45px",
    marginLeft: "20px",
    marginBottom: "-20px"
  },
  text: {
    display: "block",
  },
  item: {
    verticalAlign: "top",
    width: "120px",
    display: "inline-block",
    marginLeft: "20px",
    padding:"30px"
  },
  caption: {
    display: "block",
    textAlign: "right",
    fontSize:"20px",
    fontWeight:"bold",
  },
  caption_accessories: {
    display: "block",
    textAlign: "center",
    fontSize:"20px",
    fontWeight:"bold",
    paddingLeft:"50px"
  },
}));
