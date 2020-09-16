import * as React from 'react';
import { SearchParams, AggKind } from './shared';
import ReactTable from 'react-table';
import ReactStars from 'react-stars';
import ThemedButton from 'components/StyledComponents';
import styled from 'styled-components';
import * as FontAwesome from 'react-fontawesome';
import { PulseLoader } from 'react-spinners';
import { Col, ButtonGroup, Button, MenuItem, DropdownButton } from 'react-bootstrap';
import { CardIcon, TableIcon } from './components/Icons';
import { Helmet } from 'react-helmet';
import { SortInput } from 'types/globalTypes';
import { SiteFragment_siteView } from 'types/SiteFragment';
import {
  map,
  pipe,
  pathOr,
  groupBy,
  prop,
  head,
  over,
  lensProp,
  fromPairs,
} from 'ramda';
import { camelCase, snakeCase, capitalize } from 'utils/helpers';
import { gql } from 'apollo-boost';
import {
  SearchPageSearchQuery,
  SearchPageSearchQueryVariables,
  SearchPageSearchQuery_search_aggs,
  SearchPageSearchQuery_search_aggs_buckets,
  SearchPageSearchQuery_crowdAggs_aggs,
  SearchPageSearchQuery_search_studies,
} from 'types/SearchPageSearchQuery';
import { Query, QueryComponentOptions } from 'react-apollo';
import 'react-table/react-table.css';
import SiteProvider from 'containers/SiteProvider';
import { studyFields, MAX_WINDOW_SIZE } from 'utils/constants';
import Cards from './components/Cards';
import MasonryCards from './components/MasonryCards';
//@ts-ignore
import ListCards from './components/ListCards';
import { SiteViewFragment } from 'types/SiteViewFragment';
import withTheme from 'containers/ThemeProvider';
import TableRV from './components/TableRV';
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized';
import aggToField from 'utils/aggs/aggToField';
import useUrlParams from "../../utils/UrlParamsProvider";
import { defaultPageSize } from './Types';

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
          keyAsString
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

  fragment StudyItemFragment on ElasticStudy {
    averageRating
    completionDate
    nctId
    overallStatus
    startDate
    briefTitle
    reviewsCount
    interventions 
    facilityStates
    interventionsMeshTerms
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
    studyType
    acronym
    baselinePopulation
    officialTitle
    lastKnownStatus
    phase
    enrollment
    enrollmentType
    source
    numberOfArms
    numberOfGroups
    whyStopped
    hasExpandedAccess
    expandedAccessTypeTreatment
    isFdaRegulatedDrug
    isFdaRegulatedDevice
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
  COLUMNS.map(field => [field, field.split('_').map(capitalize).join(' ')])
);

const changePage = (pageNumber: number) => (params: SearchParams) => ({
  ...params,
  page: Math.min(pageNumber, Math.ceil(MAX_WINDOW_SIZE / params.pageSize) - 1),
});
const changePageSize = (pageSize: number) => (params: SearchParams) => ({
  ...params,
  pageSize,
  page: 0,
});
const changeSorted = (sorts: [SortInput]) => (params: SearchParams) => {
  const idSortedLens = lensProp('id');
  const snakeSorts = map(over(idSortedLens, snakeCase), sorts);
  return { ...params, sorts: snakeSorts, page: 0 };
};

const QueryComponent = (
  props: QueryComponentOptions<
    SearchPageSearchQuery,
    SearchPageSearchQueryVariables
  >
) => Query(props);
const SearchWrapper = styled.div`
  .rt-tr {
    cursor: default;
  }
  #search-sidebar {
    padding-right: 0;
  }
`;

