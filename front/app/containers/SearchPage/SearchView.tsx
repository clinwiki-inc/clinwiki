import * as React from "react";
import { SearchParams, AggKind, SearchQuery } from "./shared";
import ReactTable from "react-table";
import ReactStars from "react-stars";
import SearchFieldName from "components/SearchFieldName";
import styled from "styled-components";
import { Grid, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { SortInput, AggFilterInput, SearchQueryInput } from "types/globalTypes";
import {
  map,
  pipe,
  path,
  pathOr,
  groupBy,
  prop,
  head,
  lensPath,
  over,
  reject,
  propEq,
  findIndex,
  view,
  remove,
  isEmpty,
  lensProp,
  fromPairs,
  join
} from "ramda";
import { camelCase, snakeCase, capitalize } from "utils/helpers";
import { gql } from "apollo-boost";
import {
  SearchPageSearchQuery,
  SearchPageSearchQueryVariables,
  SearchPageSearchQuery_search_aggs,
  SearchPageSearchQuery_search_aggs_buckets,
  SearchPageSearchQuery_crowdAggs_aggs,
  SearchPageSearchQuery_search_studies
} from "types/SearchPageSearchQuery";
import { Query } from "react-apollo";
import "react-table/react-table.css";
import Aggs from "./components/Aggs";
import CrumbsBar from "./components/CrumbsBar";
import SiteProvider from "containers/SiteProvider";
import { studyFields, starColor, MAX_WINDOW_SIZE } from "utils/constants";
import { StudyPageQuery, StudyPageQueryVariables } from "types/StudyPageQuery";
import { stringify } from "querystring";
import Cards from "./components/Cards";
import NewCards from "./components/NewCards";

const QUERY = gql`
  query SearchPageSearchQuery(
    $q: SearchQueryInput!
    $page: Int
    $pageSize: Int
    $sorts: [SortInput!]
    $aggFilters: [AggFilterInput!]
    $crowdAggFilters: [AggFilterInput!]
  ) {
    crowdAggs: aggBuckets(
      params: {
        q: $q
        page: 0
        pageSize: 100000
        sorts: $sorts
        aggFilters: $aggFilters
        crowdAggFilters: $crowdAggFilters
        agg: "front_matter_keys"
      }
    ) {
      aggs {
        buckets {
          key
          docCount
        }
      }
    }
    search(
      params: {
        q: $q
        page: $page
        pageSize: $pageSize
        sorts: $sorts
        aggFilters: $aggFilters
        crowdAggFilters: $crowdAggFilters
      }
    ) {
      recordsTotal
      aggs {
        name
        buckets {
          key
          docCount
        }
      }
      studies {
        ...StudyItemFragment
      }
    }
  }

  fragment StudyItemFragment on Study {
    averageRating
    completionDate
    nctId
    overallStatus
    startDate
    briefTitle
    reviewsCount
    nlmDownloadDateDescription
    studyFirstSubmittedDate
    resultsFirstSubmittedDate
    dispositionFirstSubmittedDate
    lastUpdateSubmittedDate
    studyFirstSubmittedQcDate
    studyFirstPostedDate
    studyFirstPostedDateType
    resultsFirstSubmittedQcDate
    resultsFirstPostedDate
    resultsFirstPostedDateType
    dispositionFirstSubmittedQcDate
    dispositionFirstPostedDate
    dispositionFirstPostedDateType
    lastUpdateSubmittedQcDate
    lastUpdatePostedDate
    lastUpdatePostedDateType
    startMonthYear
    startDateType
    verificationMonthYear
    verificationDate
    completionMonthYear
    completionDateType
    primaryCompletionMonthYear
    primaryCompletionDateType
    primaryCompletionDate
    targetDuration
    studyType
    acronym
    baselinePopulation
    officialTitle
    lastKnownStatus
    phase
    enrollment
    enrollmentType
    source
    limitationsAndCaveats
    numberOfArms
    numberOfGroups
    whyStopped
    hasExpandedAccess
    expandedAccessTypeIndividual
    expandedAccessTypeIntermediate
    expandedAccessTypeTreatment
    hasDmc
    isFdaRegulatedDrug
    isFdaRegulatedDevice
    isUnapprovedDevice
    isPpsd
    isUsExport
    biospecRetention
    biospecDescription
    ipdTimeFrame
    ipdAccessCriteria
    ipdUrl
    planToShareIpd
    planToShareIpdDescription
  }
`;

const COLUMNS = studyFields;
const COLUMN_NAMES = fromPairs(
  // @ts-ignore
  COLUMNS.map(field => [
    field,
    field
      .split("_")
      .map(capitalize)
      .join(" ")
  ])
);

const changePage = (pageNumber: number) => (params: SearchParams) => ({
  ...params,
  page: Math.min(pageNumber, Math.ceil(MAX_WINDOW_SIZE / params.pageSize) - 1)
});
const changePageSize = (pageSize: number) => (params: SearchParams) => ({
  ...params,
  pageSize,
  page: 0
});
const changeSorted = (sorts: [SortInput]) => (params: SearchParams) => {
  const idSortedLens = lensProp("id");
  const snakeSorts = map(over(idSortedLens, snakeCase), sorts);
  return { ...params, sorts: snakeSorts, page: 0 };
};
const changeFilter = (add: boolean) => (
  aggName: string,
  key: string,
  isCrowd?: boolean
) => (params: SearchParams) => {
  const propName = isCrowd ? "crowdAggFilters" : "aggFilters";
  const lens = lensPath([propName]);
  return over(
    lens,
    (aggs: AggFilterInput[]) => {
      const index = findIndex(propEq("field", aggName), aggs);
      if (index === -1 && add) {
        return [...aggs, { field: aggName, values: [key] }];
      }
      const aggLens = lensPath([index, "values"]);
      const updater = (values: string[]) =>
        add ? [...values, key] : reject(x => x === key, values);
      let res = over(aggLens, updater, aggs);
      // Drop filter if no values left
      if (isEmpty(view(aggLens, res))) {
        res = remove(index, 1, res as any);
      }
      return res;
    },
    {
      ...params,
      page: 0
    }
  );
};
const addFilter = changeFilter(true);
const removeFilter = changeFilter(false);
const addSearchTerm = (term: string) => (params: SearchParams) => {
  // have to check for empty string because if you press return two times it ends up putting it in the terms
  if (!term.replace(/\s/g, "").length) {
    return params;
  }
  // recycled code for removing repeated terms. might be a better way but I'm not sure.
  const children = reject(propEq("key", term), params.q.children || []);
  return {
    ...params,
    q: { ...params.q, children: [...(children || []), { key: term }] },
    page: 0
  };
};
const removeSearchTerm = (term: string) => (params: SearchParams) => {
  const children = reject(
    propEq("key", term),
    params.q.children || []
  ) as SearchQuery[];
  return {
    ...params,
    q: { ...params.q, children },
    page: 0
  };
};

class QueryComponent extends Query<
  SearchPageSearchQuery,
  SearchPageSearchQueryVariables
> {}

const SearchWrapper = styled.div`
  .rt-tr {
    cursor: pointer;
  }
  #search-sidebar {
    padding-right: 0;
  }
`;

interface SearchViewProps {
  params: SearchParams;
  onBulkUpdate: () => void;
  onUpdateParams: (updater: (params: SearchParams) => SearchParams) => void;
  onAggsUpdate: (
    aggs: { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] },
    crowdAggs: { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] }
  ) => void;
  onRowClick: (nctId: string) => void;
  onResetFilters: () => void;
  onOpenAgg: (name: string, kind: AggKind) => void;
  openedAgg: { name: string; kind: AggKind } | null;
  previousSearchData: Array<SearchPageSearchQuery_search_studies>;
  returnPreviousSearchData: Function;
  searchHash: string;
  showCards: Boolean;
  toggledShowCards: Function;
  returnNumberOfPages: Function;
}

