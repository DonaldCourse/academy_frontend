import { postAPI, getAPI } from './index';

const GetCurriculums = () => {
  return getAPI('/api/categories');
}

const GetCurriculumsDetail = (id) => {
  return getAPI(`/api/categories/${id}`);
}

const SearchCategories = (query) => {
  return getAPI(`/api/categories/search?q=${query}`);
}


export default {
    GetCurriculums,
    GetCurriculumsDetail,
    SearchCategories
};
