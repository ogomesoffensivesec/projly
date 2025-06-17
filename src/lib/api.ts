import { Project } from '@/types'

export async function getProjectBySlug(slug: string): Promise<Project> {
  const response = await fetch(`/api/projects/${slug}`)
  if (!response.ok) {
    throw new Error('Falha ao buscar projeto')
  }
  return response.json()
} 