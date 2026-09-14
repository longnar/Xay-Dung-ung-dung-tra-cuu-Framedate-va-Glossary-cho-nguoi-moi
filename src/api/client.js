const tokenKey = 'idol-showdown-token'

export async function apiRequest(url, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = window.localStorage.getItem(tokenKey)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (!(options.body instanceof FormData) && options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(url, { ...options, headers })
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      window.localStorage.removeItem(tokenKey)
      window.dispatchEvent(new CustomEvent('auth-expired'))
    }
    throw new Error(payload?.message || 'Yêu cầu tới máy chủ thất bại.')
  }

  return payload
}

export const api = {
  getCharacters: () => apiRequest('/api/characters'),
  getCharacter: (id) => apiRequest(`/api/characters/${id}`),
  getGlossaries: () => apiRequest('/api/glossaries'),
  createCharacter: (body) => apiRequest('/api/admin/characters', { method: 'POST', body }),
  updateCharacter: (id, body) => apiRequest(`/api/admin/characters/${id}`, { method: 'PUT', body }),
  deleteCharacter: (id) => apiRequest(`/api/admin/characters/${id}`, { method: 'DELETE' }),
  createGlossary: (body) => apiRequest('/api/admin/glossaries', { method: 'POST', body }),
  updateGlossary: (id, body) => apiRequest(`/api/admin/glossaries/${id}`, { method: 'PUT', body }),
  deleteGlossary: (id) => apiRequest(`/api/admin/glossaries/${id}`, { method: 'DELETE' }),
}
