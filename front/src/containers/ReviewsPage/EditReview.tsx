import * as React from 'react';
import { match } from 'react-router-dom';
import { find, propEq, pipe, split, dropLast, join } from 'ramda';
import ReviewForm from 'containers/ReviewForm';
import useUrlParams,{queryStringAll} from 'utils/UrlParamsProvider';
import { ReviewsPageFragment } from 'types/ReviewsPageFragment';
import { History } from 'history';
import { trimPath } from 'utils/helpers';
import withTheme from 'containers/ThemeProvider';
import { } from '../../services/study/actions';
import {connect} from 'react-redux';

interface EditReviewProps {
  match: match<{ nctId: string; id?: string }>;
  history: History;
  onLoaded?: () => void;
  isWorkflow?: boolean;
  nextLink?: string | null;
  theme?: any;
  nctId:string;
  upsertReviewFormMutation: any;
  review: any;
  handleClose: any;
}

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
    const data = this.props.review.data;
    if (!data || !data.study || !data.study.reviews) {
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
        nctId={this.props.match.params.nctId||this.props.nctId}
        afterSave={this.handleReviewSave}
        theme={this.props.theme}
        handleClose={this.props.handleClose}
        upsertReviewFormMutation={this.props.upsertReviewFormMutation}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  review: state.study.reviewPage
});
export default connect (mapStateToProps, null) (withTheme(EditReview));