interface SearchViewState {
  tableWidth: number;
}
class SearchView extends React.Component<SearchViewProps, SearchViewState> {
  searchTable: any = 0;

  constructor(props) {
    super(props);

    this.searchTable = React.createRef();
    this.state = { tableWidth: 0 };
  }
  isStarColumn = (name: string): boolean => {
    return name === "average_rating";
  };

  toggledShowCards = (showCards: Boolean) => {
    this.props.toggledShowCards(showCards);
    pipe(changePage, this.props.onUpdateParams);
  };

  // this is for the column widths. currently, some tags are making it way too wide
  isStatusColumn = (name: string): boolean => {
    return name === "overall_status";
  };

  rowProps = (_, rowInfo) => {
    return {
      onClick: (_, handleOriginal) => {
        this.props.onRowClick(rowInfo.row.nctId);
        return handleOriginal();
      }
    };
  };

  renderColumn = (name: string, data) => {
    // INPUT: col name
    // OUTPUT render a react-table column with given header, accessor, style,
    // and value determined by studyfragment of that column.
    // also renders stars
    const camelCaseName = camelCase(name);
    const lowerCaseSpacing = 8;
    const upperCaseSpacing = 10;
    const maxWidth = 400;
    const totalPadding = 17;
    const getColumnWidth = () => {
      if (data.length < 1) {
        return calcWidth(headerName.split("")) + totalPadding;
      }
      let max = headerName;
      for (let i = 0; i < data.length; i += 1) {
        const elem = data[i][camelCaseName];
        if (data[i] !== undefined && elem !== null) {
          const str = elem.toString();
          if (str.length > max.length) {
            max = str;
          }
        }
      }
      const maxArray = max.split("");
      const maxSize = Math.max(
        calcWidth(maxArray),
        calcWidth(headerName.split("")) + totalPadding
      );
      return Math.min(maxWidth, maxSize);
    };

    const calcWidth = array => {
      return array.reduce(
        (acc, letter) =>
          letter === letter.toUpperCase() && letter !== " "
            ? acc + upperCaseSpacing
            : acc + lowerCaseSpacing,
        0
      );
    };

    const headerName = COLUMN_NAMES[name];
    return {
      Header: <SearchFieldName field={headerName} />,
      accessor: camelCaseName,
      style: {
        overflowWrap: "break-word",
        overflow: "hidden",
        whiteSpace: "normal",
        textAlign: this.isStarColumn(name) ? "center" : null
      },
      Cell: !this.isStarColumn(name)
        ? null
        : // the stars and the number of reviews. css in global-styles.ts makes it so they're on one line
          props => (
            <div>
              <div id="divsononeline">
                <ReactStars
                  count={5}
                  color2={starColor}
                  edit={false}
                  value={Number(props.original.averageRating)}
                />
              </div>
              <div id="divsononeline">
                &nbsp;({props.original.reviewsCount})
              </div>
            </div>
          ),
      width: getColumnWidth()
    };
  };

