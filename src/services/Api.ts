// TODO use axios instead of fetch

class ApiService {
  get(
    url: string,
    params: Record<string, any> = {},
    options?: Record<string, any>
  ): Promise<Record<string, any>> {
    const requestUrl = new URL(url);
    Object.keys(params).forEach((key: string) => {
      requestUrl.searchParams.append(key, params[key]);
    });
    return new Promise((resolve, reject) => {
      fetch(requestUrl.toString(), options)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Invalid response status: ' + response.statusText);
          }
          return response.json();
        })
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  post(
    url: string,
    data: Record<string, any>,
    options?: Record<string, any>
  ): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const fetchParams: RequestInit = {
        method: 'POST',
        ...options,
      };
      const dataKeys = Object.keys(data);
      if (dataKeys.length > 0) {
        const bodyContent = new URLSearchParams();
        for (const [key, value] of Object.entries(data)) {
          bodyContent.append(key, value);
        }
        fetchParams.body = bodyContent;
      }
      fetch(url, fetchParams)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Invalid response status: ' + response.statusText);
          }
          return response.json();
        })
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default ApiService;
