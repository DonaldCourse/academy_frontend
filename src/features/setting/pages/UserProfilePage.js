import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Container,
  Card,
  Grid,
  Typography,
  CardHeader,
  CardContent,
  Avatar,
  Box,
  IconButton,
} from "@material-ui/core";
import styled from "styled-components";
import { grey } from "@material-ui/core/colors";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import UploadAvatarDialog from "../components/UploadAvatarDialog";

const BigAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  margin: 0 auto 16px;
  ${({ $withBorder }) =>
    $withBorder &&
    `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;

UserProfilePage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  container: {
    // background: "#e8e9ec",
  },
  title: {
    textAlign: "center",
  },
  action: {
    marginLeft: "auto",
  },
  margin: {
    marginLeft: theme.spacing(1)
  }
}));

function UserProfilePage(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  // const saveImage = async () => {
  //   setExpand(false);
  //   if (!imageAfterChange) return;
  //   if (window.confirm(`Bạn chắc chắn muốn thay đổi ảnh đại diện`)) {
  // const file = await urltoFile(imageAfterChange, "avatar.jpg", "image/jpg");
  // var data = new FormData();
  // data.append("files", file);

  // // now upload
  // const config = {
  //   headers: {
  //     authorization: localStorage.getItem("token"),
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  // };
  // axios.post(FILE_URL, data, config).then((response) => {
  //   // console.log(response);
  //   setUrl(response[0].url);
  // });
  //   } else {
  //     return;
  //   }
  // };
  const onClose = () => {
    setOpen(!open);
  }

  const onSubmit = (image) => {
    onClose();
    setImage(URL.createObjectURL(image));
    console.log(image);
  }

  return (
    <>
      <Container className={classes.container}>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                title={
                  <Typography
                    className={classes.title}
                    variant="h2"
                    component="h2"
                  >
                    Trang cá nhân
                  </Typography>
                }
              />
              <CardContent>
                <BigAvatar
                  $withBorder
                  alt="Avatar"
                  src={image}
                  imgProps={{
                    style: {
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "cover",
                    },
                  }}
                  onClick={() => setOpen(!open)}
                />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Typography variant="body1" component="p">
                    Họ và Tên : Donald Trieu
                  </Typography>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <CreateOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Typography variant="body1" component="p">
                    Email : trieu@hatto.com
                  </Typography>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <CreateOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container >
      <UploadAvatarDialog open={open} onClose={onClose} onSubmit={onSubmit}></UploadAvatarDialog>
    </>
  );
}

export default UserProfilePage;
