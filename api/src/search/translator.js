import logger from '../util/logger';
const esb = require('elastic-builder');
const zg = require('zip2geo');
const util = require('util');

const ENABLED_AGGS = [
    'average_rating', 'overall_status', 'facility_states', 'conditions',
    'facility_cities', 'facility_names', 'facility_countries', 'study_type', 'sponsors',
    'browse_condition_mesh_terms', 'phase', 'rating_dimensions',
    'browse_interventions_mesh_terms', 'interventions_mesh_terms',
    'front_matter_keys', 'start_date', 'wiki_page_edits.email', 'wiki_page_edits.created_at',
    'reactions.kind', 'indexed_at', 'last_update_posted_date',
    'last_changed_date',  'number_of_arms', 'study_views_count',
    'number_of_groups', 'why_stopped', 'results_first_submitted_date',
    'plan_to_share_ipd', 'design_outcome_measures',
    'location'
  ];


export const translateSearch = async (criteria,includeSize,lastDate) => {

    let boolQuery = esb.boolQuery();
    boolQuery.must(esb.simpleQueryStringQuery('*'));
    await translateAggFilters(criteria.aggFilters,boolQuery,false);
    await translateAggFilters(criteria.crowdAggFilters,boolQuery,true);

    if(criteria.q.key === 'AND' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.must(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }
    if(criteria.q.key === 'OR' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.should(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }

    if(lastDate) {
        const dateString = (lastDate.getMonth()+1)+'/'+lastDate.getDate()+'/'+lastDate.getFullYear();
        logger.debug('indexed_at dateString: '+dateString);
        boolQuery.must(esb.simpleQueryStringQuery('indexed_at:{'+dateString+' TO *}'));
    }

    // Create the aggs and crowd aggs
    let requestBody;
    if(includeSize) {
        requestBody = esb.requestBodySearch().query( boolQuery ).from(0).size(criteria.pageSize);
    }
    else {
        requestBody = esb.requestBodySearch().query( boolQuery ).size(0);
    }
    
    let json = requestBody.toJSON();
    injectAggs(criteria,json);


    console.log(  util.inspect(criteria,true, null, false));
    
    let resultSort = {};
   if(criteria.sorts.length !==0 ){

       resultSort[`${criteria.sorts[0].id}`] = criteria.sorts[0].desc ? "desc" : "asc";
       json.sort = [resultSort];
   }

    return json;
}


export const translateAggBuckets = async (criteria) => {

    let boolQuery = esb.boolQuery();
    boolQuery.must(esb.simpleQueryStringQuery('*'));
    await translateAggFilters(criteria.aggFilters,boolQuery,false);
    await translateAggFilters(criteria.crowdAggFilters,boolQuery,true);

    if(criteria.q.key === 'AND' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.must(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }
    if(criteria.q.key === 'OR' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.should(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }

    // Create the aggs and crowd aggs
    let requestBody = esb.requestBodySearch().query( boolQuery ).from(0).size(100);
    
    const json = requestBody.toJSON();
    injectCrowdAggBuckets(criteria,json);


    return json;
}

export const translateCrowdAggBuckets = async (criteria) => {

    let boolQuery = esb.boolQuery();
    boolQuery.must(esb.simpleQueryStringQuery('*'));
    await translateAggFilters(criteria.aggFilters,boolQuery,false);
    await translateAggFilters(criteria.crowdAggFilters,boolQuery,true);

    if(criteria.q.key === 'AND' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.must(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }
    if(criteria.q.key === 'OR' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.should(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }

    // Create the aggs and crowd aggs
    let requestBody = esb.requestBodySearch().query( boolQuery ).from(0).size(100);
    
    const json = requestBody.toJSON();
    injectCrowdAggBuckets(criteria,json,true);


    return json;
}

export const translateOpenCrowdAggBuckets = async (criteria, bucketsWanted) => {

    let boolQuery = esb.boolQuery();
    boolQuery.must(esb.simpleQueryStringQuery('*'));
    await translateAggFilters(criteria.aggFilters,boolQuery,false);
    await translateAggFilters(criteria.crowdAggFilters,boolQuery,true);

    if(criteria.q.key === 'AND' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.must(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }
    if(criteria.q.key === 'OR' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.should(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }

    // Create the aggs and crowd aggs
    let requestBody = esb.requestBodySearch().query( boolQuery ).from(0).size(100);
    
    const json = requestBody.toJSON();

    let result = injectOpenCrowdAggBuckets(criteria,json,true, bucketsWanted);

    return result;
}

export const translateOpenAggBuckets = async (criteria, bucketsWanted) => {

    let boolQuery = esb.boolQuery();
    boolQuery.must(esb.simpleQueryStringQuery('*'));
    await translateAggFilters(criteria.aggFilters,boolQuery,false);
    await translateAggFilters(criteria.crowdAggFilters,boolQuery,true);

    if(criteria.q.key === 'AND' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.must(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }
    if(criteria.q.key === 'OR' && criteria.q.children) {
        criteria.q.children.forEach( child => {
            boolQuery.should(esb.simpleQueryStringQuery('('+child.key+')') );
        })
    }

    // Create the aggs and crowd aggs
    let requestBody = esb.requestBodySearch().query( boolQuery ).from(0).size(100);
    const json = requestBody.toJSON();
    injectOpenAggBuckets(criteria,json,true, bucketsWanted);


    return json;
}


const translateAggFilters = async (aggFilters,boolQuery,isCrowdAgg) => {
    if(aggFilters) {
        for(let i=0;i<aggFilters.length;i++) {
            let agg = aggFilters[i];
            let tf = await translateFilterTerm(agg,isCrowdAgg);
            await boolQuery.must(tf);
        }
    }
};

const translateFilterTerm = async (agg,isCrowdAgg) => {
    if(agg.gte || agg.lte || agg.gt || agg.lt) {        
        // This is a range term
        return await translateRangeTerm(agg,isCrowdAgg);
    }
    if(agg.lat || agg.long || agg.radius || agg.zipcode) {
        console.log('AGG EXISTS', agg)
        return await translateGeoLoc(agg,isCrowdAgg);
    }
    return translateValueTerms(agg,isCrowdAgg);
};

const translateRangeTerm = async (agg,isCrowdAgg) => {
    let query = await esb.rangeQuery(getFieldName(agg,isCrowdAgg));
    if(agg.lte) {
        query = await query.lte(agg.lte);
    }
    if(agg.gte) {
        query = await query.gte(agg.gte);
    }
    return query;
};

const translateValueTerms = (agg,isCrowdAgg) => {
    let list = [];
    agg.values.forEach( val => {
        let valQuery = esb.termQuery(getFieldName(agg,isCrowdAgg),val);
        
        list.push(valQuery); 
    });
    let bq = esb.boolQuery().should(list);
    return bq;
}

const translateGeoLoc = async (agg,isCrowdAgg) => {    
    let latitude = agg.lat;
    let longitude = agg.long;
    let field = agg.field;
    console.log('in TRANSLATE GEO', agg)
    if(agg.zipcode) {
        const loc = await zg.zip2geo(agg.zipcode);
        console.log('ZIP CODE TO LAT', loc)
        latitude = loc.latitude;
        longitude = loc.longitude;
        field = isCrowdAgg ? 'fm_locations' : 'locations'; // This is a hack because of bad data that had 'location' as the field.
    }
    let query = await esb.geoDistanceQuery()
        .field(field)
        .distance(agg.radius+'mi')
        .geoPoint(esb.geoPoint().lat(latitude).lon(longitude));
    return query;
}

const getFieldName = (agg,isCrowdAgg) => {
    return isCrowdAgg ? 'fm_'+agg.field : agg.field;
}


function injectAggs(criteria,json) {
console.log('agg injecting')
    let aggList = [];
    criteria.aggFilters.map( af => {
        let t = {};
        if(af.field == 'location'){
            return
        }
        if(af.gte || af.lte){
            return
        }
        t[af.field] = {value: af.values[0]};

        aggList.push({
            bool: {
                filter: [
                    {
                        bool: {
                            should: [
                                {
                                    bool: {
                                        filter: [
                                            {
                                                term: t
                                            }
                                        ]
                                    }
                                }                                
                            ]
                        }
                    }
                ]
            }
        });
    });

    let crowdAggList = [];
     console.log('CROWD AGG FILTERS', criteria.crowdAggFilters)
    criteria.crowdAggFilters.map( af => {
        if(af.gte || af.lte){
            return
        }
        crowdAggList.push({
            bool: {
                filter: [
                    {
                        bool: {
                            should: [
                                {
                                    bool: {
                                        filter: [
                                            {
                                                term: {
                                                    fm_tags: {
                                                        value: af.values[0]
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }                                
                            ]
                        }
                    }
                ]
            }
        });
    });

    let aggs = {};
    ENABLED_AGGS.forEach( enabledAgg => {

        let bucketAgg = {};
        bucketAgg[enabledAgg] = {
            "terms":{
               "field":enabledAgg,
               "size":10
            }
         };

        aggs[enabledAgg] = {
            filter: {
                bool: {
                    must: [
                        {
                            bool: {
                                must: aggList
                            }
                        },
                        {
                            bool: {
                                must: crowdAggList
                            }
                        }
                    ]
                }
            },
            aggs: bucketAgg
        }
    });
    json.aggs = aggs;       
}


function injectCrowdAggBuckets(criteria,json,usePrefix) {
    console.log('CROWD AGGING')
    let aggs = {};
    const aggKey = usePrefix ? 'fm_'+criteria.agg : criteria.agg;

    let innerAggs = {};
    innerAggs[aggKey] = {
        terms: {
            field: aggKey,
            size: 1000000,
            missing: '-99999999999'
        },
        aggs:  {
            agg_bucket_sort:{
                bucket_sort:{
                   from:0,
                   size:25,
                   sort:[
                      {
                         _key:{
                            order:"asc"
                         }
                      }
                   ]
                }
             }            
        }
    }

    aggs[aggKey] = {
        filter:{
            bool:{
               must:[
                  {
                     bool:{
                        must:[]
                     }
                  }
               ]
            }
         },
        aggs: innerAggs
    }
    
    json.aggs = aggs;       
}
function injectOpenCrowdAggBuckets(criteria,json,usePrefix, bucketsWanted) {
    console.log('BUCKETS WANTED', bucketsWanted)
    let aggs = {};
    const aggListSize = 25;
    const aggKeys = criteria.agg;
    let innerAggs = {};

    aggKeys.map((aggKey, index) => {
        let sort = [];
        let sortOrder = criteria.aggOptionsSort[index] && criteria.aggOptionsSort[index].desc ? "desc" : "asc"
        let countSort = {
            _count: {
                order: sortOrder
            }
        }
        let alphaSort = {
            _key: {
                order: sortOrder
            }
        }
        let includedValues = bucketsWanted[index].values.join('|');
        let filterBuckets = criteria.aggOptionsFilter || "";
        let elasticFilterValues = "";
        if (filterBuckets !== "") {
            let newArray = [];
            var s = filterBuckets;
            for (var i = 0; i < s.length; i++) {
                newArray.push(s.charAt(i));
            }
            newArray.map((char) => {
                console.log("Current Character", char)
                elasticFilterValues = (elasticFilterValues + `[${char.toUpperCase()}${char.toLowerCase()}]`)
            });
        }

        bucketsWanted[index].values.length !== 0 ?

            (innerAggs[`fm_${aggKey}`] = {
                terms: {
                    field: `fm_${aggKey}`,
                    size: 1000000,
                    missing: '-99999999999',
                    include: elasticFilterValues ?  `(${includedValues})\u0026(.*${elasticFilterValues}.*)` : includedValues

                },
                aggs: {
                    agg_bucket_sort: {
                        bucket_sort: {
                            from:criteria.page * aggListSize -  25,
                            size:aggListSize,
                            sort: [
                                criteria.aggOptionsSort[index].id == "count" ? countSort : alphaSort
                            ]
                        }
                    }
                }
            })
            : (innerAggs[`fm_${aggKey}`] = {
                terms: {
                    field: `fm_${aggKey}`,
                    size: 1000000,
                    missing: '-99999999999',
                    include: elasticFilterValues !== "" ? `(.*${elasticFilterValues}.*)` : `.*`
                },
                aggs: {
                    agg_bucket_sort: {
                        bucket_sort: {
                            from:criteria.page * aggListSize -  25,
                            size:aggListSize,
                            sort: [
                                criteria.aggOptionsSort[index].id == "count" ? countSort : alphaSort
                            ]
                        }
                    }
                }
            })

    })

aggKeys.map(aggKey=>{
    aggs[`fm_${aggKey}`] = {
        filter:{
            bool:{
               must:[
                  {
                     bool:{
                        must:[]
                     }
                  }
               ]
            }
         },
        aggs: innerAggs
    }

})
    json.aggs = innerAggs;  
    return json     
}

function injectOpenAggBuckets(criteria,json,usePrefix, bucketsWanted) {
    let aggs = {};
    const aggListSize = 25;
    const aggKeys = criteria.agg;
    let innerAggs = {};

    aggKeys.map((aggKey, index) => {
        let sort = [];
        let sortOrder = criteria.aggOptionsSort[index] && criteria.aggOptionsSort[index].desc ? "desc" : "asc"
        let countSort = {
            _count: {
                order: sortOrder
            }
        }
        let alphaSort = {
            _key: {
                order: sortOrder
            }
        }
        let includedValues = bucketsWanted[index].values.join('|');
        let filterBuckets = criteria.aggOptionsFilter || "";
        let elasticFilterValues = "";
        if (filterBuckets !== "") {
            let newArray = [];
            var s = filterBuckets;
            for (var i = 0; i < s.length; i++) {
                newArray.push(s.charAt(i));
            }
            newArray.map((char) => {
                console.log("Current Character", char)
                elasticFilterValues = (elasticFilterValues + `[${char.toUpperCase()}${char.toLowerCase()}]`)
            });
        }
        bucketsWanted[index].values.length !== 0 ?
            (innerAggs[aggKey] = {
                terms: {
                    field: aggKey,
                    size: 1000000,
                    missing: '-99999999999',
                    include: elasticFilterValues ?  `(${includedValues})\u0026(.*${elasticFilterValues}.*)` : includedValues                },
                aggs: {
                    agg_bucket_sort: {
                        bucket_sort: {
                            from:criteria.page *  aggListSize - 25,
                            size: aggListSize,
                            sort: [
                                criteria.aggOptionsSort[index].id == "count" ? countSort : alphaSort
                            ]
                        }
                    }
                }
            })
            : (innerAggs[aggKey] = {
                terms: {
                    field: aggKey,
                    size: 1000000,
                    missing: '-99999999999',
                },
                aggs: {
                    agg_bucket_sort: {
                        bucket_sort: {
                            from:criteria.page *  aggListSize - 25,
                            size: aggListSize,
                            sort: [
                                criteria.aggOptionsSort[index].id == "count" ? countSort : alphaSort
                            ]
                        }
                    }
                }
            })

    })

aggKeys.map(aggKey=>{
    aggs[aggKey] = {
        filter:{
            bool:{
               must:[
                  {
                     bool:{
                        must:[]
                     }
                  }
               ]
            }
         },
        aggs: innerAggs
    }

})
    
    json.aggs = innerAggs;
    return json;       
}
