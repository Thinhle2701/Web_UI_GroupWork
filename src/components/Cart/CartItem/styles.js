import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  media: {
    height: 260,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartAction: {
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    fontSize: 30,
  },
}));
