import React from "react";
const HomePage = React.lazy(() => import("./features/home/HomePage"));
const Courses = React.lazy(() => import("./features/courses/Courses"));
const CourseDetailPage = React.lazy(() => import("./features/courses/pages/CourseDetailPage"));
const CourseStudentPage = React.lazy(() => import("./features/courses/pages/CourseStudentPage"));
const CourseSearchPage = React.lazy(() => import("./features/courses/pages/CourseSearchPage"));

const routes = [
  {
    path: "/", name: "Trang chủ", component: HomePage, auth: false, exact: true
  },
  {
    path: "/courses", name: "Khoá học", component: Courses, auth: false, exact: true
  },
  {
    path: "/courses/search", name: "Tìm kiếm khoá học", component: CourseSearchPage, auth: false, exact: true
  },
  {
    path: "/courses/:id", name: "Chi tiết khoá học", component: CourseDetailPage, auth: false, exact: true
  },
  {
    path: "/courses/:id/lessons", name: "Chi tiết khoá học", component: CourseStudentPage, auth: true, exact: true
  },
];

export default routes;