const SearchContainer = styled.div`
padding: 0 30px;

  color: black;
  margin-bottom: 1em;
  display: block;
  flex-direction: column;
  .ReactVirtualized__Grid__innerScrollContainer{
    display: flex;
    flex-wrap: wrap
  }

  .Table {
    width: 100%;
    margin-top: 15px;
  }
  .headerRow{
    background-color: ${props=>props.theme.button};
    border-bottom: 1px solid #e0e0e0;
    pading: 58px;
    color: white;
    padding: 25px;
    font-weight: 400;
    display: flex;
  }
  .evenRow,
  .oddRow {
    border-bottom: 1px solid #e0e0e0;
    display: flex;
  }
  .oddRow {
    background-color: #fafafa;
  }
  .headerColumn {
    text-transform: none;
  }
`;
const ThemedSearchContainer = withTheme(SearchContainer)
interface SearchView2Props {
  params: SearchParams;
  onBulkUpdate: (hash: string, siteViewUrl: string) => void;
  onUpdateParams: (updater: (params: SearchParams) => SearchParams) => void;
  onAggsUpdate: (
    aggs: { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] },
    crowdAggs: { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] }
  ) => void;
  onRowClick: (nctId: string, hash: string, siteViewUrl: string) => void;
  onClearFilters: () => void;
  onOpenAgg: (name: string, kind: AggKind) => void;
  openedAgg: { name: string; kind: AggKind } | null;
  previousSearchData: Array<SearchPageSearchQuery_search_studies>;
  returnPreviousSearchData: Function;
  searchHash: string;
  showCards: Boolean;
  returnNumberOfPages: Function;
  searchParams: any;
  searchAggs: any;
  crowdAggs: any;
  transformFilters: any;
  removeSelectAll: any;
  resetSelectAll: any;
  opened: any;
  openedKind: any;
  onOpen: any;
  currentSiteView: SiteFragment_siteView;
  thisSiteView?: SiteViewFragment;
  getTotalResults: Function;
  theme?: any;
}

interface SearchView2State {
  tableWidth: number;
  openedAgg: {
    name: string;
    kind: AggKind;
  } | null;
  totalResults: any;
  firstRender: boolean;
  prevResults: any | null;
  variables: SearchPageSearchQueryVariables  | undefined;
}

class SearchView2 extends React.Component<SearchView2Props, SearchView2State> {
  searchTable: any = 0;

  constructor(props) {
    super(props);

    this.searchTable = React.createRef();
    this.state = {
      tableWidth: 0,
      openedAgg: null,
      totalResults: 0,
      firstRender: true,
      prevResults: null,
      variables: undefined
    };
  }

