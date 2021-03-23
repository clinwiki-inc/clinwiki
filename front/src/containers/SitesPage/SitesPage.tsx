import * as React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { SiteItem } from 'components/SiteItem';
import CollapsiblePanel from 'components/CollapsiblePanel';
import { History } from 'history';
import ThemedButton from 'components/StyledComponents/index';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSite, fetchSitesPage } from 'services/site/actions'
import { fetchSitesPageHasura } from 'services/hasuraSite/actions'
import { useEffect } from 'react';
import {RootState} from 'reducers';
import { BeatLoader } from 'react-spinners';

const Container = styled.div`
padding: 20px;
`;

const ButtonsContainer = styled.div`
display: flex;
justify-content: flex-end;
margin-bottom: 20px;
`;
interface SitesPageProps {
  history: History;
}

const SitesPage = ({history} : SitesPageProps) => {

  const dispatch = useDispatch();
  const data = useSelector((state : RootState ) => state.hasuraSite)
  const isLoading = useSelector((state : RootState ) => state.site.isFetchingSitesPage)
  const isDeleting = useSelector((state : RootState ) => state.site.isDeletingSite)

  const handleCreateSite = () => {
    history.push('/sites/new');
  };
  const handleSiteEdit = (id: number) => {
    history.push(`/sites/${id}/edit`);
  };
  const handleSiteDelete = (id: number) => {
    dispatch(deleteSite(id));
  };

  useEffect(() => {
      console.log("Sites page");
      dispatch(fetchSitesPageHasura());
      //dispatch(fetchSitesPage());
  },[ dispatch ]); 
if (data === undefined || isLoading || isDeleting) {
  console.log(data);
  return <BeatLoader />
}
  return (
    <Container>
      <CollapsiblePanel header="My Sites">
        {data!.hasuraSite.hasuraSitesData.length > 0 && (
          <Table striped bordered condensed>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subdomain</th>
                <th />
              </tr>
            </thead>
            <tbody>            
                  <>
                    {data!.sites.map(site => (
                      <SiteItem
                        site={site}
                        key={site.subdomain}
                        onEdit={handleSiteEdit}
                        onDelete={handleSiteDelete}
                      />
                    ))}
                  </>
            </tbody>
          </Table>
        )}
        {data.sites.length === 0 && 'No sites yet'}
      </CollapsiblePanel>
      <ButtonsContainer>
        <ThemedButton onClick={handleCreateSite}>
          Create Site
        </ThemedButton>
      </ButtonsContainer>
      <CollapsiblePanel header="Editable Sites">
        {data.sites.length > 0 && (
          <Table striped bordered condensed>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subdomain</th>
              </tr>
            </thead>
            <tbody>
              {data.sites.map(site => (
                <SiteItem
                  site={site}
                  key={site.subdomain}
                  onEdit={handleSiteEdit}
                />
              ))}
            </tbody>
          </Table>
        )}
        {data.sites.length === 0 && 'No sites yet'}
      </CollapsiblePanel>
    </Container>
  );
}

export default SitesPage;
