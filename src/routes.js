import React from "react";
const HomePage = React.lazy(() => import("./features/home/HomePage"));

const routes = [
  {
    path: "/", name: "Trang chủ", component: HomePage, auth: false
  },
];

export default routes;
