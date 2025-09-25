const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-api-key',
});

async function callLLM(prompt, temperature = 0.3) {
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature,
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.warn('OpenAI API failed, using mock response');
      return mockResponse(prompt);
    }
  } else {
    return mockResponse(prompt);
  }
}

function mockResponse(prompt) {
  if (prompt.includes('Extract skills')) {
    return JSON.stringify({
      skills: ['backend', 'cloud', 'AI'],
      experiences: ['3 years backend development', '2 years cloud'],
      projects: ['Built REST API', 'Deployed on AWS']
    });
  } else if (prompt.includes('Compare CV')) {
    return JSON.stringify({
      matchRate: 0.82,
      feedback: 'Strong in backend and cloud, limited AI integration experience.'
    });
  } else if (prompt.includes('Score project')) {
    return JSON.stringify({
      score: 7.5,
      feedback: 'Meets prompt chaining requirements, lacks error handling robustness.'
    });
  }
  return 'Mock response';
}

async function extractFromCV(cvContent) {
  const prompt = `Extract structured info from CV: skills, experiences, projects. CV: ${cvContent}`;
  const response = await callLLM(prompt);
  return JSON.parse(response);
}

async function compareCV(cvData, jobContext) {
  const prompt = `Compare CV data with job requirements. Job: ${jobContext}. CV: ${JSON.stringify(cvData)}`;
  const response = await callLLM(prompt);
  return JSON.parse(response);
}

async function scoreProject(projectContent, rubric) {
  const prompt = `Score project report based on rubric. Rubric: ${rubric}. Project: ${projectContent}`;
  const response = await callLLM(prompt);
  return JSON.parse(response);
}

module.exports = { extractFromCV, compareCV, scoreProject };
