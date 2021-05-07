/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortKind, FieldDisplay, FilterKind } from "./InputTypes";

// ====================================================
// GraphQL query operation: SiteProviderQuery
// ====================================================

export interface SiteProviderQuery_site_editors {
  __typename: "User";
  /**
   * Email
   */
  email: string;
}

export interface SiteProviderQuery_site_owners {
  __typename: "User";
  /**
   * Email
   */
  email: string;
}

export interface SiteProviderQuery_site_siteView_study_basicSections {
  __typename: "SiteStudyBasicGenericSection";
  hide: boolean;
  title: string;
  name: string;
}

export interface SiteProviderQuery_site_siteView_study_extendedSections {
  __typename: "SiteStudyExtendedGenericSection";
  template: string | null;
  hide: boolean;
  order: number | null;
  title: string;
  name: string;
}

export interface SiteProviderQuery_site_siteView_study {
  __typename: "SiteStudyPage";
  allFields: string[];
  basicSections: SiteProviderQuery_site_siteView_study_basicSections[];
  extendedSections: SiteProviderQuery_site_siteView_study_extendedSections[];
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_aggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteView_search_autoSuggest_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  preselected: SiteProviderQuery_site_siteView_search_autoSuggest_aggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteView_search_autoSuggest_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_aggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteView_search_autoSuggest_aggs_fields[];
  selected: SiteProviderQuery_site_siteView_search_autoSuggest_aggs_selected;
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  preselected: SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_fields[];
  selected: SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs_selected;
}

export interface SiteProviderQuery_site_siteView_search_autoSuggest {
  __typename: "SiteAutoSuggestSection";
  aggs: SiteProviderQuery_site_siteView_search_autoSuggest_aggs;
  crowdAggs: SiteProviderQuery_site_siteView_search_autoSuggest_crowdAggs;
}

export interface SiteProviderQuery_site_siteView_search_results_buttons_items {
  __typename: "ResultButtonItems";
  icon: string;
  target: string;
}

export interface SiteProviderQuery_site_siteView_search_results_buttons {
  __typename: "ResultsButton";
  items: SiteProviderQuery_site_siteView_search_results_buttons_items[];
  location: string;
}

export interface SiteProviderQuery_site_siteView_search_results {
  __typename: "SiteResultsSection";
  type: string;
  buttons: SiteProviderQuery_site_siteView_search_results_buttons;
}

export interface SiteProviderQuery_site_siteView_search_crumbs {
  __typename: "CrumbResultSection";
  search: boolean;
}

export interface SiteProviderQuery_site_siteView_search_presearch_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteView_search_presearch_aggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteProviderQuery_site_siteView_search_presearch_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_presearch_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_presearch_aggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteView_search_presearch_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteProviderQuery_site_siteView_search_presearch_aggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteProviderQuery_site_siteView_search_presearch_aggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteView_search_presearch_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteProviderQuery_site_siteView_search_presearch_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_presearch_aggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteView_search_presearch_aggs_fields[];
  selected: SiteProviderQuery_site_siteView_search_presearch_aggs_selected;
}

export interface SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteProviderQuery_site_siteView_search_presearch_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_presearch_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteView_search_presearch_crowdAggs_fields[];
  selected: SiteProviderQuery_site_siteView_search_presearch_crowdAggs_selected;
}

export interface SiteProviderQuery_site_siteView_search_presearch_button {
  __typename: "PresearchButtonSection";
  name: string;
  target: string;
}

export interface SiteProviderQuery_site_siteView_search_presearch {
  __typename: "SitePresearchPage";
  aggs: SiteProviderQuery_site_siteView_search_presearch_aggs;
  crowdAggs: SiteProviderQuery_site_siteView_search_presearch_crowdAggs;
  button: SiteProviderQuery_site_siteView_search_presearch_button;
  instructions: string;
  showResults: boolean | null;
}

export interface SiteProviderQuery_site_siteView_search_config_fields {
  __typename: "SiteConfigField";
  showPresearch: boolean;
  showFacetBar: boolean;
  showAutoSuggest: boolean;
  showBreadCrumbs: boolean;
  showResults: boolean;
}

