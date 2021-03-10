/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortKind, FieldDisplay, FilterKind } from "./InputTypes";

// ====================================================
// GraphQL fragment: SiteFragment
// ====================================================

export interface SiteFragment_editors {
  __typename: "User";
  /**
   * Email
   */
  email: string;
}

export interface SiteFragment_owners {
  __typename: "User";
  /**
   * Email
   */
  email: string;
}

export interface SiteFragment_siteView_study_basicSections {
  __typename: "SiteStudyBasicGenericSection";
  hide: boolean;
  title: string;
  name: string;
}

export interface SiteFragment_siteView_study_extendedSections {
  __typename: "SiteStudyExtendedGenericSection";
  template: string | null;
  hide: boolean;
  order: number | null;
  title: string;
  name: string;
}

export interface SiteFragment_siteView_study {
  __typename: "SiteStudyPage";
  allFields: string[];
  basicSections: SiteFragment_siteView_study_basicSections[];
  extendedSections: SiteFragment_siteView_study_extendedSections[];
}

export interface SiteFragment_siteView_search_autoSuggest_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteView_search_autoSuggest_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_autoSuggest_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_autoSuggest_aggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteView_search_autoSuggest_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  preselected: SiteFragment_siteView_search_autoSuggest_aggs_fields_preselected;
  visibleOptions: SiteFragment_siteView_search_autoSuggest_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
}

export interface SiteFragment_siteView_search_autoSuggest_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_autoSuggest_aggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteView_search_autoSuggest_aggs_fields[];
  selected: SiteFragment_siteView_search_autoSuggest_aggs_selected;
}

export interface SiteFragment_siteView_search_autoSuggest_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteView_search_autoSuggest_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_autoSuggest_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_autoSuggest_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteView_search_autoSuggest_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  preselected: SiteFragment_siteView_search_autoSuggest_crowdAggs_fields_preselected;
  visibleOptions: SiteFragment_siteView_search_autoSuggest_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
}

export interface SiteFragment_siteView_search_autoSuggest_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_autoSuggest_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteView_search_autoSuggest_crowdAggs_fields[];
  selected: SiteFragment_siteView_search_autoSuggest_crowdAggs_selected;
}

export interface SiteFragment_siteView_search_autoSuggest {
  __typename: "SiteAutoSuggestSection";
  aggs: SiteFragment_siteView_search_autoSuggest_aggs;
  crowdAggs: SiteFragment_siteView_search_autoSuggest_crowdAggs;
}

export interface SiteFragment_siteView_search_results_buttons_items {
  __typename: "ResultButtonItems";
  icon: string;
  target: string;
}

export interface SiteFragment_siteView_search_results_buttons {
  __typename: "ResultsButton";
  items: SiteFragment_siteView_search_results_buttons_items[];
  location: string;
}

export interface SiteFragment_siteView_search_results {
  __typename: "SiteResultsSection";
  type: string;
  buttons: SiteFragment_siteView_search_results_buttons;
}

export interface SiteFragment_siteView_search_crumbs {
  __typename: "CrumbResultSection";
  search: boolean;
}

export interface SiteFragment_siteView_search_presearch_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteView_search_presearch_aggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteFragment_siteView_search_presearch_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_presearch_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_presearch_aggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteView_search_presearch_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteFragment_siteView_search_presearch_aggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteFragment_siteView_search_presearch_aggs_fields_preselected;
  visibleOptions: SiteFragment_siteView_search_presearch_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteFragment_siteView_search_presearch_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_presearch_aggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteView_search_presearch_aggs_fields[];
  selected: SiteFragment_siteView_search_presearch_aggs_selected;
}

export interface SiteFragment_siteView_search_presearch_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteView_search_presearch_crowdAggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteFragment_siteView_search_presearch_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_presearch_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_presearch_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteView_search_presearch_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteFragment_siteView_search_presearch_crowdAggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteFragment_siteView_search_presearch_crowdAggs_fields_preselected;
  visibleOptions: SiteFragment_siteView_search_presearch_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteFragment_siteView_search_presearch_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_presearch_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteView_search_presearch_crowdAggs_fields[];
  selected: SiteFragment_siteView_search_presearch_crowdAggs_selected;
}

export interface SiteFragment_siteView_search_presearch_button {
  __typename: "PresearchButtonSection";
  name: string;
  target: string;
}

export interface SiteFragment_siteView_search_presearch {
  __typename: "SitePresearchPage";
  aggs: SiteFragment_siteView_search_presearch_aggs;
  crowdAggs: SiteFragment_siteView_search_presearch_crowdAggs;
  button: SiteFragment_siteView_search_presearch_button;
  instructions: string;
}

export interface SiteFragment_siteView_search_config_fields {
  __typename: "SiteConfigField";
  showPresearch: boolean;
  showFacetBar: boolean;
  showAutoSuggest: boolean;
  showBreadCrumbs: boolean;
  showResults: boolean;
}

export interface SiteFragment_siteView_search_config {
  __typename: "SiteConfigSection";
  fields: SiteFragment_siteView_search_config_fields;
}