  transformAggs = (
    aggs: SearchPageSearchQuery_search_aggs[]
  ): { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] } => {
    return pipe(
      groupBy(prop("name")),
      map(head),
      map(prop("buckets"))
    )(aggs) as { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] };
  };

  transformCrowdAggs = (
    aggs: SearchPageSearchQuery_crowdAggs_aggs[]
  ): { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] } => {
    return pipe(
      head,
      prop("buckets"),
      groupBy(prop("key")),
      map(() => [])
      // @ts-ignore
    )(aggs) as { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] };
  };

  updateState = () => {
    if (!this.props.showCards) {
      this.setState({
        tableWidth: document.getElementsByClassName("ReactTable")[0].clientWidth
      });
    }
  };

  componentDidMount() {
    if (!this.props.showCards) {
      this.setState({
        tableWidth: document.getElementsByClassName("ReactTable")[0].clientWidth
      });
      window.addEventListener("resize", this.updateState);
    }
  }

  componentDidUpdate() {
    if (!this.props.showCards) {
      if (
        document.getElementsByClassName("ReactTable")[0] &&
        this.state.tableWidth !==
          document.getElementsByClassName("ReactTable")[0].clientWidth
      ) {
        window.addEventListener("resize", this.updateState);
        this.setState({
          tableWidth: document.getElementsByClassName("ReactTable")[0]
            .clientWidth
        });
      }
    } else {
      if (!this.props.showCards)
        window.removeEventListener("resize", this.updateState);
    }
  }

  componentWillUnmount() {
    if (!this.props.showCards)
      window.removeEventListener("resize", this.updateState);
  }

  cardPressed = card => {
    this.props.onRowClick(card.nctId);
  };

  mobileAndTabletcheck = () => {
    let check = false;
    ((a: string) => {
      // tslint:disable-next-line: max-line-length
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      ) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor);
    return check;
  };

  renderSearch = ({
    data,
    loading,
    error
  }: {
    data: SearchPageSearchQuery | undefined;
    loading: boolean;
    error: any;
  }) => {
    const { page, pageSize, sorts } = this.props.params;

    if (error) {
      return <div>{error.message}</div>;
    }
    if (!data) {
      return null;
    }
    const totalRecords = pathOr(0, ["search", "recordsTotal"], data) as number;
    const totalPages = Math.min(
      Math.ceil(totalRecords / this.props.params.pageSize),
      Math.ceil(MAX_WINDOW_SIZE / this.props.params.pageSize)
    );

    this.props.returnNumberOfPages(totalPages);

    const idSortedLens = lensProp("id");
    const camelizedSorts = map(over(idSortedLens, camelCase), sorts);
    // NOTE: If we upgrade typescript we can use data?.search?.studies;
    let searchData = path(
      ["search", "studies"],
      data
    ) as SearchPageSearchQuery_search_studies[];
    const tableWidth = 1175;

    //OWERA: high computational complexity here for little return
    searchData = Array.from(
      new Set(this.props.previousSearchData.concat(searchData))
    );

    // Eliminates undefined items from the searchData array
    searchData = searchData.filter(el => {
      return el != null;
    });

    // Returns the new searchData to the SearchPage component
    this.props.returnPreviousSearchData(searchData);

    const isMobile = this.mobileAndTabletcheck();

    return (
      <SiteProvider>
        {site => {
          const columns = map(
            x => this.renderColumn(x, ""),
            site.siteView.search.fields
          );
          const totalWidth = columns.reduce((acc, col) => acc + col.width, 0);
          const leftover = isMobile
            ? tableWidth - totalWidth
            : this.state.tableWidth - totalWidth;
          const additionalWidth = leftover / columns.length;
          columns.map(x => (x.width += additionalWidth), columns);
          if (this.props.showCards) {
            return (
              <NewCards
                data={searchData}
                onPress={this.cardPressed}
                loading={loading}
              />
            );
          } else {
            return (
              <ReactTable
                ref={this.searchTable}
                className="-striped -highlight"
                columns={columns}
                manual
                minRows={searchData![0] !== undefined ? 1 : 3}
                page={page}
                pageSize={pageSize}
                defaultSorted={camelizedSorts}
                onPageChange={pipe(changePage, this.props.onUpdateParams)}
                onPageSizeChange={pipe(
                  changePageSize,
                  this.props.onUpdateParams
                )}
                onSortedChange={pipe(changeSorted, this.props.onUpdateParams)}
                data={searchData}
                pages={totalPages}
                loading={loading}
                defaultPageSize={pageSize}
                getTdProps={this.rowProps}
                defaultSortDesc
                noDataText={"No studies found"}
              />
            );
          }
        }}
      </SiteProvider>
    );
  };

  renderCrumbs = ({
    data,
    loading,
    error
  }: {
    data: SearchPageSearchQuery | undefined;
    loading: boolean;
    error: any;
  }) => {
    let pagesTotal = 1;
    let recordsTotal = 0;
    if (
      data &&
      data.search &&
      data.search.recordsTotal &&
      this.props.params.pageSize
    ) {
      recordsTotal = data.search.recordsTotal;
      pagesTotal = Math.min(
        Math.ceil(data.search.recordsTotal / this.props.params.pageSize),
        Math.ceil(MAX_WINDOW_SIZE / this.props.params.pageSize)
      );
    }
    const q =
      this.props.params.q.key === "*"
        ? []
        : (this.props.params.q.children || []).map(prop("key"));

    return (
      <SiteProvider>
        {site => (
          <CrumbsBar
            // @ts-ignore
            searchParams={{ ...this.props.params, q }}
            onBulkUpdate={this.props.onBulkUpdate}
            removeFilter={pipe(removeFilter, this.props.onUpdateParams)}
            addSearchTerm={pipe(addSearchTerm, this.props.onUpdateParams)}
            removeSearchTerm={pipe(removeSearchTerm, this.props.onUpdateParams)}
            page={Math.min(this.props.params.page, pagesTotal)}
            recordsTotal={recordsTotal}
            pagesTotal={pagesTotal}
            pageSize={this.props.params.pageSize}
            update={{
              page: pipe(changePage, this.props.onUpdateParams)
            }}
            data={site}
            onReset={this.props.onResetFilters}
            loading={loading}
            showCards={this.props.showCards}
            toggledShowCards={this.toggledShowCards}
            addFilter={pipe(addFilter, this.props.onUpdateParams)}
          />
        )}
      </SiteProvider>
    );
  };

  render() {
    const { page, pageSize, sorts } = this.props.params;

    return (
      <SearchWrapper>
        <Helmet>
          <title>Search</title>
          <meta name="description" content="Description of SearchPage" />
        </Helmet>

        <QueryComponent
          query={QUERY}
          variables={this.props.params}
          onCompleted={(data: any) => {
            if (data && data.search) {
              this.props.onAggsUpdate(
                this.transformAggs(data.search.aggs || []),
                this.transformCrowdAggs(data.crowdAggs.aggs || [])
              );
            }
          }}
        >
          {({ data, loading, error }) => {
            return (
              <Col md={12}>
                {this.renderCrumbs({ data, loading, error })}
                {this.renderSearch({ data, loading, error })}
              </Col>
            );
          }}
        </QueryComponent>
      </SearchWrapper>
    );
  }
}

export default SearchView;
