import * as React from 'react';
import styled from 'styled-components';
import ThemedAutosuggestButton, {
  ThemedPresearchCard,
  ThemedPresearchHeader,
  PresearchTitle,
  PresearchContent,
  ThemedTextFieldToggle,
} from 'components/StyledComponents';
import * as Autosuggest from 'react-autosuggest';
import AddFacetCard from './AddFacetCard';
import CrowdPage from 'containers/CrowdPage';
import CurrentUser from 'containers/CurrentUser';
import LoginModal from 'components/LoginModal';
import { truncateString } from 'containers/FacilitiesPage/FacilityUtils';
import { connect } from 'react-redux';
import { upsertLabelMutation } from '../../services/study/actions'
import {fetchSearchAutoSuggest} from 'services/search/actions';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;



interface FacetCardProps {
  nctId: string;
  label: string;
  children?: any;
  onSelect?: (key: string, value: string, checked: boolean) => void;
  addLabel?: boolean;
  meta: Record<string, string>;
  values?: any[];
  //refetch?: () => void;
  aggNames?: any;
  allValues?: any[];
  showAnimation:any;
  user:any;
  upsertLabelMutation: any; 
  fetchSearchAutoSuggest: any;
  suggestions: any;
  isFetchingAutoSuggest: any;

}

interface FacetCardState {
  textFieldActive: boolean;
  existingField: string;
  suggestions: any[];
  isSuggestionLoading: boolean;
  showLoginModal: boolean;
  showAddFacet: boolean;
}

class FacetCard extends React.PureComponent<FacetCardProps, FacetCardState> {
  state = {
    textFieldActive: false,
    existingField: '',
    suggestions: [],
    isSuggestionLoading: false,
    showLoginModal: false,
    showAddFacet: false,
  };

  input: any;

  handlePlusClick = user => {
    if (user) {
      this.setState(
        {
          textFieldActive: !this.state.textFieldActive,
        },
        () => {
          if (this.state.textFieldActive) {
            this.input.focus();
          }
        }
      );
    } else {
      this.setShowLoginModal(true);
    }
  };

  handleAddFacetPlusClick = user => {
    if (user) {
      this.setState({
        showAddFacet: !this.state.showAddFacet,
      });
    } else {
      this.setShowLoginModal(true);
    }
  };

  setShowLoginModal = showLoginModal => {
    this.setState({ showLoginModal });
  };

  handleExistingFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { newValue },
  ) => {
    this.setState(
      {
        existingField: newValue,
        suggestions: [],
      },
      () => {
        this.queryAutoSuggest();
      }
    );
  };

  queryAutoSuggest = () => {
    const { existingField } = this.state;
    const { label, values } = this.props;
    const variables = {
      // todo: probably want to query more than just browse_condition_mesh_terms
      agg: 'browse_condition_mesh_terms',
      aggFilters: [],
      aggOptionsFilter: existingField,
      crowdAggFilters: [],
      page: 0,
      pageSize: 5,
      q: {
        children: [],
        key: 'AND',
      },
      sorts: [],
      aggFields: [],
      crowdAggFields: [label],
    };
    this.props.fetchSearchAutoSuggest(variables);

    const array = this.props.suggestions.data && this.props.suggestions.data.autocomplete.autocomplete[0].results || [];

    array.map(({ key }, i) => {
      values?.map(([value, checked]) => {
        if (key === value) {
          if (checked) {
            array.splice(i, 1);
          }
          if (key === '-99999999999') {
            array.splice(i, 1);
          }
        }
      });
    });

    const newSet = new Set(array);
    const uniqArr = [...newSet];
    uniqArr.unshift({ key: existingField.trim(), partialString: true });

    this.setState({
      suggestions: uniqArr,
    });
  };

  submitExistingField = (
    key: string,
    value: string,
    meta: {},
    upsertLabelMutation: any
  ) => {
    if (this.props.nctId) {
      CrowdPage.addLabel(
        key,
        value,
        meta,
        this.props.nctId,
        upsertLabelMutation
      );
     // if (this.props.refetch) (this.props.refetch());
    }
  };

  handleButtonClick = upsertLabelMutation => {
    this.submitExistingField(
      this.props.label,
      this.state.existingField,
      this.props.meta,
      upsertLabelMutation
    );
    this.setState({ textFieldActive: false });
  };

  handleNewFacetSubmit = (key, value, upsertLabelMutation) => {
    this.props.showAnimation()
    this.submitExistingField(key, value, this.props.meta, upsertLabelMutation);
  };

  renderSuggestion = suggestion => {
    // const capitalized = capitalize(suggestion);
    if (suggestion.partialString) {
      return (
        <Row>
          <span>{`add "${suggestion.key}" as new description`}</span>
          <ThemedAutosuggestButton>Add</ThemedAutosuggestButton>
        </Row>
      );
    }
    return (
      <Row>
        <span>{`${suggestion.key}`}</span>
        <ThemedAutosuggestButton>Add</ThemedAutosuggestButton>
      </Row>
    );
  };

  onSuggestionSelected = (e,
    { suggestionValue },
    upsertLabelMutation
  ) => {
    this.setState({
      textFieldActive: false,
      existingField: '',
    });
    this.submitExistingField(
      this.props.label,
      suggestionValue,
      this.props.meta,
      upsertLabelMutation
    );
  };

  onSuggestionsFetchRequested = () => {
    this.setState({
      isSuggestionLoading: true,
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      isSuggestionLoading: true,
    });
  };

  getSuggestionValue = suggestion => {
    return suggestion.key;
  };

  storeInputReference = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };

  render() {
    const { label, addLabel, aggNames, allValues, user } = this.props;
    const {
      textFieldActive,
      existingField,
      suggestions,
      showLoginModal,
      showAddFacet,
    } = this.state;

    if (addLabel) {
      return (
        <>
                      <LoginModal
                        show={showLoginModal}
                        cancel={() => this.setShowLoginModal(false)}
                      />
                      <ThemedPresearchCard
                        style={{ height: showAddFacet ? null : 60 }}>
                        <ThemedPresearchHeader>
                          <PresearchTitle>
                            {truncateString(label, 18, true)}
                            {!showAddFacet && (
                            <ThemedTextFieldToggle
                              onClick={() =>
                                this.handleAddFacetPlusClick(user)
                              }>
                              +
                            </ThemedTextFieldToggle>
                          )}
                          {showAddFacet && (
                            <ThemedTextFieldToggle
                              onClick={this.handleAddFacetPlusClick}>
                              -
                            </ThemedTextFieldToggle>
                          )}
                          </PresearchTitle>
                        </ThemedPresearchHeader>
                        <AddFacetCard
                          upsert={this.props.upsertLabelMutation}
                          submitFacet={this.handleNewFacetSubmit}
                          user={user}
                          showLogin={this.setShowLoginModal}
                          aggNames={aggNames}
                          values={allValues}
                          showAddFacet={showAddFacet}
                        />
                      </ThemedPresearchCard>
        </>
      );
    }
    return (
      <>
                    <LoginModal
                      show={showLoginModal}
                      cancel={() => this.setShowLoginModal(false)}
                    />
                    <ThemedPresearchCard>
                      <ThemedPresearchHeader>
                        <PresearchTitle>
                          {truncateString(label, 18, true)}
                          {!textFieldActive && (
                          <ThemedTextFieldToggle
                            onClick={() => this.handlePlusClick(user)}>
                            +
                          </ThemedTextFieldToggle>
                        )}
                        {textFieldActive && (
                          <ThemedTextFieldToggle onClick={this.handlePlusClick}>
                            -
                          </ThemedTextFieldToggle>
                        )}
                        </PresearchTitle>
                      </ThemedPresearchHeader>
                      <PresearchContent style={{ overflowY: 'auto', overflowX: 'hidden'}}>
                      {textFieldActive && (
                        <Autosuggest
                          suggestions={suggestions}
                          renderSuggestion={this.renderSuggestion}
                          inputProps={{
                            placeholder: 'enter a new description...',
                            value: existingField,
                            onChange: (e, existingField) =>
                              this.handleExistingFieldChange(
                                e,
                                existingField,
                              ),
                          }}
                          onSuggestionSelected={(e,
                            {
                              suggestionValue,
                            },
                          ) =>
                            this.onSuggestionSelected(e,
                              {
                                suggestionValue,
                              },
                              this.props.upsertLabelMutation
                            )
                          }
                          onSuggestionsFetchRequested={
                            this.onSuggestionsFetchRequested
                          }
                          onSuggestionsClearRequested={
                            this.onSuggestionsClearRequested
                          }
                          getSuggestionValue={this.getSuggestionValue}
                          ref={this.storeInputReference}
                        />
                      )}
                        {this.props.children}
                      </PresearchContent>
                    </ThemedPresearchCard>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  suggestions: state.search.suggestions,
  isFetchingAutoSuggest:  state.search.isFetchingAutoSuggest
})
const mapDispatchToProps = (dispatch) => ({
  upsertLabelMutation: (variables?) => dispatch(upsertLabelMutation(variables.nctId, variables.key, variables.value)),
  fetchSearchAutoSuggest: (variables) => dispatch(fetchSearchAutoSuggest(variables))

})
export default connect(mapStateToProps, mapDispatchToProps) (FacetCard);
