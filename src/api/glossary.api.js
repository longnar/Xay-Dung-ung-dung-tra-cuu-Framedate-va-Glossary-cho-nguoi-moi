import { apiRequest } from './client'

export const glossaryApi = {
  list: () => apiRequest('/api/glossaries'),
  create: (body) => apiRequest('/api/admin/glossaries', { method: 'POST', body }),
  update: (id, body) => apiRequest(`/api/admin/glossaries/${id}`, { method: 'PUT', body }),
  remove: (id) => apiRequest(`/api/admin/glossaries/${id}`, { method: 'DELETE' }),
}
