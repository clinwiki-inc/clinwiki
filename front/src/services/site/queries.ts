import { SITE_FRAGMENT } from './SiteFragments';
import { PRESENT_SITE_FRAGMENT } from './PresentSiteProviderQuery';

export const ADMIN_SITE_VIEW_FRAGMENT = `
    fragment AdminSiteViewFragment on SiteView {
        name
        url
        id
        search {
            type
        }
    }
`;

export const ADMIN_SITE_VIEW_QUERY = `
    query AdminViewsProviderQuery($id: Int) {
        site(id: $id) {
            id
            hideDonation
            siteViews {
                ...AdminSiteViewFragment
            }
        }
    }

    ${ADMIN_SITE_VIEW_FRAGMENT}
`;


export const SITE_ITEM_FRAGMENT = `
fragment SiteItemFragment on Site {
  id
  name
  subdomain
  defaultHash
  defaultSearchPage
}
`;

export const SITES_PAGE_QUERY = `
  query SitesPageQuery {
    me {
      id
      ownSites {
        ...SiteItemFragment
      }
      editorSites {
        ...SiteItemFragment
      }
    }
  }

  ${SITE_ITEM_FRAGMENT}
`;

export const SITE_PROVIDER_QUERY = `
  query SiteProviderQuery($id: Int, $url: String) {
    site(id: $id) {
      ...SiteFragment
    }
  }

  ${SITE_FRAGMENT}
`;

export const PRESENT_SITE_PROVIDER_QUERY = `
  query PresentSiteProviderQuery($id: Int, $url: String) {
    site(id: $id) {
      ...PresentSiteFragment
    }
  }

  ${PRESENT_SITE_FRAGMENT}
`;
