const jobData = require('../config/jobData');

async function retrieveContext(type) {
  if (type === 'cv_scoring') {
    return jobData.jobDescription;
  } else if (type === 'project_scoring') {
    return jobData.scoringRubric;
  }
  return '';
}

module.exports = { retrieveContext };