export interface SiteFragment_siteView_search_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteView_search_aggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteFragment_siteView_search_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_aggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteView_search_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteFragment_siteView_search_aggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteFragment_siteView_search_aggs_fields_preselected;
  visibleOptions: SiteFragment_siteView_search_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteFragment_siteView_search_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_aggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteView_search_aggs_fields[];
  selected: SiteFragment_siteView_search_aggs_selected;
}

export interface SiteFragment_siteView_search_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteView_search_crowdAggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteFragment_siteView_search_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteView_search_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteFragment_siteView_search_crowdAggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteFragment_siteView_search_crowdAggs_fields_preselected;
  visibleOptions: SiteFragment_siteView_search_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteFragment_siteView_search_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteView_search_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteView_search_crowdAggs_fields[];
  selected: SiteFragment_siteView_search_crowdAggs_selected;
}

export interface SiteFragment_siteView_search {
  __typename: "SiteSearchPage";
  type: string;
  template: string;
  autoSuggest: SiteFragment_siteView_search_autoSuggest;
  results: SiteFragment_siteView_search_results;
  crumbs: SiteFragment_siteView_search_crumbs;
  presearch: SiteFragment_siteView_search_presearch;
  sortables: string[];
  fields: string[];
  config: SiteFragment_siteView_search_config;
  aggs: SiteFragment_siteView_search_aggs;
  crowdAggs: SiteFragment_siteView_search_crowdAggs;
}

export interface SiteFragment_siteView {
  __typename: "SiteView";
  name: string | null;
  url: string | null;
  id: number;
  default: boolean | null;
  description: string | null;
  study: SiteFragment_siteView_study;
  search: SiteFragment_siteView_search;
}

export interface SiteFragment_siteViews_study_basicSections {
  __typename: "SiteStudyBasicGenericSection";
  hide: boolean;
  title: string;
  name: string;
}

export interface SiteFragment_siteViews_study_extendedSections {
  __typename: "SiteStudyExtendedGenericSection";
  template: string | null;
  hide: boolean;
  order: number | null;
  title: string;
  name: string;
}

export interface SiteFragment_siteViews_study {
  __typename: "SiteStudyPage";
  allFields: string[];
  basicSections: SiteFragment_siteViews_study_basicSections[];
  extendedSections: SiteFragment_siteViews_study_extendedSections[];
}

export interface SiteFragment_siteViews_search_autoSuggest_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteViews_search_autoSuggest_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_autoSuggest_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_autoSuggest_aggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteViews_search_autoSuggest_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  preselected: SiteFragment_siteViews_search_autoSuggest_aggs_fields_preselected;
  visibleOptions: SiteFragment_siteViews_search_autoSuggest_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
}

export interface SiteFragment_siteViews_search_autoSuggest_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_autoSuggest_aggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteViews_search_autoSuggest_aggs_fields[];
  selected: SiteFragment_siteViews_search_autoSuggest_aggs_selected;
}

export interface SiteFragment_siteViews_search_autoSuggest_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteViews_search_autoSuggest_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_autoSuggest_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_autoSuggest_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteViews_search_autoSuggest_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  preselected: SiteFragment_siteViews_search_autoSuggest_crowdAggs_fields_preselected;
  visibleOptions: SiteFragment_siteViews_search_autoSuggest_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
}

export interface SiteFragment_siteViews_search_autoSuggest_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_autoSuggest_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteViews_search_autoSuggest_crowdAggs_fields[];
  selected: SiteFragment_siteViews_search_autoSuggest_crowdAggs_selected;
}

export interface SiteFragment_siteViews_search_autoSuggest {
  __typename: "SiteAutoSuggestSection";
  aggs: SiteFragment_siteViews_search_autoSuggest_aggs;
  crowdAggs: SiteFragment_siteViews_search_autoSuggest_crowdAggs;
}

export interface SiteFragment_siteViews_search_results_buttons_items {
  __typename: "ResultButtonItems";
  icon: string;
  target: string;
}

export interface SiteFragment_siteViews_search_results_buttons {
  __typename: "ResultsButton";
  items: SiteFragment_siteViews_search_results_buttons_items[];
  location: string;
}

export interface SiteFragment_siteViews_search_results {
  __typename: "SiteResultsSection";
  type: string;
  buttons: SiteFragment_siteViews_search_results_buttons;
}

export interface SiteFragment_siteViews_search_crumbs {
  __typename: "CrumbResultSection";
  search: boolean;
}

export interface SiteFragment_siteViews_search_presearch_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteViews_search_presearch_aggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteFragment_siteViews_search_presearch_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_presearch_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_presearch_aggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteViews_search_presearch_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteFragment_siteViews_search_presearch_aggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteFragment_siteViews_search_presearch_aggs_fields_preselected;
  visibleOptions: SiteFragment_siteViews_search_presearch_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteFragment_siteViews_search_presearch_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_presearch_aggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteViews_search_presearch_aggs_fields[];
  selected: SiteFragment_siteViews_search_presearch_aggs_selected;
}

