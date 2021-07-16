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
import { useDispatch, useSelector } from "react-redux";
import UploadFileCDNService from "../../../services/UploadFileCDNService";
import AuthServices from "../../../services/AuthServices";
import { setAuth } from '../../../reducer/AuthSlide';
import UploadProfileDialog from "../components/UpdateProfileDialog";

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
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  const userProfile = useSelector(state => state.authSlide.auth);
  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(!open);
  }

  const onCloseProfileDialog = () => {
    setOpenProfileDialog(!openProfileDialog);
  }

  const onSubmit = async (image) => {
    onClose();
    onHandleChangeAvatar(image);
  }

  const onSubmitProfile = async (data) => {
    onCloseProfileDialog();
    updateUserProfile(data);
  }

  const onHandleChangeAvatar = async (file) => {
    var data = new FormData();
    data.append("files", file);
    const results = await UploadFileCDNService.UploadFile(data);
    const body = {
      avatar: results.data[0].url
    }
    updateUserProfile(body);
  }

  const updateUserProfile = async (body) => {
    try {
      AuthServices.updateUserProfile(body).then(res => {
        if (res.status == 200) {
          dispatch(setAuth(res.data.user));
        }
      });
    } catch (error) {

    }
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
                  src={userProfile.avatar}
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
                    Họ và Tên : {userProfile.name}
                  </Typography>
                  <IconButton aria-label="delete" className={classes.margin} onClick={() => setOpenProfileDialog(!openProfileDialog)}>
                    <CreateOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Typography variant="body1" component="p">
                    Email : {userProfile.email}
                  </Typography>
                  <IconButton aria-label="delete" className={classes.margin} onClick={() => setOpenProfileDialog(!openProfileDialog)}>
                    <CreateOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container >
      <UploadAvatarDialog open={open} onClose={onClose} onSubmit={onSubmit}></UploadAvatarDialog>
      <UploadProfileDialog open={openProfileDialog} onClose={onCloseProfileDialog} onSubmit={onSubmitProfile} defaultValues={{name: userProfile.name, email: userProfile.email}}></UploadProfileDialog>
    </>
  );
}

export default UserProfilePage;
