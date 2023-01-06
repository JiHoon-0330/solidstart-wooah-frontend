import axios, {
  AxiosError,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from "axios";

export type APiResponse<Data, Error = any> = Promise<
  | {
      data: Data;
      error: undefined;
      status: "success";
    }
  | {
      data: undefined;
      error: Error;
      status: "failure";
    }
>;

const createInstance = (createConfig?: CreateAxiosDefaults) => {
  const instance = axios.create(createConfig);

  return async <Data, Error = any>(
    config: AxiosRequestConfig,
  ): APiResponse<Data, Error> => {
    try {
      const { data } = await instance(config);

      return {
        status: "success",
        error: undefined,
        data,
      };
    } catch (e) {
      const error = e instanceof AxiosError ? e.response?.data : e;

      return {
        status: "failure",
        data: undefined,
        error,
      };
    }
  };
};

export const wooahApiInstance = createInstance({
  baseURL: "https://wooah-api.dlwlrma.app",
});
