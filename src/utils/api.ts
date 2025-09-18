export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

type TApiFetch = {
    method?: HttpMethods;
    endPoint: string;
    body?: any;
};

export const apiFetch = async ({ method = 'GET', endPoint, body }: TApiFetch) => {
    return await fetch(endPoint, {
        credentials: 'include',
        method,
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res: Response) => res.json())
};
