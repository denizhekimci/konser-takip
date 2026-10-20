const BASE_URL = import.meta.env.VITE_API_BASE_URL

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type QueryParams = Record<string, string | number | undefined>

export async function apiGet<T>(
  path: string,
  params?: QueryParams,
): Promise<T> {
  const url = new URL(BASE_URL + path, window.location.origin)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value))
    }
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<T>
}
