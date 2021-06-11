import React, { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';
import MailMerge from './MailMerge';
import { GraphqlSchemaType } from './SchemaSelector';
import { IslandConstructor } from './MailMergeView';
import { useFragment } from './MailMergeFragment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSampleStudy } from 'services/study/actions';
import { getSampleStudyQuery, getSampleSearchQuery } from 'services/study/queries';
import { RootState } from 'reducers';
import { fetchIntrospection } from 'services/introspection/actions';
//import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import { fetchStudyPage, fetchSearchPageMM, fetchStudyPageHasura } from 'services/study/actions';
import { fetchSearchParams } from 'services/search/actions';
import { getStudyQuery, getSearchQuery, getHasuraStudyQuery } from 'components/MailMerge/MailMergeUtils';
import { useHasuraFragment } from 'components/MailMerge/HasuraMMFragment';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 20px;
`;
const Container = styled.div`
  max-width: 1200px;
  margin-bottom: 20px;
`;
type Mode = 'Study' | 'Search' | 'Hasura Study';

// return a tuple of the elements that differ with the mode
// query, params, schema

function getClassForMode(mode: Mode) {
  switch (mode) {
    case 'Study':
      return 'ctgov_studies';
    case 'Hasura Study':
      return 'ctgov_studies';
    case 'Search':
      return 'ElasticStudy';
      
  }
}
interface MailMergeFormControlProps {
  template: string;
  onTemplateChanged: (t: string) => void;
  islands?: Record<string, IslandConstructor>;
  pageType?: any;
}

const default_nctid = 'NCT00004074';
const default_hash = 'gELcp_Fb'

export default function MailMergeFormControl(props: MailMergeFormControlProps) {
  const [nctId, setNctId] = useState(default_nctid);
  const [searchHash, setSearchHash] = useState(default_hash);
  // const [mode, setMode] = useState<Mode>('Study');
  const mode = props.pageType
  let [nctOrSearchHash, setNctOrSearchHash] = useState(default_nctid);

  const dispatch = useDispatch();
  const DEFAULT_PARAMS  = {
    q: { children: [], key: 'AND' },
    aggFilters: [],
    crowdAggFilters: [],
    sorts: [],
    page: 0,
    pageSize: 100,
  };


  const introspection = useSelector((state: RootState) => state.introspection.introspection);
  const schemaType = getClassForMode(mode);
  const [fragmentName, fragment] = useFragment(schemaType, props.template);
  // const [fragmentName, fragment] = useFragment('Study', props.template);
  const [hasuraFragmentName, hasuraFragment] = useHasuraFragment('ctgov_studies', props?.template || '');

  useEffect(() => {
    mode == "Search" && dispatch(fetchSearchParams(searchHash));
  }, [dispatch, searchHash]);
  
  const data = useSelector((state: RootState) => state.search.searchResults);
  
  useEffect(() => {
    
    let searchParams = data && mode == "Search" ? { ...data?.data.searchParams } : null;
    
    const QUERY = introspectionQuery  //`${gql(getIntrospectionQuery({ descriptions: false }))}`
    dispatch(fetchIntrospection(QUERY));
  }, [dispatch, fragment, mode]);
  const studyData = useSelector((state: RootState) => state.study.studyPage);
  
  useEffect(() => {
    let searchParams = data && mode == "Search" ? { ...data.data.searchParams.searchParams } : DEFAULT_PARAMS;

    const HASURA_STUDY_QUERY = `${getHasuraStudyQuery(hasuraFragmentName, hasuraFragment)}`
    const SEARCH_QUERY = `${getSearchQuery(fragmentName, fragment)}`

    dispatch(mode == "Study" ? fetchStudyPageHasura(nctId ?? "", HASURA_STUDY_QUERY) : fetchSearchPageMM(searchParams ?? "", SEARCH_QUERY));
  }, [dispatch, fragment, mode]);

  if (!studyData) {
    return <BeatLoader />;
  }

  if (!introspection) {
    return <BeatLoader />;
  }

  // const schema : GraphqlSchemaType = {
  //   kind: 'graphql',
  //   typeName: 'Study',
  //   types: introspection.data.__schema.types,
  // };

  // const schema2: GraphqlSchemaType = {
  //   kind: 'graphql',
  //   typeName: 'Search',
  //   types: introspection.data.__schema.types,
  // };
  const types = introspection.data.__schema.types;
  const searchData = () => {
    let studies: any[] = []
    studyData?.data?.search?.studies?.map((study, index) => {
      studies.push({ ...study, hash: 'hash', siteViewUrl: "siteViewUrl", pageViewUrl: 'pageViewUrl', q: 'q', ALL: 'ALL' })
    })
    return {
      studies,
      recordsTotal: studyData?.data?.search?.recordsTotal
  }
  }
  return (
    <Container>
      {/* <StyledFormControl
        placeholder={default_nctid}
        value={nctId}
        onChange={e => setNctId(e.target.value || default_nctid)}
      /> */}
      <MailMerge
        schema={{ kind: 'graphql', typeName: schemaType, types }}
        sample={mode == 'Study' ? (studyData?.data?.ctgov_studies) : searchData()}
        template={props.template}
        onTemplateChanged={props.onTemplateChanged}
        islands={props.islands}
        pageType={mode}
      />
      {/* <CollapsiblePanel></CollapsiblePanel> */}
    </Container>
  );
}
