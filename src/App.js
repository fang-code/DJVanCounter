import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Dialog,
  Button,
  makeStyles,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import "./index.css";
import { initializeApp } from "firebase";
import "firebase/app";
var firebaseConfig = {
  apiKey: "AIzaSyA3eqCFZ-Y_lyU55IjZMQI4OFYkkKW4GCQ",
  authDomain: "djcounter-9057a.firebaseapp.com",
  databaseURL: "https://djcounter-9057a.firebaseio.com",
  storageBucket: "djcounter-9057a.appspot.com"
};

const firebaseApp = initializeApp(firebaseConfig);
const useStyles = makeStyles(theme => ({
  button: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
    margin: "15px 0"
  },
  container: {
    fontSize: 20,
    color: "#fff",
    textShadow: "1px 2px 0px black;",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    margin: "15px 0"
  },
  bottomConainter: {
    color: "#fff",
    textShadow: "1px 2px 0px black;",
    padding: 10,
    backgroundColor: "rgba(30,144,255,0.5)"
  },
  DialogRoot: {
    backgroundColor: "#f5b501"
  },
  goalSpan: {
    color: "rgba(230, 52, 52, 1)",
    fontSize: 15
  },
  DialogContent: {
    fontSize: "28px"
  },
  DialogActions: {
    justifyContent: "center"
  },
  buttonSubmit: {
    fontSize: "15px"
  }
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [localCount, setCount] = useState("-");
  const rootRef = firebaseApp.database().ref("/");
  useEffect(() => {
    rootRef.on("value", snapshot => {
      const { counter } = snapshot.val();
      setCount(counter);
    });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const completedDJ = () => {
    rootRef.child("counter").set(Number(localCount + 1));
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h6" className={classes.container}>
          發一崇德多倫多所有佛堂
          <br />
          響應您我凝聚善願同步誦經祈願
          <br />
          誦經累計次數3600次數10800遍
          <br />
          晚餐吃素＆
          <br />
          晚上8點恭誦彌勒救苦真經三遍
          <br />
          誦經後點擊「我已經完成誦經」迴向
          <br />
          把愛串起來 凝聚您我慈悲之心
          <br />
          叩求諸天仙佛慈悲撥轉 感動上天
          <br />
          挽化疫情止息 天下眾生平安
          <br />
        </Typography>
        <Box
          bgcolor="warning.main"
          display="flex"
          alignItems="center"
          flexDirection="column"
          p={3}
        >
          <Typography variant="h5">誦經累計次數：{localCount}</Typography>
          <span className={classes.goalSpan}>
            恭誦彌勒救苦真經：{localCount * 3} 遍
          </span>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClickOpen()}
            className={classes.button}
          >
            🙏完成誦經三遍，請按此🙏
          </Button>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.DialogRoot }}
        >
          <DialogTitle id="alert-dialog-title">迴向文：</DialogTitle>
          <DialogContent>
            <Typography variant="h6" className={classes.DialogContent}>
              願迴向此誦經功德
              <br />
              平息新冠狀肺炎疫情
              <br />
              願眾生平安
            </Typography>
          </DialogContent>
          <DialogActions className={classes.DialogActions}>
            <Button
              variant="contained"
              onClick={completedDJ}
              color="secondary"
              className={classes.buttonSubmit}
            >
              完成功德迴向，請按此
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default App;