export interface SiteFragment_siteViews_search_presearch_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteViews_search_presearch_crowdAggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteFragment_siteViews_search_presearch_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_presearch_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_presearch_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteViews_search_presearch_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteFragment_siteViews_search_presearch_crowdAggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteFragment_siteViews_search_presearch_crowdAggs_fields_preselected;
  visibleOptions: SiteFragment_siteViews_search_presearch_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteFragment_siteViews_search_presearch_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_presearch_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteViews_search_presearch_crowdAggs_fields[];
  selected: SiteFragment_siteViews_search_presearch_crowdAggs_selected;
}

export interface SiteFragment_siteViews_search_presearch_button {
  __typename: "PresearchButtonSection";
  name: string;
  target: string;
}

export interface SiteFragment_siteViews_search_presearch {
  __typename: "SitePresearchPage";
  aggs: SiteFragment_siteViews_search_presearch_aggs;
  crowdAggs: SiteFragment_siteViews_search_presearch_crowdAggs;
  button: SiteFragment_siteViews_search_presearch_button;
  instructions: string;
}

export interface SiteFragment_siteViews_search_config_fields {
  __typename: "SiteConfigField";
  showPresearch: boolean;
  showFacetBar: boolean;
  showAutoSuggest: boolean;
  showBreadCrumbs: boolean;
  showResults: boolean;
}

export interface SiteFragment_siteViews_search_config {
  __typename: "SiteConfigSection";
  fields: SiteFragment_siteViews_search_config_fields;
}

export interface SiteFragment_siteViews_search_aggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteViews_search_aggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteFragment_siteViews_search_aggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_aggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_aggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteViews_search_aggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteFragment_siteViews_search_aggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteFragment_siteViews_search_aggs_fields_preselected;
  visibleOptions: SiteFragment_siteViews_search_aggs_fields_visibleOptions;
  autoSuggest: boolean;
  rank: number | null;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteFragment_siteViews_search_aggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_aggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteViews_search_aggs_fields[];
  selected: SiteFragment_siteViews_search_aggs_selected;
}

export interface SiteFragment_siteViews_search_crowdAggs_fields_order {
  __typename: "SiteOrder";
  sortKind: SortKind;
  desc: boolean;
}

export interface SiteFragment_siteViews_search_crowdAggs_fields_bucketKeyValuePairs {
  __typename: "BucketKeyValuePairs";
  key: string | null;
  label: string | null;
}

export interface SiteFragment_siteViews_search_crowdAggs_fields_preselected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_crowdAggs_fields_visibleOptions {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_crowdAggs_fields {
  __typename: "SiteAggField";
  order: SiteFragment_siteViews_search_crowdAggs_fields_order | null;
  name: string;
  display: FieldDisplay;
  displayName: string;
  aggSublabel: string | null;
  defaultToOpen: boolean | null;
  layout: string | null;
  maxCrumbs: number | null;
  bucketKeyValuePairs: SiteFragment_siteViews_search_crowdAggs_fields_bucketKeyValuePairs[] | null;
  preselected: SiteFragment_siteViews_search_crowdAggs_fields_preselected;
  visibleOptions: SiteFragment_siteViews_search_crowdAggs_fields_visibleOptions;
  rank: number | null;
  autoSuggest: boolean;
  rangeStartLabel: string | null;
  rangeEndLabel: string | null;
  showFilterToolbar: boolean | null;
  showAllowMissing: boolean | null;
}

export interface SiteFragment_siteViews_search_crowdAggs_selected {
  __typename: "SiteSelect";
  kind: FilterKind;
  values: string[];
}

export interface SiteFragment_siteViews_search_crowdAggs {
  __typename: "SiteAggSection";
  fields: SiteFragment_siteViews_search_crowdAggs_fields[];
  selected: SiteFragment_siteViews_search_crowdAggs_selected;
}

export interface SiteFragment_siteViews_search {
  __typename: "SiteSearchPage";
  type: string;
  template: string;
  autoSuggest: SiteFragment_siteViews_search_autoSuggest;
  results: SiteFragment_siteViews_search_results;
  crumbs: SiteFragment_siteViews_search_crumbs;
  presearch: SiteFragment_siteViews_search_presearch;
  sortables: string[];
  fields: string[];
  config: SiteFragment_siteViews_search_config;
  aggs: SiteFragment_siteViews_search_aggs;
  crowdAggs: SiteFragment_siteViews_search_crowdAggs;
}

export interface SiteFragment_siteViews {
  __typename: "SiteView";
  name: string | null;
  url: string | null;
  id: number;
  default: boolean | null;
  description: string | null;
  study: SiteFragment_siteViews_study;
  search: SiteFragment_siteViews_search;
}

export interface SiteFragment {
  __typename: "Site";
  id: number;
  editors: SiteFragment_editors[];
  name: string;
  skipLanding: boolean | null;
  hideDonation: boolean | null;
  subdomain: string;
  themes: string;
  reactionsConfig: string;
  userRank: string;
  owners: SiteFragment_owners[];
  siteView: SiteFragment_siteView;
  siteViews: SiteFragment_siteViews[];
}
