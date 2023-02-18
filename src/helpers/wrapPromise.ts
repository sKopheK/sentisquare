// @see https://blog.logrocket.com/react-suspense-data-fetching/

export interface WrapPromise<T> {
  read: () => T;
}

export const wrapPromise = <T>(promise: Promise<T>): WrapPromise<T> => {
  let status = 'pending';
  let response: T;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
};
