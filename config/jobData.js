const jobDescription = `
Job Title: Backend Developer with AI Integration
Requirements:
- Technical Skills: Backend development (Node.js, Python), databases (SQL, NoSQL), APIs, cloud (AWS, GCP), AI/LLM exposure.
- Experience Level: 2-5 years, project complexity in scalable systems.
- Relevant Achievements: Impact on performance, scale.
- Cultural Fit: Communication, learning attitude.
`;

const scoringRubric = `
Project Evaluation Parameters:
- Correctness (1-5): Meets requirements: prompt design, chaining, RAG, handling errors.
- Code Quality (1-5): Clean, modular, testable.
- Resilience (1-5): Handles failures, retries.
- Documentation (1-5): Clear README, explanation of trade-offs.
- Creativity (1-5): Optional improvements like authentication, deployment, dashboards.
Aggregate to final score out of 10.
`;

module.exports = { jobDescription, scoringRubric };
