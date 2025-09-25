const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function parseFileContent(file) {
  const buffer = file.buffer;
  const mimeType = file.mimetype;

  if (mimeType === 'text/plain') {
    return buffer.toString('utf-8');
  } else if (mimeType === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    throw new Error('Unsupported file type');
  }
}

module.exports = { parseFileContent };