export interface SiteProviderQuery_site_siteView_search_config {
  __typename: "SiteConfigSection";
  fields: SiteProviderQuery_site_siteView_search_config_fields;
}

export interface SiteProviderQuery_site_siteView_search_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteView_search_aggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteProviderQuery_site_siteView_search_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_aggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteView_search_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteProviderQuery_site_siteView_search_aggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteProviderQuery_site_siteView_search_aggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteView_search_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteProviderQuery_site_siteView_search_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_aggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteView_search_aggs_fields[];
  selected: SiteProviderQuery_site_siteView_search_aggs_selected;
}

export interface SiteProviderQuery_site_siteView_search_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteView_search_crowdAggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteProviderQuery_site_siteView_search_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteView_search_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteProviderQuery_site_siteView_search_crowdAggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteProviderQuery_site_siteView_search_crowdAggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteView_search_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteProviderQuery_site_siteView_search_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteView_search_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteView_search_crowdAggs_fields[];
  selected: SiteProviderQuery_site_siteView_search_crowdAggs_selected;
}

export interface SiteProviderQuery_site_siteView_search {
  __typename: "SiteSearchPage";
  type: string;
  template: string;
  autoSuggest: SiteProviderQuery_site_siteView_search_autoSuggest;
  results: SiteProviderQuery_site_siteView_search_results;
  crumbs: SiteProviderQuery_site_siteView_search_crumbs;
  presearch: SiteProviderQuery_site_siteView_search_presearch;
  sortables: string[];
  fields: string[];
  config: SiteProviderQuery_site_siteView_search_config;
  aggs: SiteProviderQuery_site_siteView_search_aggs;
  crowdAggs: SiteProviderQuery_site_siteView_search_crowdAggs;
}

export interface SiteProviderQuery_site_siteView {
  __typename: "SiteView";
  name: string | null;
  url: string | null;
  id: number;
  default: boolean | null;
  description: string | null;
  study: SiteProviderQuery_site_siteView_study;
  search: SiteProviderQuery_site_siteView_search;
}

export interface SiteProviderQuery_site_siteViews_study_basicSections {
  __typename: "SiteStudyBasicGenericSection";
  hide: boolean;
  title: string;
  name: string;
}

export interface SiteProviderQuery_site_siteViews_study_extendedSections {
  __typename: "SiteStudyExtendedGenericSection";
  template: string | null;
  hide: boolean;
  order: number | null;
  title: string;
  name: string;
}

export interface SiteProviderQuery_site_siteViews_study {
  __typename: "SiteStudyPage";
  allFields: string[];
  basicSections: SiteProviderQuery_site_siteViews_study_basicSections[];
  extendedSections: SiteProviderQuery_site_siteViews_study_extendedSections[];
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  preselected: SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_aggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_fields[];
  selected: SiteProviderQuery_site_siteViews_search_autoSuggest_aggs_selected;
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  preselected: SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_fields[];
  selected: SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs_selected;
}

export interface SiteProviderQuery_site_siteViews_search_autoSuggest {
  __typename: "SiteAutoSuggestSection";
  aggs: SiteProviderQuery_site_siteViews_search_autoSuggest_aggs;
  crowdAggs: SiteProviderQuery_site_siteViews_search_autoSuggest_crowdAggs;
}

export interface SiteProviderQuery_site_siteViews_search_results_buttons_items {
  __typename: "ResultButtonItems";
  icon: string;
  target: string;
}

export interface SiteProviderQuery_site_siteViews_search_results_buttons {
  __typename: "ResultsButton";
  items: SiteProviderQuery_site_siteViews_search_results_buttons_items[];
  location: string;
}

export interface SiteProviderQuery_site_siteViews_search_results {
  __typename: "SiteResultsSection";
  type: string;
  buttons: SiteProviderQuery_site_siteViews_search_results_buttons;
}

export interface SiteProviderQuery_site_siteViews_search_crumbs {
  __typename: "CrumbResultSection";
  search: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_aggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_presearch_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_presearch_aggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteViews_search_presearch_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteProviderQuery_site_siteViews_search_presearch_aggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteProviderQuery_site_siteViews_search_presearch_aggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteViews_search_presearch_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_presearch_aggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteViews_search_presearch_aggs_fields[];
  selected: SiteProviderQuery_site_siteViews_search_presearch_aggs_selected;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_presearch_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_fields[];
  selected: SiteProviderQuery_site_siteViews_search_presearch_crowdAggs_selected;
}

