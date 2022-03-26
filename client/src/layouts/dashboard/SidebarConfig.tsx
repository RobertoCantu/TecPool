// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
// import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name:any) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.root,
        icon: ICONS.dashboard
      },
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'Seguros',
  //   items: [
  //     // MANAGEMENT : Policies
  //     {
  //       title: 'Pólizas',
  //       path: PATH_DASHBOARD.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Lista', path: PATH_DASHBOARD.general.policies },
  //         { title: 'Crear', path: PATH_DASHBOARD.general.policies },
  //         { title: 'Editar', path: PATH_DASHBOARD.general.policies },
  //       ]
  //     },

  //     // MANAGEMENT : Sports
  //     {
  //       title: 'Deportes',
  //       path: PATH_DASHBOARD.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'Lista', path: PATH_DASHBOARD.general.sports },
  //         { title: 'Crear', path: PATH_DASHBOARD.general.sports },
  //         { title: 'Editar', path: PATH_DASHBOARD.general.sports },
  //       ]
  //     },
  //     // MANAGEMENT : Certificados
  //     {
  //       title: 'Certificados',
  //       path: PATH_DASHBOARD.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'Lista', path: PATH_DASHBOARD.general.certificates },
  //         { title: 'Crear', path: PATH_DASHBOARD.general.createCertificates },
  //         { title: 'Cargar', path: PATH_DASHBOARD.root },
  //       ]
  //     },
  //     {
  //       title: 'Asegurados',
  //       path: PATH_DASHBOARD.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'Lista', path: PATH_DASHBOARD.general.insureds },
  //         { title: 'Crear', path: PATH_DASHBOARD.root },
  //         { title: 'Editar', path: PATH_DASHBOARD.root },
  //       ]
  //     },
  //     // MANAGEMENT : Productos
  //     {
  //       title: 'Productos',
  //       path: PATH_DASHBOARD.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'Lista', path: PATH_DASHBOARD.general.products },
  //         { title: 'Crear', path: PATH_DASHBOARD.root },
  //         { title: 'Editar', path: PATH_DASHBOARD.root },
  //       ]
  //     },
  //   ]
  // },

];

export default sidebarConfig;