import { Divider, Grid, Slide, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { LoginBlock } from '../../components/LoginBlock/LoginBlock';
import AppBar from '@material-ui/core/AppBar';
import AppToolbar from '@material-ui/core/Toolbar';
import LandingImage from './../../images/background.jpg';
import './LoginPage.css';
import { Routes } from '../../service/config';
import { sampleTasks } from '../../service/sampleTasks';
import { useHistory } from 'react-router-dom';
import LogoImage from './../../images/icon.png';

export const LoginPage = () => {
    const history = useHistory();
    const setData = [{
        "name": "Machine Learning Basics",
        "createdBy": "ML, AI",
        "createdAt": "2022-06-24T03:55:16.121Z",
        "id": "0",
        "tasks": sampleTasks
    }]
    localStorage.setItem("boards", JSON.stringify(setData));
    
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const title = 'Northstar';

    return (
        <>
        <Slide direction='down' in={true} timeout={800}>
      <AppBar position='sticky' className='AppBar' color='inherit'>
        <AppToolbar>
          <div className='HeaderContainer'>
            <div className='HeaderLeftContainer' onClick={() => history.push(Routes.home)}>
              <img
                alt='React Northstar App'
                style={{ height: '40px', width: '40px', transform: isSmallScreen ? 'scale(0.5)' : 'none' }}
                src={LogoImage}
              ></img>
              <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} color='inherit' noWrap>
                {title}
              </Typography>
            </div>
            <div></div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
                    <Grid item sm={12} lg={6}>
                        <div className='HomePageContainer'>{<LoginBlock/>}</div>
                    </Grid>
                </Grid>
                <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
                    <Grid item sm={12} lg={6}>
                        <Slide in={true} direction='up' timeout={1000}>
                            <Divider variant='middle'></Divider>
                        </Slide>
                    </Grid>
                </Grid>
                <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
                    <Grid item sm={12} lg={6}>
                        <Slide in={true} direction='up' timeout={2000}>
                            <Divider variant='middle'></Divider>
                        </Slide>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default LoginPage;