  transformAggs = (
    aggs: SearchPageSearchQuery_search_aggs[]
  ): { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] } => {
    return pipe(
      groupBy<SearchPageSearchQuery_search_aggs>(prop('name')),
      map(head),
      map(prop('buckets'))
    )(aggs) as {
      [key: string]: SearchPageSearchQuery_search_aggs_buckets[];
    };
  };

  transformCrowdAggs = (
    aggs: SearchPageSearchQuery_crowdAggs_aggs[]
  ): { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] } => {
    return pipe(
      head,
      prop('buckets'),
      groupBy(prop('key')),
      map(() => [])
      // @ts-ignore
    )(aggs) as { [key: string]: SearchPageSearchQuery_search_aggs_buckets[] };
  };

  componentDidMount() {
    this.setState({
      variables: this.props.params
    })
    let showResults = this.props.currentSiteView.search.config.fields
      .showResults;
    if (!this.props.showCards && showResults) {
      //Needed for old table view
      this.setState({
        tableWidth: document.getElementsByClassName('ReactTable')?.[0]?.clientWidth,
      });
      window.addEventListener('resize', this.updateState);
    }
  }

  componentDidUpdate() {
    if (!this.props.showCards) {
      //Needed for old table view
      if (
        document.getElementsByClassName('ReactTable')[0] &&
        this.state.tableWidth !==
        document.getElementsByClassName('ReactTable')[0].clientWidth
      ) {
        window.addEventListener('resize', this.updateState);
        this.setState({
          tableWidth: document.getElementsByClassName('ReactTable')[0]
            .clientWidth,
        });
      }
    } else {
      if (!this.props.showCards)
        window.removeEventListener('resize', this.updateState);
    }
    if (this.state.totalResults) {
    }
  }

  componentWillUnmount() { }

  // Functions for Old Table and Card view start here and end at line 492
  loadPaginator = (recordsTotal, loading, page, pagesTotal) => {
    return (
      <div className="right-align">
        {page > 0 && !loading ? (
          <FontAwesome
            className="arrow-left"
            name="arrow-left"
            style={{ cursor: 'pointer', margin: '5px' }}
            onClick={() =>
              pipe(changePage, this.props.onUpdateParams)(page - 1)
            }
          />
        ) : (
            <FontAwesome
              className="arrow-left"
              name="arrow-left"
              style={{ margin: '5px', color: 'gray' }}
            />
          )}
          page{' '}
        <b>
          {loading ? (
            <div id="divsononeline">
              <PulseLoader color="#cccccc" size={8} />
            </div>
          ) : (
              `${Math.min(page + 1, pagesTotal)}/${pagesTotal}`
            )}{' '}
        </b>
        {page + 1 < pagesTotal && !loading ? (
          <FontAwesome
            className="arrow-right"
            name="arrow-right"
            style={{ cursor: 'pointer', margin: '5px' }}
            onClick={() => {
              pipe(changePage, this.props.onUpdateParams)(page + 1);
            }}
          />
        ) : (
            <FontAwesome
              className="arrow-right"
              name="arrow-right"
              style={{ margin: '5px', color: 'gray' }}
            />
          )}
        <div>{recordsTotal} results</div>
        <div>
          {recordsTotal > MAX_WINDOW_SIZE
            ? `(showing first ${MAX_WINDOW_SIZE})`
            : null}
        </div>
      </div>
    );
  };
  updateState = () => {
    if (!this.props.showCards) {
      this.setState({
        tableWidth: document.getElementsByClassName('ReactTable')[0]
          .clientWidth,
      });
    }
  };
  renderViewDropdown = () => {
    const { currentSiteView } = this.props;
    const buttonsArray = currentSiteView.search.results.buttons.items.filter(
      button => button.target.length > 0 && button.icon.length > 0
    );
    const queryString = useUrlParams();
    return (
      <SiteProvider>
        {site => {
          if (site.siteViews.length > 0 && buttonsArray.length > 0) {
            return (
              <div style={{ marginLeft: "auto", marginBottom: "1rem" }}  >
                <ButtonGroup>
                  {buttonsArray.map((button, index) => (
                    <a href={`/search?hash=${this.props.searchHash}&sv=${button.target}&pv=${queryString.pv}`}
                       key={button.target + index}
                    >
                      <ThemedButton>
                        {this.renderViewButton(button.icon)}
                      </ThemedButton>
                    </a>
                  ))}
                </ButtonGroup>
              </div>
            );
          }
          return null;
        }}
      </SiteProvider>
    );
  };
  renderViewButton = (icon: string) => {
    switch (icon) {
      case 'card':
        return <CardIcon />;
      case 'table':
        return <TableIcon />;
      case 'search':
        return <FontAwesome name="search" />;
      case 'list':
        return <FontAwesome name="th-list"
                            style={{ fontSize: '1.8rem' }} />;
      case 'small masonry':
        return <FontAwesome name="th"
                            style={{ fontSize: '1.8rem' }} />;
      case 'large masonry':
        return <FontAwesome name="th-large"
                            style={{ fontSize: '1.8rem' }} />;
      default:
        return null;
    }
  };
  handleLoadMore=()=>{
    const { page, pageSize, sorts } = this.props.params;

    let newParams ={...this.state.variables,
    //@ts-ignore
    pageSize: (this.state.variables?.pageSize +defaultPageSize)
  }
  //@ts-ignore
    this.setState({variables: newParams})
  }
  paginationHelper=(params)=>{
    console.log("In Pagination Helper")
    console.log(params)
  }
  mobileAndTabletcheck = () => {
    let check = false;
    ((a: string) => {
      // tslint:disable-next-line: max-line-length
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4)
        )
      ) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor);
    return check;
  };
  renderColumn = (name: string, data) => {
    // INPUT: col name
    // OUTPUT render a react-table column with given header, accessor, style,
    // and value determined by studyfragment of that column.
    // also renders stars

    const themedStarColor = this.props.theme.studyPage.reviewStarColor;
    const camelCaseName = camelCase(name);
    const lowerCaseSpacing = 8;
    const upperCaseSpacing = 10;
    const maxWidth = 400;
    const totalPadding = 17;
    const getColumnWidth = () => {
      if (data.length < 1) {
        return calcWidth(headerName.split('')) + totalPadding;
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
      const maxArray = max.split('');
      const maxSize = Math.max(
        calcWidth(maxArray),
        calcWidth(headerName.split('')) + totalPadding
      );
      return Math.min(maxWidth, maxSize);
    };

    const calcWidth = array => {
      return array.reduce(
        (acc, letter) =>
          letter === letter.toUpperCase() && letter !== ' '
            ? acc + upperCaseSpacing
            : acc + lowerCaseSpacing,
        0
      );
    };

    const headerName = COLUMN_NAMES[name];
    return {
      Header: headerName,
      accessor: camelCaseName,
      style: {
        overflowWrap: 'break-word',
        overflow: 'hidden',
        whiteSpace: 'normal',
        textAlign: this.isStarColumn(name) ? 'center' : null,
      },
      Cell: !this.isStarColumn(name)
        ? null
        : // the stars and the number of reviews. css in global-styles.ts makes it so they're on one line
        props => (
          <div>
            <div id="divsononeline">
              <ReactStars
                count={5}
                color2={themedStarColor}
                edit={false}
                value={Number(props.original.averageRating)}
              />
            </div>
            <div id="divsononeline">
              &nbsp;({props.original.reviewsCount})
              </div>
          </div>
        ),
      width: getColumnWidth(),
    };
  };
  isStarColumn = (name: string): boolean => {
    return name === 'average_rating';
  };
  rowProps = (_, rowInfo) => {
    return {
      onClick: (_, handleOriginal) => {
        this.props.onRowClick(
          rowInfo.row.nctId,
          this.props.searchHash,
          this.props.currentSiteView.url || 'default'
        );
        return handleOriginal();
      },
    };
  };
  //End Old functions
  renderHelper = (data, loading, template, onPress, resultsType, recordsTotal) => {
    switch (resultsType) {
      case 'masonry':
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                {this.renderViewDropdown()}
              </div>
          <AutoSizer>
            {({ height, width }) => (
              <MasonryCards
                data={data}
                loading={loading}
                template={template}
                height={height}
                width={width}
              />
            )}
          </AutoSizer>
            </div>
        );
      case 'list':
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                {this.renderViewDropdown()}
              </div>
          <AutoSizer>
            {({ height, width }) => (
              <ListCards
                totalRecords={this.state.totalResults}
                data={data}
                loading={loading}
                template={template}
                width={width}
                handleLoadMore={this.handleLoadMore}
              />
            )}
          </AutoSizer>
            </div>
        );
      case 'table2':
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-emd',
                  }}>
                {this.renderViewDropdown()}
              </div>
          <AutoSizer>
            {({ height, width }) => (
              <TableRV
                data={data}
                loading={loading}
                template={template}
                width={width}
                columnFields={this.props.currentSiteView.search.fields}
              />
            )}
          </AutoSizer>
            </div>
        );
      default:
        //Everything in this default case is to handle the old table view and card view
        const totalRecords = pathOr(
          0,
          ['search', 'recordsTotal'],
          data
        ) as number;
        const { page, pageSize, sorts } = this.props.params;

        const totalPages = Math.min(
          Math.ceil(totalRecords / this.props.params.pageSize),
          Math.ceil(MAX_WINDOW_SIZE / this.props.params.pageSize)
        );

        this.props.returnNumberOfPages(totalPages);

        const idSortedLens = lensProp('id');
        const camelizedSorts = map(over(idSortedLens, camelCase), sorts);
        // let searchData = data?.search?.studies || [];
        const tableWidth = 1175;

        // Eliminates undefined items from the searchData array
        data = data.filter(el => {
          return el != null;
        });

        // Returns the new data to the SearchPage component
        this.props.returnPreviousSearchData(data);

        const isMobile = this.mobileAndTabletcheck();

        const { currentSiteView } = this.props;
        // Block that sets the recordsTotal to state based on data response
        let pagesTotal = 1;
        pagesTotal = Math.min(
          Math.ceil(recordsTotal / this.props.params.pageSize),
          Math.ceil(MAX_WINDOW_SIZE / this.props.params.pageSize)
        );

        const showResults = currentSiteView.search.config.fields.showResults;

        const columns = map(
          x => this.renderColumn(x, ''),
          currentSiteView.search.fields
        );
        const totalWidth = columns.reduce((acc, col) => acc + col.width, 0);
        const leftover = isMobile
          ? tableWidth - totalWidth
          : this.state.tableWidth - totalWidth;
        const additionalWidth = leftover / columns.length;
        columns.map(x => (x.width += additionalWidth), columns);
        if (this.props.showCards) {
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: 'auto',
                }}>
                {this.loadPaginator(recordsTotal, loading, page, pagesTotal)}
                {this.renderViewDropdown()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Cards
                  columns={columns}
                  data={data}
                  onPress={this.cardPressed}
                  loading={loading}
                  template={currentSiteView.search.template}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {this.loadPaginator(recordsTotal, loading, page, pagesTotal)}
                {this.renderViewDropdown()}
              </div>
              <ReactTable
                ref={this.searchTable}
                className="-striped -highlight"
                columns={columns}
                manual
                minRows={3}
                page={page}
                pageSize={pageSize}
                defaultSorted={camelizedSorts}
                onPageChange={pipe(changePage, this.props.onUpdateParams)}
                onPageSizeChange={pipe(
                  changePageSize,
                  this.props.onUpdateParams
                )}
                //@ts-ignore
                onSortedChange={pipe(changeSorted, this.props.onUpdateParams)}
                data={data}
                pages={totalPages}
                loading={loading}
                defaultPageSize={pageSize}
                getTdProps={this.rowProps}
                defaultSortDesc
                noDataText={'No studies found'}
              />
            </div>
          );
        }
    }
  };
  renderSearch = ({
    data,
    loading,
    error,
  }: {
    data: SearchPageSearchQuery | undefined;
    loading: boolean;
    error: any;
  }) => {
    const { currentSiteView } = this.props;

    const showResults = currentSiteView.search.config.fields.showResults;
    let searchData = data?.search?.studies || [];
    const resultsType = currentSiteView.search.results.type;
    let recordsTotal = data?.search?.recordsTotal;
    if (error) {
      return <div>{error.message}</div>;
    }
    if (!data) {
      return null;
    }
    const totalRecords = pathOr(
      0,
      ['search', 'recordsTotal'],
      data
    ) as number;

    if (this.state.prevResults !== this.state.totalResults) {
      this.setState(
        prev => {
          return {
            totalResults: totalRecords,
            prevResults: prev.totalResults,
          };
        },
        () => {
          this.props.getTotalResults(this.state.totalResults);
        }
      );
    }

    return showResults
      ? this.renderHelper(
        searchData,
        loading,
        currentSiteView.search.template,
        this.cardPressed,
        resultsType,
        recordsTotal
      )
      : null;
  };
  cardPressed = card => {
    this.props.onRowClick(
      card.nctId,
      this.props.searchHash,
      this.props.currentSiteView.url || 'default'
    );
  };

  handleAggsUpdated = (data?: SearchPageSearchQuery) => {
    if (data?.search) {
      this.props.onAggsUpdate(
        this.transformAggs(data.search.aggs || []),
        this.transformCrowdAggs(data.crowdAggs.aggs || [])
      );
    }
  };

  sortHelper = (sorts, params) => {
    const idSortedLens = lensProp('id');
    const snakeSorts = map(over(idSortedLens, snakeCase), sorts);
    let newParams = { ...params, sorts: snakeSorts, page: 0 };
    this.props.onUpdateParams(changeSorted(sorts))
  }
  reverseSort = () => {
    let params = this.props.params
    let desc = this.props.params.sorts[0].desc
    let newSort: [SortInput] = [{ id: this.props.params.sorts[0].id, desc: !desc }]
    let newParams = { ...params, sorts: newSort, page: 0 }
    this.props.onUpdateParams(changeSorted(newSort))

  }
  sortDesc = () => {
    if (this.props.params.sorts.length > 0) {
      return this.props.params.sorts[0].desc

    }
    return " "
  }
  renderSortIcons = () => {
    let isDesc = this.props.params.sorts[0].desc
    return (

      <div onClick={() => this.reverseSort()} style={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', cursor: 'pointer' }} >
        {isDesc ? (
          <FontAwesome
            name={'sort-amount-desc'}
            style={{ color: this.props.theme.button, fontSize: '26px' }}
          />) : (
            <FontAwesome
              name={'sort-amount-asc'}
              style={{ color: this.props.theme.button, fontSize: '26px' }}
            />
          )
        }


      </div>
    )
  }
  renderFilterDropDown = () => {
    const sortField = () => {
      if (this.props.params.sorts.length > 0) {
        return aggToField(this.props.params.sorts[0].id, this.props.params.sorts[0].id)

      }
      return " "
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginRight: '-30px' }}>
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <DropdownButton
            bsStyle="default"
            title={`Sort by: ${sortField()}`}
            key="default"
            id="dropdown-basic-default"
            style={{
              margin: '1em 1em 1em 0',
              background: this.props.theme.button,
            }}>

            {this.props.currentSiteView.search.sortables.map((field, index) => {
              let sorts = [{ id: field, desc: false }]
              let params = this.props.params
              return (
                <MenuItem
                  key={field + index}
                  name={field}
                  onClick={() => this.sortHelper(sorts, params)}>
                  {aggToField(field, field)}
                </MenuItem>
              )

            })}

          </DropdownButton>
          {sortField() !== " " ? this.renderSortIcons() : null}

        </div>
      </div>
    )

  }

  render() {
    return (
      <SearchWrapper>
        <Helmet>
          <title>Search</title>
          <meta name="description" content="Description of SearchPage" />
        </Helmet>
        <Col md={12}>
          <QueryComponent
            query={QUERY}
            variables={this.state.variables}
            onCompleted={this.handleAggsUpdated}>
            {({ data, loading, error }) => {
              // Unfortunately the onCompleted callback is not called if
              // the data is served from cache.  There is some confusion
              // in the documentation but this appears to be by design.
              this.handleAggsUpdated(data);
              return (
                <ThemedSearchContainer>
                  {this.renderFilterDropDown()}
                  {this.renderSearch({ data, loading, error })}
                </ThemedSearchContainer>
              );
            }}
          </QueryComponent>
        </Col>
      </SearchWrapper>
    );
  }
}

export default withTheme(SearchView2);
