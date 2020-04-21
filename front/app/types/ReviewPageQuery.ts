/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReviewPageQuery
// ====================================================

export interface ReviewPageQuery_study_reviews_user {
  __typename: "User";
  /**
   * Id
   */
  id: number;
  /**
   * First name
   */
  firstName: string | null;
  /**
   * Last name
   */
  lastName: string | null;
  /**
   * Email
   */
  email: string;
}

export interface ReviewPageQuery_study_reviews {
  __typename: "Review";
  id: number;
  /**
   * Json key value pairs of meta information.
   */
  meta: string;
  content: string;
  createdAt: any;
  user: ReviewPageQuery_study_reviews_user;
}

export interface ReviewPageQuery_study {
  __typename: "Study";
  acronym: string | null;
  ages: string;
  averageRating: number;
  baselinePopulation: string | null;
  biospecDescription: string | null;
  biospecRetention: string | null;
  briefSummary: string | null;
  briefTitle: string;
  collaborators: string;
  completionDate: any | null;
  completionDateType: string | null;
  completionMonthYear: string | null;
  conditions: string | null;
  contacts: string;
  createdAt: any;
  design: string;
  detailedDescription: string | null;
  dispositionFirstPostedDate: string | null;
  dispositionFirstPostedDateType: string | null;
  dispositionFirstSubmittedDate: string | null;
  dispositionFirstSubmittedQcDate: string | null;
  eligibilityCriteria: string;
  eligibilityGender: string;
  eligibilityHealthyVolunteers: string;
  enrollment: number | null;
  enrollmentType: string | null;
  expandedAccessTypeIndividual: string | null;
  expandedAccessTypeIntermediate: string | null;
  expandedAccessTypeTreatment: string | null;
  firstReceivedDate: any | null;
  hasDataMonitoringCommittee: boolean;
  hasDmc: string | null;
  hasExpandedAccess: string | null;
  investigators: string;
  ipdAccessCriteria: string | null;
  ipdTimeFrame: string | null;
  ipdUrl: string | null;
  isFdaRegulated: boolean;
  isFdaRegulatedDevice: string | null;
  isFdaRegulatedDrug: string | null;
  isPpsd: string | null;
  isUnapprovedDevice: string | null;
  isUsExport: string | null;
  lastChangedDate: any | null;
  lastKnownStatus: string | null;
  lastUpdatePostedDate: string | null;
  lastUpdatePostedDateType: string | null;
  lastUpdateSubmittedDate: string | null;
  lastUpdateSubmittedQcDate: string | null;
  limitationsAndCaveats: string | null;
  listedLocationCountries: string;
  nctId: string;
  nlmDownloadDateDescription: string | null;
  numberOfArms: string | null;
  numberOfGroups: string | null;
  officialTitle: string | null;
  otherStudyIds: string;
  overallStatus: string;
  phase: string | null;
  planToShareIpd: string | null;
  planToShareIpdDescription: string | null;
  primaryCompletionDate: any | null;
  primaryCompletionDateType: string | null;
  primaryCompletionMonthYear: string | null;
  primaryMeasures: string | null;
  publications: string;
  removedLocationCountries: string;
  responsibleParty: string;
  resultsFirstPostedDate: string | null;
  resultsFirstPostedDateType: string | null;
  resultsFirstSubmittedDate: string | null;
  resultsFirstSubmittedQcDate: string | null;
  reviewsCount: number;
  secondaryMeasures: string | null;
  source: string;
  sponsor: string;
  startDate: any | null;
  startDateType: string | null;
  startMonthYear: string | null;
  studyArms: string;
  studyFirstPostedDate: string | null;
  studyFirstPostedDateType: string | null;
  studyFirstSubmittedDate: string | null;
  studyFirstSubmittedQcDate: string | null;
  studyType: string;
  targetDuration: string | null;
  type: string;
  updatedAt: any;
  verificationDate: any | null;
  verificationMonthYear: string | null;
  whyStopped: string | null;
  reviews: ReviewPageQuery_study_reviews[];
}

export interface ReviewPageQuery_me {
  __typename: "User";
  /**
   * Id
   */
  id: number;
}

export interface ReviewPageQuery {
  study: ReviewPageQuery_study | null;
  /**
   * Current logged in user
   */
  me: ReviewPageQuery_me | null;
}

export interface ReviewPageQueryVariables {
  nctId: string;
}
