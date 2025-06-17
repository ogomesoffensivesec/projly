export interface Project {
  id: string
  name: string
  slug: string
  description: string
  status: 'active' | 'completed' | 'archived'
  createdAt: string
  updatedAt: string
} 