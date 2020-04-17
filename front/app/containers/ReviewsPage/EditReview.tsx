import * as React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
  EditReviewQuery,
  EditReviewQueryVariables,
} from 'types/EditReviewQuery';
import { match } from 'react-router-dom';
import { find, propEq, pipe, split, dropLast, join } from 'ramda';
import ReviewForm from 'containers/ReviewForm';
import { ReviewsPageFragment } from 'types/ReviewsPageFragment';
import { History } from 'history';
import StudySummary from 'components/StudySummary';
import { trimPath } from 'utils/helpers';

interface EditReviewProps {
  match: match<{ nctId: string; id?: string }>;
  history: History;
  onLoaded?: () => void;
  isWorkflow?: boolean;
  nextLink?: string | null;
  theme?: any;
}

const QUERY = gql`
  query EditReviewQuery($nctId: String!) {
    study(nctId: $nctId) {
      ...StudySummaryFragment
      reviews {
        ...ReviewFragment
      }
      nctId
    }
  }

  ${ReviewForm.fragment}
  ${StudySummary.fragment}
`;

class QueryComponent extends Query<EditReviewQuery, EditReviewQueryVariables> {}

class EditReview extends React.PureComponent<EditReviewProps> {
  handleReviewSave = () => {
    const redirectPath = pipe(
      trimPath,
      split('/'),
      dropLast(1),
      join('/')
    )(this.props.match.url);
    this.props.history.push(redirectPath);
  };

  render() {
    console.log('theme in edit', this.props.theme);
    return (
      <QueryComponent
        query={QUERY}
        variables={{ nctId: this.props.match.params.nctId }}>
        {({ data, loading, error }) => {
          if (loading || error || !data || !data.study || !data.study.reviews) {
            return null;
          }
          if (!this.props.match.params.id) {
            return null;
          }
          const id = parseInt(this.props.match.params.id, 10);
          const review = find(
            propEq('id', id),
            data.study.reviews
          ) as ReviewsPageFragment;
          if (!review) return null;

          this.props.onLoaded && this.props.onLoaded();

          return (
            <ReviewForm
              review={review}
              nctId={this.props.match.params.nctId}
              afterSave={this.handleReviewSave}
              theme={this.props.theme}
            />
          );
        }}
      </QueryComponent>
    );
  }
}

export default EditReview;
