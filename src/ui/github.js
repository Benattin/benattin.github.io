import { content } from '../content/data.js';

// Repositórios públicos do GitHub, buscados no navegador a cada visita.
// A API sem login permite 60 pedidos/hora por IP, por isso o resultado fica 1h em cache.
const USER = 'Benattin';
const API = `https://api.github.com/users/${USER}/repos?per_page=100&sort=created`;
const CACHE_KEY = 'gh-repos';
const CACHE_MS = 60 * 60 * 1000;
const HIDDEN = new Set([USER.toLowerCase(), `${USER.toLowerCase()}.github.io`]);

export const github = { status: 'loading', repos: [] };

export async function loadRepos() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    const data = cached && Date.now() - cached.at < CACHE_MS ? cached.data : await fetchRepos();
    github.repos = pick(data);
    github.status = 'ok';
  } catch {
    github.status = 'error';
  }
}

async function fetchRepos() {
  const res = await fetch(API, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const data = (await res.json()).map((r) => ({
    name: r.name,
    description: r.description,
    url: r.html_url,
    homepage: r.homepage,
    language: r.language,
    created: r.created_at,
    fork: r.fork,
    archived: r.archived,
  }));
  localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  return data;
}

// Esconde forks, arquivados, o repo do perfil/site e os que já têm card próprio em projectList
function pick(data) {
  const known = new Set(content.pt.projectList.map((p) => p.repo?.toLowerCase()).filter(Boolean));
  return data.filter((r) => !r.fork && !r.archived && !HIDDEN.has(r.name.toLowerCase()) && !known.has(r.url.toLowerCase()));
}
