import { postAPI, getAPI } from './index';

const GetCurriculums = () => {
  return getAPI('/api/categories');
}

const GetCurriculumsDetail = (id) => {
  return getAPI(`/api/categories/${id}`);
}

export default {
    GetCurriculums,
    GetCurriculumsDetail
};
