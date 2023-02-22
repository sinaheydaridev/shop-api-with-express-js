import { Pagination, PaginationQuery } from "interfaces/pagination.interface";
import { ApplicationResponse } from "interfaces/application.interface";

interface PaginationInfoData extends PaginationQuery {
  count: number;
}

interface PaginationData<T> {
  items: T;
  pagination: PaginationInfoData;
}

export const paginationResponse = <T>(
  data: PaginationData<T>
): Pagination<T> => {
  const {
    items,
    pagination: { page, limit = "10", count },
  } = data;
  return {
    items,
    pagination: {
      page,
      limit,
      count,
      totalPages: Math.ceil(count / +limit),
    },
  };
};

export const okResponse = <T>(res: ApplicationResponse<T>, data: T) => {
  res.status(200);
  return res.json(data);
};

export const createdResponse = <T>(res: ApplicationResponse<T>, data: T) => {
  res.status(201);
  return res.json(data);
};
