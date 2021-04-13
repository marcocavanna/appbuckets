/* --------
 * Define simpleFetch Options
 * -------- */
export interface SimpleFetchOptions {
  /** Define if request should return JSON, default `true` */
  json?: boolean;

  /** Set the Method */
  method?: string;
}


/* --------
 * Make a very basic HTTP Request
 * -------- */
export default function simpleFetch<P extends any = any>(url: string, options?: SimpleFetchOptions): Promise<P> {
  /** Get Options */
  const {
    json = true,
    method = 'GET'
  } = options ?? {};

  /** Return the request resolver */
  return new Promise((resolveRequest, rejectRequest) => {
    /** Create the XML Client */
    const xmlHttpRequest = new XMLHttpRequest();

    /** Wait for response */
    xmlHttpRequest.onreadystatechange = () => {
      /** Wait for request end */
      if (xmlHttpRequest.readyState !== 4) {
        return;
      }

      /** If status is 200, resolve the request */
      if (xmlHttpRequest.status === 200) {
        return resolveRequest(
          json
            ? JSON.parse(xmlHttpRequest.responseText)
            : xmlHttpRequest.responseText
        );
      }

      /** Else, reject */
      return rejectRequest(xmlHttpRequest);
    };

    /** Make the Request */
    xmlHttpRequest.open(method, url, true);

    /** Send the Request */
    xmlHttpRequest.send();
  });

}
