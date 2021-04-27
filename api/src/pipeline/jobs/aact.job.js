import logger from '../../util/logger';
import {queryAACT} from '../../util/db';
import {bulkUpdate} from '../../search/elastic';
const util = require('util')

const STUDIES_TO_INDEX_QUERY = "select nct_id from studies where updated_at > localtimestamp - INTERVAL '1 day'";
const CHUNK_SIZE = 1000;

let IS_RUNNING = false;

const aactJob = async () => {
    try {
        if(!IS_RUNNING) {
            IS_RUNNING = true;
            logger.info('Starting AACT Job');

            const studyIds = await getStudiesToIndex();
            //const studyIds = ['NCT00001431'];
            logger.debug("Number of studies to index: "+studyIds.length);
            const bulkList = chunkList(studyIds,CHUNK_SIZE);

            for(let j=0;j<bulkList.length;j++) {
                const idList = bulkList[j];                
                const results = await getBulkStudies(idList);
                
                let studies = [];
                for(let i=0;i<results.rowCount;i++) {
                    const study = results.rows[i];
                    studies.push(study);
                }
                logger.info("Sending bulk update of "+idList.length);
                await bulkUpsert(studies);
                logger.info("Bulk update complete.");
            }

            logger.info('Job AACT Finished.')
            IS_RUNNING = false;
        }
    }
    catch(err) {
        logger.error(err);
        IS_RUNNING = false;
    }
};

const getStudiesToIndex = async () => {
    const rs = await queryAACT(STUDIES_TO_INDEX_QUERY,[]);
    return rs.rows.map( row => row.nct_id);
};

const getBulkStudies = async (idList) => {
    let params = idList.map( (id,index) => '$'+(index+1));
    const query = 'select * from studies where nct_id in ('+params.join(',')+')';
    const rs = await queryAACT(query,idList);
    return rs;
}

const chunkList = (list, size) => {
    let result = []
    for (let i = 0; i < list.length; i += size) {
        let chunk = list.slice(i, i + size)
        result.push(chunk)
    }
    return result;    
};

export default aactJob;