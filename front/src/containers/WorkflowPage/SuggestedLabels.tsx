import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  SuggestedLabelsQuery_crowdAggFacets_aggs,
} from 'services/study/model/SuggestedLabelsQuery';
import {
  pipe,
  map,
  fromPairs,
  keys,
  defaultTo,
} from 'ramda';
import { bucketKeyStringIsMissing } from 'utils/aggs/bucketKeyIsMissing';
import FacetCard from 'components/FacetCard/FacetCard';
import { WorkflowConfigFragment_suggestedLabelsConfig } from '../../services/study/model/WorkflowConfigFragment';
import { BeatLoader } from 'react-spinners';
import Error from 'components/Error';
import { fetchSuggestedLabels, upsertLabelMutation, deleteLabelMutation } from '../../services/study/actions'
import  equal  from 'fast-deep-equal';
import FacetCardCheckbox from 'components/FacetCard/FacetCardCheckbox';

interface SuggestedLabelsProps {
  nctId: string;
  onSelect: (key: string, value: string, checked: boolean) => void;
  disabled?: boolean;
  allowedSuggestedLabels: string[];
  suggestedLabelsConfig: Record<
    string,
    WorkflowConfigFragment_suggestedLabelsConfig
  >;
  showAnimation: any;
  isLoading: any;
  suggestedLabels: any;
  fetchSuggestedLabels: any;
}

const LabelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface SuggestedLabelsState {
  list: string[];
}

class SuggestedLabels extends React.PureComponent<
  SuggestedLabelsProps,
  SuggestedLabelsState
  > {
  handleSelect2 = (key: string, value: string, checked) => {
    this.props.onSelect(key, value, checked);
    this.props.showAnimation();
  };

  public getID() {
    return this.props.nctId;
  }
  componentDidMount() {
    this.props.fetchSuggestedLabels(this.props.nctId)
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props.nctId, prevProps.nctId)) // Check if it's a new nctId, refetch
    {
      this.props.fetchSuggestedLabels(this.props.nctId)
    }
  } 

  renderAgg = (
    key: string,
    values: [string, boolean][],
    meta: Record<string, string>,
    config?: WorkflowConfigFragment_suggestedLabelsConfig
  ) => {
    // If config.visibleOptions is present replace values with the whitelist, preserve checked

    const checkedValues = new Set(
      values.filter(([_, checked]) => checked).map(([value, _]) => value)
    );

    let items = values.map(([value, _]) => value);
    if (
      config &&
      config.visibleOptions.kind === 'WHITELIST' &&
      config.visibleOptions.values.length > 0
    ) {
      items = config.visibleOptions.values;
      // 'key' means alpha
      if (config.order?.sortKind === 'key') {
        items.sort();
        if (!config.order?.desc) {
          items.reverse();
        }
      }
    }
    return (
      <FacetCard
        key={key}
        label={key}
        meta={meta}
        nctId={this.props.nctId}
        values={items}
        onSelect={this.props.onSelect}
        //refetch={()=>this.refetch}
        showAnimation={this.props.showAnimation}
      >
        {items.map(value => {
          if (bucketKeyStringIsMissing(value)) {
            return null;
          }
          return (
            <FacetCardCheckbox
              nctId={this.props.nctId}
              notKey={key}
              key={value}
              value={value}
              checkedValues={checkedValues}
              disabled={this.props.disabled}
              handleSelect2={this.handleSelect2}/>
          );
        })}
      </FacetCard>
    );
  };

  render() {

          if (this.props.isLoading) return <BeatLoader />;
          // if (error) return <Error message={error.message} />;
          if (!this.props.suggestedLabels) return null;
          const data = this.props.suggestedLabels.data
          let meta: Record<string, string> = {};
          try {
            //@ts-ignore
            meta = JSON.parse(data.study?.wikiPage?.meta || '{}');
          } catch (e) {
            console.log(`Error parsing meta: ${meta}`);
          }

          const labels = fromPairs(
            keys(meta).map(key => [key, meta[key].split('|')])
          );

          const aggs = pipe(
            map((agg: SuggestedLabelsQuery_crowdAggFacets_aggs) => {
              const name = agg.name.substring(3);
              const existingLabels = labels[name] || [];
              return [
                name,
                agg.buckets.map(bucket => {
                  return [
                    defaultTo(bucket.key)(bucket.keyAsString),
                    existingLabels.includes(bucket.key),
                  ];
                }),
              ];
            }),
            // @ts-ignore
            fromPairs
            // @ts-ignore
          )(data?.crowdAggFacets?.aggs || []);

          const config = this.props.suggestedLabelsConfig;

          const max = 999999;
          const aggNames = keys(aggs)
            .filter(name => this.props.allowedSuggestedLabels.includes(name))
            .sort(
              (a, b) => (config[a]?.rank || max) - (config[b]?.rank || max)
            );

          const allCrowdAggs = keys(aggs);

          return (
            <LabelsContainer>
              {aggNames.map(key =>
                this.renderAgg(
                  key,
                  aggs[key],
                  meta,
                  this.props.suggestedLabelsConfig[key]
                )
              )}
              <FacetCard
                meta={meta}
                label="Add Label"
                addLabel
                nctId={this.props.nctId}
                //refetch={()=>this.refetch}
                aggNames={allCrowdAggs}
                allValues={aggs}
                showAnimation={this.props.showAnimation}
              />
            </LabelsContainer>
          );
        }
}
const mapDispatchToProps = (dispatch) => ({
  fetchSuggestedLabels: (nctId? ) => dispatch(fetchSuggestedLabels(nctId)),
  upsertLabelMutation: (nctId?, key?, value?) => dispatch(upsertLabelMutation(nctId, key, value)),
  deleteLabelMutation: (nctId?, key?, value?) => dispatch(deleteLabelMutation(nctId, key, value))
})
const mapStateToProps = (state, ownProps) => ({
  isLoading: state.study.isFetchingSuggestedLables,
  suggestedLabels: state.study.suggestedLabels
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedLabels);
