import { last } from 'ramda';
import * as types from './types';

import { SitesPageQuery } from 'services/site/model/SitesPageQuery';
import { AdminViewsProviderQuery } from 'services/site/model/AdminViewsProviderQuery';
import { CreateSiteInput } from 'services/site/model/CreateSiteInput';

export const fetchAdminUserSite = () : types.SiteActionTypes => ({
    type: types.FETCH_ADMIN_SITE_VIEW_SEND
});

export const fetchAdminSiteViewSuccess = (payload: AdminViewsProviderQuery) : types.SiteActionTypes => ({
    type: types.FETCH_ADMIN_SITE_VIEW_SUCCESS,
    payload
});

export const fetchAdminSiteViewError = (message: string) : types.SiteActionTypes => ({
    type: types.FETCH_ADMIN_SITE_VIEW_ERROR,
    payload: { message }
});


export const fetchSitesPage = () : types.SiteActionTypes => ({
    type: types.FETCH_SITES_PAGE_SEND
});

export const fetchSitesPageSuccess = (payload: SitesPageQuery) : types.SiteActionTypes => ({
    type: types.FETCH_SITES_PAGE_SUCCESS,
    payload
});

export const fetchSitesPageError = (message: string) : types.SiteActionTypes => ({
    type: types.FETCH_SITES_PAGE_ERROR,
    payload: { message }
});


export const deleteSite = (id: number) : types.SiteActionTypes => ({
    type: types.DELETE_SITE_SEND,
    id
});

export const deleteSiteSuccess = (payload: any) : types.SiteActionTypes => ({
    type: types.DELETE_SITE_SUCCESS,
    payload
});

export const deleteSiteError = (message: string) : types.SiteActionTypes => ({
    type: types.DELETE_SITE_ERROR,
    payload: { message }
});


export const createSite = (input: CreateSiteInput, url?: string) : types.SiteActionTypes => ({
    type: types.CREATE_SITE_SEND,
    input,
    url
});

export const createSiteSuccess = (payload: any) : types.SiteActionTypes => ({
    type: types.CREATE_SITE_SUCCESS,
    payload
});

export const createSiteError = (message: string) : types.SiteActionTypes => ({
    type: types.CREATE_SITE_ERROR,
    payload: { message }
});
