import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  {
    component: CNavItem,
    name: 'Branch',
    to: '/branch',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    // items: [
      // {
      //   component: CNavItem,
      //   name: 'AddNew',
      //   to: '/branch/new_branch',
      // },
      // {
      //   component: CNavItem,
      //   name: 'List',
      //   to: '/branch/branch',
      // },
    // ],
  },
  {
    component: CNavItem,
    name: 'BranchStaff',
    to: '/branch_staff',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'AddNew',
    //     to: '/branchstaff/new_branchstaff',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'List',
    //     to: '/branchstaff/branch_staff',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Parcels',
    to: '/parcels',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'AddNew',
    //     to: '/parcels/new_parcels',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'List All',
    //     to: '/parcels/parcel_list',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Item Accepted by Counter',
    //     to: '/parcels/accepted',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Collected',
    //     to: '/parcels/collected',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Shipped',
    //     to: '/parcels/shipped',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'In-Transit',
    //     to: '/parcels/in_transit',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Arrived At Destination',
    //     to: '/parcels/arrived',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Out for Delivery',
    //     to: '/parcels/delivery',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Delivered',
    //     to: '/parcels/delivered',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Picked-up',
    //     to: '/parcels/picked',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Unsuccessfull Delivery Attempt',
    //     to: '/parcels/unsuccessfull',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Track Parcels',
    to: '/track_parcels',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'CoreUI Free',
    //     to: '/icons/coreui-icons',
    //     badge: {
    //       color: 'success',
    //       text: 'NEW',
    //     },
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'CoreUI Flags',
    //     to: '/icons/flags',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'CoreUI Brands',
    //     to: '/icons/brands',
    //   },
    // ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      // {
      //   component: CNavItem,
      //   name: 'Error 404',
      //   to: '/404',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Error 500',
      //   to: '/500',
      // },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
