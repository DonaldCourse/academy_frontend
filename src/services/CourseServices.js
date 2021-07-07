import { postAPI, getAPI } from "./index";

const GetCourses = (params) => {
  return getAPI(`/api/courses?categoriesId=${params}`);
};

const GetCourseDetail = (id) => {
  return getAPI(`/api/courses/${id}`);
};

const GetLessonsOfCourse = (id) => {
  return getAPI(`/api/courses/${id}/lessons`);
};

const GetCoursesOfWeek = () => {
  return getAPI(`/api/courses/coursesOfWeek`);
};

const GetCoursesWatchMost = () => {
  return getAPI(`/api/courses/coursesWatchMost`);
};

const GetCoursesNew = () => {
  return getAPI(`/api/courses/coursesNew`);
};

const GetCategoriesRegisterMost = () => {
  return getAPI(`/api/courses/categoriesRegisterMost`);
};

const GetAllFeedbackOfCourse = (page, limit, id) => {
  return getAPI(`/api/courses/${id}/feedback?limit=${limit}&page=${page}`);
};

const GetAllCourseRelated = (id) => {
  return getAPI(`/api/courses/${id}/related`);
};

export default {
  GetCourses,
  GetCourseDetail,
  GetLessonsOfCourse,
  GetCoursesOfWeek,
  GetCoursesWatchMost,
  GetCoursesNew,
  GetCategoriesRegisterMost,
  GetAllFeedbackOfCourse,
  GetAllCourseRelated
};
