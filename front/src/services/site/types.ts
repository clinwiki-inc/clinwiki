import { CreateSiteInput } from 'types/globalTypes';
import { SitesPageQuery } from 'services/site/model/SitesPageQuery';
import { AdminViewsProviderQuery } from 'services/site/model/AdminViewsProviderQuery';

export const FETCH_ADMIN_SITE_VIEW_SEND = 'FETCH_ADMIN_SITE_VIEW_SEND';
export const FETCH_ADMIN_SITE_VIEW_SUCCESS = 'FETCH_ADMIN_SITE_VIEW_SUCCESS';
export const FETCH_ADMIN_SITE_VIEW_ERROR = 'FETCH_ADMIN_SITE_VIEW_ERROR';

export const FETCH_SITES_PAGE_SEND = 'FETCH_SITES_PAGE_SEND';
export const FETCH_SITES_PAGE_SUCCESS = 'FETCH_SITES_PAGE_SUCCESS';
export const FETCH_SITES_PAGE_ERROR = 'FETCH_SITES_PAGE_ERROR';

export const DELETE_SITE_SEND = 'DELETE_SITE_SEND';
export const DELETE_SITE_SUCCESS = 'DELETE_SITE_SUCCESS';
export const DELETE_SITE_ERROR = 'DELETE_SITE_ERROR';

export const CREATE_SITE_SEND = 'CREATE_SITE_SEND';
export const CREATE_SITE_SUCCESS = 'CREATE_SITE_SUCCESS';
export const CREATE_SITE_ERROR = 'CREATE_SITE_ERROR';

export interface SiteState {
    isFetchingAdminSiteView: boolean,
    adminSiteView: AdminViewsProviderQuery | undefined;
    isFetchingSitesPage: boolean,
    sitesData: any | SitesPageQuery | undefined,
    isDeletingSite: boolean,
}

export interface SiteDataError {
    message: string
};

export interface FetchAdminSiteViewSendAction {
    type: typeof FETCH_ADMIN_SITE_VIEW_SEND
};

export interface FetchAdminSiteViewSuccessAction {
    type: typeof FETCH_ADMIN_SITE_VIEW_SUCCESS,
    payload: AdminViewsProviderQuery
};

export interface FetchAdminSiteViewErrorAction {
    type: typeof FETCH_ADMIN_SITE_VIEW_ERROR,
    payload: SiteDataError
};

export interface FetchSitesPageSendAction {
    type: typeof FETCH_SITES_PAGE_SEND
};

export interface FetchSitesPageSuccessAction {
    type: typeof FETCH_SITES_PAGE_SUCCESS,
    payload: SitesPageQuery
};

export interface FetchSitesPageErrorAction {
    type: typeof FETCH_SITES_PAGE_ERROR,
    payload: SiteDataError
};

export interface DeleteSiteSendAction {
    type: typeof DELETE_SITE_SEND,
    id: number
}

export interface DeleteSiteSuccessAction {
    type: typeof DELETE_SITE_SUCCESS,
    payload: SitesPageQuery
};

export interface DeleteSiteErrorAction {
    type: typeof DELETE_SITE_ERROR,
    payload: SiteDataError
};

export interface CreateSiteSendAction {
    type: typeof CREATE_SITE_SEND,
    input: CreateSiteInput,
    url: string
}

export interface CreateSiteSuccessAction {
    type: typeof CREATE_SITE_SUCCESS,
    payload: SitesPageQuery
};

export interface CreateSiteErrorAction {
    type: typeof CREATE_SITE_ERROR,
    payload: SiteDataError
};


export type SiteActionTypes = FetchAdminSiteViewSendAction | FetchAdminSiteViewSuccessAction | FetchAdminSiteViewErrorAction |
    FetchSitesPageSendAction | FetchSitesPageSuccessAction | FetchSitesPageErrorAction | DeleteSiteSendAction | DeleteSiteSuccessAction |
    DeleteSiteErrorAction | CreateSiteSendAction | CreateSiteSuccessAction |
    CreateSiteErrorAction;
