const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = 'AshaenM';
const REPO_NAME = 'talenthaven-data';
const BRANCH = 'main';

const BASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;

export async function readData(file) {
  const response = await fetch(`${BASE_URL}/${file}.json`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  const data = await response.json();
  const content = JSON.parse(atob(data.content));
  return { content, sha: data.sha };
}

export async function writeData(file, content, sha) {
  const response = await fetch(`${BASE_URL}/${file}.json`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Update ${file}.json`,
      content: btoa(JSON.stringify(content, null, 2)),
      sha: sha,
      branch: BRANCH
    })
  });
  return response.json();
}