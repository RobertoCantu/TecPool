import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Stack,
  Button,
  Drawer,
  Tooltip,
  Typography,
  CardActionArea
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// hooks
//import useAuth from '../../hooks/useAuth';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// routes
import { PATH_DASHBOARD, /*PATH_DOCS*/ } from '../../routes/paths';
// // components
import Logo from '../../components/Logo';
import MyAvatar from '../../components/MyAvatar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import { DocIllustration } from '../../assets';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

const AccountStyle = styled('div')(({ theme }:any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

type IconCollapseProps = {
  onToggleCollapse: VoidFunction;
  collapseClick: boolean;
};

function IconCollapse({ onToggleCollapse, collapseClick }: IconCollapseProps) {
  return (
    <CardActionArea
      onClick={onToggleCollapse}
      sx={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        color: 'text.primary',
        justifyContent: 'center',
      }}
    >
      <DoubleArrowIcon
        sx={{
          color: '#637381',
          transform: 'rotate(180deg)',
          transition: (theme) => theme.transitions.create('all'),
          ...(collapseClick && {
            transform: 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)'
          })
        }}
      />
    </CardActionArea>
  );
}

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { pathname } = useLocation();
  // const { user } = useAuth();

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Box
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo sx={{width: '60px'}}/>
          </Box>

          <MHidden width="lgDown">
            {!isCollapse && (
              <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
            )}
          </MHidden>
        </Stack>

        {isCollapse ? (
          <MyAvatar sx={{ mx: 'auto', mb: 2 }} />
        ) : (
          <Link underline="none" color="black" component={RouterLink} to={PATH_DASHBOARD.root}>
            <AccountStyle>
              <AccountCircleIcon/>
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {/* {user?.displayName} */}
                  Testing
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        )}
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />

      <Box sx={{ flexGrow: 1 }} />

      {!isCollapse && (
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center' }}
        >
          {/* <DocIllustration sx={{ width: 1 }} /> */}

          <div>
            <Typography gutterBottom variant="subtitle1">
              {/* Hi, {user?.displayName} */}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Need help?
              <br /> Please check our docs
            </Typography>
          </div>
          {/* <Button href={PATH_DOCS} target="_blank" variant="contained">
            Documentation
          </Button> */}
        </Stack>
      )}
    </Box>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme:any) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}