export interface SiteProviderQuery_site_siteViews_search_presearch_button {
  __typename: "PresearchButtonSection";
  name: string;
  target: string;
}

export interface SiteProviderQuery_site_siteViews_search_presearch {
  __typename: "SitePresearchPage";
  aggs: SiteProviderQuery_site_siteViews_search_presearch_aggs;
  crowdAggs: SiteProviderQuery_site_siteViews_search_presearch_crowdAggs;
  button: SiteProviderQuery_site_siteViews_search_presearch_button;
  instructions: string;
  showResults: boolean | null;
}

export interface SiteProviderQuery_site_siteViews_search_config_fields {
  __typename: "SiteConfigField";
  showPresearch: boolean;
  showFacetBar: boolean;
  showAutoSuggest: boolean;
  showBreadCrumbs: boolean;
  showResults: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_config {
  __typename: "SiteConfigSection";
  fields: SiteProviderQuery_site_siteViews_search_config_fields;
}

export interface SiteProviderQuery_site_siteViews_search_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_aggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteProviderQuery_site_siteViews_search_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_aggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteViews_search_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteProviderQuery_site_siteViews_search_aggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteProviderQuery_site_siteViews_search_aggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteViews_search_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteProviderQuery_site_siteViews_search_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_aggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteViews_search_aggs_fields[];
  selected: SiteProviderQuery_site_siteViews_search_aggs_selected;
}

export interface SiteProviderQuery_site_siteViews_search_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteProviderQuery_site_siteViews_search_crowdAggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteProviderQuery_site_siteViews_search_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteProviderQuery_site_siteViews_search_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteProviderQuery_site_siteViews_search_crowdAggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteProviderQuery_site_siteViews_search_crowdAggs_fields_preselected;
  visibleOptions: SiteProviderQuery_site_siteViews_search_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteProviderQuery_site_siteViews_search_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteProviderQuery_site_siteViews_search_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteProviderQuery_site_siteViews_search_crowdAggs_fields[];
  selected: SiteProviderQuery_site_siteViews_search_crowdAggs_selected;
}

export interface SiteProviderQuery_site_siteViews_search {
  __typename: "SiteSearchPage";
  type: string;
  template: string;
  autoSuggest: SiteProviderQuery_site_siteViews_search_autoSuggest;
  results: SiteProviderQuery_site_siteViews_search_results;
  crumbs: SiteProviderQuery_site_siteViews_search_crumbs;
  presearch: SiteProviderQuery_site_siteViews_search_presearch;
  sortables: string[];
  fields: string[];
  config: SiteProviderQuery_site_siteViews_search_config;
  aggs: SiteProviderQuery_site_siteViews_search_aggs;
  crowdAggs: SiteProviderQuery_site_siteViews_search_crowdAggs;
}

export interface SiteProviderQuery_site_siteViews {
  __typename: "SiteView";
  name: string | null;
  url: string | null;
  id: number;
  default: boolean | null;
  description: string | null;
  study: SiteProviderQuery_site_siteViews_study;
  search: SiteProviderQuery_site_siteViews_search;
}

export interface SiteProviderQuery_site {
  __typename: "Site";
  id: number;
  editors: SiteProviderQuery_site_editors[];
  name: string;
  skipLanding: boolean | null;
  hideDonation: boolean | null;
  subdomain: string;
  defaultHash: string;
  defaultSearchPage: string;
  themes: string;
  reactionsConfig: string;
  userRank: string;
  owners: SiteProviderQuery_site_owners[];
  siteView: SiteProviderQuery_site_siteView;
  siteViews: SiteProviderQuery_site_siteViews[];
}

export interface SiteProviderQuery {
  /**
   * If id is missing, returns current site. If id == 0, returns default site
   */
  site: SiteProviderQuery_site | null;
}

export interface SiteProviderQueryVariables {
  id?: number | null;
  url?: string | null;
}
