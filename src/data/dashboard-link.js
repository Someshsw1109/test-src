import { ACCOUNT_TYPE } from "../../utils/constant";
export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin-dashboard",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
  {
    id: 2,
    name: "My Items",
    path: "/dashboard/my-items",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 3,
    name: "Add Item",
    path: "/dashboard/add-item",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
//   {
//     id: 5,
//     name: "Enrolled Courses",
//     path: "/dashboard/enrolled-courses",
//     type: ACCOUNT_TYPE.STUDENT,
//     icon: "VscMortarBoard",
//   },
  {
    id: 4,
    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.USER,
    icon: "VscBookmark",
  },
];