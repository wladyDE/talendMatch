import { createApi, fetchBaseQuery, retry, FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { msalInstance } from '../../config/msalConfig';
import { AuthError } from "@azure/msal-browser";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    try {
        const tokenRequest = {
            scopes: [process.env.REACT_APP_SCOPE || ""],
        };

        const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);
        const accessToken = tokenResponse.accessToken;

        if (typeof args === 'string') {
            args = {
                url: args,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
        } else {
            args.headers = {
                ...args.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }

        return fetchBaseQuery({
            baseUrl: 'http://localhost:8080/talendmatch/api/v1/',
        })(args, api, extraOptions);

    } catch (error: any) {
        return { error: { status: 'FETCH_ERROR', error: error.message } };
    }
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})