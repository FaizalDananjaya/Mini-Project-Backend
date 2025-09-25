const { extractFromCV, compareCV, scoreProject } = require('./llmService');
const { retrieveContext } = require('./vectorDB');

async function startEvaluation(taskId) {
  let task = global.tasks.get(taskId);
  task.status = 'processing';
  global.tasks.set(taskId, task);

  try {
    let upload = global.uploads.get(task.uploadId);
    let cvText = upload.cv;
    let projectText = upload.project;

    console.log(`Starting evaluation for task ${taskId}`);

    let cvInfo = await extractFromCV(cvText);

    let jobDetails = await retrieveContext('cv_scoring');

    let cvComparison = await compareCV(cvInfo, jobDetails);

    let projectCriteria = await retrieveContext('project_scoring');

    let projectEval = await scoreProject(projectText, projectCriteria);

    let finalResult = {
      cv_match_rate: cvComparison.matchRate,
      cv_feedback: cvComparison.feedback,
      project_score: projectEval.score,
      project_feedback: projectEval.feedback,
      overall_summary: `Overall, this candidate has a ${cvComparison.matchRate * 100}% match on skills and experience, with a project score of ${projectEval.score}/10. Solid fit but could use more AI experience.`
    };

    task.status = 'completed';
    task.result = finalResult;
    global.tasks.set(taskId, task);

    console.log(`Evaluation complete for ${taskId}`);
  } catch (err) {
    task.status = 'failed';
    task.error = err.message;
    global.tasks.set(taskId, task);
    console.error(`Error in evaluation ${taskId}:`, err);
  }
}

module.exports = { startEvaluation };
