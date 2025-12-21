/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ExternalLink,
  X,
  Globe,
  AlertCircle,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import remarkBreaks from "remark-breaks";

interface Project {
  _id: string;
  name: string;
  mainDomain: string;
  images: string[];
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApiResponse {
  success: boolean;
  data: Project[];
  pagination: PaginationData;
}

export default function AllProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null)
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null)
  const limit = 9

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        isDeleted: 'false'
      })

      const response = await fetch(`/api/v2/project/action?${params}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: ApiResponse = await response.json()
      
      if (data.success) {
        setProjects(data.data)
        setTotalPages(data.pagination.totalPages)
      } else {
        throw new Error('Failed to fetch projects')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm, limit])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (page !== 1) setPage(1)
      else fetchProjects()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // Auto-scroll hover effect
  const startAutoScroll = (projectId: string) => {
    setHoveredImageId(projectId)
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const project = projects.find(p => p._id === projectId)
        if (!project || project.images.length <= 1) return 0
        return (prev + 1) % project.images.length
      })
    }, 2000) // Change image every 2 seconds

    setAutoScrollInterval(interval)
  }

  const stopAutoScroll = () => {
    setHoveredImageId(null)
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval)
      setAutoScrollInterval(null)
    }
    setCurrentImageIndex(0)
  }

  // Handle next/previous image
  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(prev => 
        (prev + 1) % selectedProject.images.length
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      )
    }
  }

  // Open dialog with project details
  const openProjectDialog = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsDialogOpen(true)
  }

  // Pagination controls
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  // Reset to first page when unmounting
  useEffect(() => {
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
      }
    }
  }, [])

  // Loading skeleton
  if (loading && projects.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-96 mt-4 md:mt-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 pt-20 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Our Projects
          </h1>
          <p className="text-muted-foreground mt-2">
            Showcasing our digital solutions and implementations
          </p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-80"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading projects: {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <Card
                key={project._id}
                className="overflow-hidden py-0 hover:shadow-lg transition-shadow cursor-pointer group"
                
                onMouseEnter={() => startAutoScroll(project._id)}
                onMouseLeave={stopAutoScroll}
              >
                {/* Image Carousel Container */}
                <div onClick={() => openProjectDialog(project)} className="relative h-64 overflow-hidden bg-gray-100">
                  {project.images && project.images.length > 0 ? (
                    <div className="relative h-full">
                      {/* Main Image */}
                      <img
                        src={project.images[currentImageIndex]}
                        alt={project.name}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          hoveredImageId === project._id ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                        }`}
                      />
                      
                      {/* Image Counter */}
                      {project.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {currentImageIndex + 1} / {project.images.length}
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-medium">Click to view details</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <Globe className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg truncate">{project.name}</h3>
                      <a
  href={
    project.mainDomain.startsWith("http")
      ? project.mainDomain
      : `https://${project.mainDomain}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 mt-1"
>
  <Globe className="h-3 w-3 text-muted-foreground" />
  <p className="text-sm text-muted-foreground truncate">
    {project.mainDomain.trim()}
  </p>
</a>

                    </div>
                   
                      <a
  href={
    project.mainDomain.startsWith("http")
      ? project.mainDomain
      : `https://${project.mainDomain}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 mt-1"
>
    <ExternalLink className="h-4 w-4 text-muted-foreground" />
</a>


                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1 || loading}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (page <= 3) {
                  pageNum = i + 1
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = page - 2 + i
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    disabled={loading}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages || loading}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-muted-foreground ml-4">
                Page {page} of {totalPages}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? `No results for "${searchTerm}"` : 'No projects available at the moment'}
          </p>
          {searchTerm && (
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className="mt-4"
            >
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Project Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl">
                      {selectedProject.name}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <Globe className="h-3 w-3" />
                      {selectedProject.mainDomain.trim()}
                    </DialogDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              {/* Image Carousel in Dialog */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative rounded-lg overflow-hidden bg-gray-100 h-80">
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {selectedProject.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {selectedProject.images.map((_, idx) => (
                          <button
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentImageIndex(idx)}
                          />
                        ))}
                      </div>
                      
                      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {currentImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Project Description as Markdown */}
              <div className="prose prose-slate max-w-none dark:prose-invert">
               <div className="border rounded-lg p-6 whitespace-pre-line bg-white dark:bg-gray-900">
  <ReactMarkdown
    remarkPlugins={[remarkBreaks]}
    components={{
      h1: ({ ...props }) => (
        <h1 className="text-2xl font-bold mt-4 mb-3 text-primary" {...props} />
      ),
      h2: ({ ...props }) => (
        <h2 className="text-xl font-bold mt-4 mb-2 text-primary" {...props} />
      ),
      h3: ({ ...props }) => (
        <h3 className="text-lg font-bold mt-3 mb-2" {...props} />
      ),
      p: ({ ...props }) => (
        <p className="mb-3 leading-relaxed whitespace-pre-line" {...props} />
      ),
      ul: ({ ...props }) => (
        <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />
      ),
      ol: ({ ...props }) => (
        <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />
      ),
      li: ({ ...props }) => <li className="pl-1" {...props} />,
      strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
      em: ({ ...props }) => <em className="italic" {...props} />,
      a: ({ ...props }) => (
        <a className="text-blue-600 hover:underline" {...props} />
      ),
      hr: ({ ...props }) => (
        <hr className="my-4 border-gray-300 dark:border-gray-700" {...props} />
      ),
    }}
  >
    {selectedProject.description}
  </ReactMarkdown>
</div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {selectedProject.images?.length || 0} Images
                  </Badge>
                  {selectedProject.createdAt && (
                    <Badge variant="outline">
                      Created: {new Date(selectedProject.createdAt).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.open(`https://${selectedProject.mainDomain.trim()}`, '_blank')
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}