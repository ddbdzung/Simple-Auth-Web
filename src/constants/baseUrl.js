// export const BASE_PROD = ''
let base_domain
if (import.meta.env.MODE === 'development') {
  base_domain = 'http://localhost:2703'
} else if (import.meta.env.MODE === 'production') {
  base_domain = import.meta.env.VITE_DOMAIN
}

export const BASE_DOMAIN = base_domain
// RESTAPI
export const API_ENTRY = '/api/v1'
