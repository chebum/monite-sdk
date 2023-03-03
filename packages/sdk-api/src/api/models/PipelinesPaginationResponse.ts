/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PipelineResponseSchema } from './PipelineResponseSchema';

export type PipelinesPaginationResponse = {
    /**
     * A paginated list of pipelines.
     */
    data: Array<PipelineResponseSchema>;
    /**
     * A token that can be sent in the `pagination_token` query parameter to get the previous page of results, or `null` if there is no previous page (i.e. you've reached the first page).
     */
    prev_pagination_token?: string;
    /**
     * A token that can be sent in the `pagination_token` query parameter to get the next page of results, or `null` if there is no next page (i.e. you've reached the last page).
     */
    next_pagination_token?: string;
};

