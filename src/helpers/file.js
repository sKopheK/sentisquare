// Processing a text file line by line
// @author https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export async function* getFileLine(fileURL) {
  const utf8Decoder = new TextDecoder('utf-8');
  const response = await fetch(fileURL);
  const reader = response.body.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk) : '';

  const re = /\r\n|\n|\r/gm;
  let startIndex = 0;

  while (true) {
    let result = re.exec(chunk);
    if (!result) {
      if (readerDone) break;
      let remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : '');
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }

  if (startIndex < chunk.length) {
    // Last line didn't end in a newline char
    yield chunk.substr(startIndex);
  }
}

export default async function getFileContents(url) {
  const lines = [];
  for await (const line of readFile(url)) {
    lines.push(line.trim());
  }
  return lines;
}
