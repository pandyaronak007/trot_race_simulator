// defined httpMethod
export enum httpMethod {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    patch = 'PATCH',
    delete = 'DELETE'
}

// defined api url for api call
export enum apiUrl {
    auth = 'auth',
    results = 'results'
}

// defined HttpStatusCode for api response
export enum HttpStatusCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
    SERVICE_UNAVAILABLE = 503,
}
