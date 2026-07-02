import API from "../../utils/axios";

export const getProductsAPI = async ({
  keyword = "",
  category = "",
  min = "",
  max = "",
  sort = "",
  page = 1,
  limit = 10,
}) => {

  const queryParams = new URLSearchParams();

  if (keyword) queryParams.append("keyword", keyword);

  if (category) queryParams.append("category", category);

  if (min) queryParams.append("min", min);

  if (max) queryParams.append("max", max);

  if (sort) queryParams.append("sort", sort);

  queryParams.append("page", page);

  queryParams.append("limit", limit);

  const res = await API.get(`/api/products?${queryParams.toString()}`);

  return res.data;
};