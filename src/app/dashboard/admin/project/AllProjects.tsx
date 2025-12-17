"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  Globe,
  Github,
  Phone,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Plus,
  RefreshCw,
} from "lucide-react";

// Shadcn UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Project {
  _id: string;
  name: string;
  mainDomain: string;
  domains: string[];
  defaultDomains: string[];
  githubLinks: string[];
  contacts: Array<{
    name: string;
    method: string;
    way: string;
    numbers: string[];
  }>;
  hostDervice: Array<{
    name: string;
    email: string;
    password: string;
  }>;
  domainService: Array<{
    name: string;
    email: string;
    password: string;
  }>;
  address: string[];
  date: string;
  providedServices: string;
  renualAmount: Array<{
    service: string;
    amount: number;
  }>;
  images: string[];
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Project[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function AllProjects() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDeleted, setIsDeleted] = useState("false");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState<ApiResponse["pagination"] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        isDeleted,
      });

      const response = await axios.get<ApiResponse>(
        `/api/v2/project?${params.toString()}`
      );

      if (response.data.success) {
        setProjects(response.data.data);
        setPagination(response.data.pagination);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, isDeleted]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page === 1) {
        fetchProjects();
      } else {
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Handle project deletion
  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      const response = await axios.delete(
        `/api/v2/project/action/${projectToDelete}`
      );

      if (response.data.success) {
        toast.success("Project deleted successfully");
        fetchProjects();
        setDeleteDialogOpen(false);
        setProjectToDelete(null);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  // Open details dialog
  const openDetailsDialog = (project: Project) => {
    setSelectedProject(project);
    setDetailsDialogOpen(true);
  };

  // Open delete confirmation
  const confirmDelete = (projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  // Calculate total renewal amount
  const calculateTotalRenewal = (project: Project) => {
    return project.renualAmount.reduce((sum, item) => sum + item.amount, 0);
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  // Loading skeleton
  if (loading && projects.length === 0) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your projects
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/admin/add-project")}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={isDeleted} onValueChange={setIsDeleted}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">Active</SelectItem>
              <SelectItem value="true">Deleted</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>

          <Select value={limit.toString()} onValueChange={(v) => setLimit(parseInt(v))}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("table")}
              className="rounded-l-none border-l"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={fetchProjects}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Globe className="h-3 w-3" />
                      <a
                        href={`https://${project.mainDomain.trim()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-xs"
                      >
                        {project.mainDomain}
                      </a>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={project.isDeleted ? "destructive" : "default"}
                  >
                    {project.isDeleted ? "Deleted" : "Active"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{formatDate(project.date)}</span>
                    </div>
                    <div className="font-medium">
                      ৳{calculateTotalRenewal(project)}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description.replace(/##.*?\n\n/g, "")}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.domains.slice(0, 3).map((domain, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {domain}
                      </Badge>
                    ))}
                    {project.domains.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.domains.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      {project.images.length > 0 && (
                        <div className="flex -space-x-2">
                          {project.images.slice(0, 3).map((img, idx) => (
                            <Avatar key={idx} className="border-2 border-background">
                              <AvatarImage src={img} />
                              <AvatarFallback>
                                <ImageIcon className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {project.images.length} images
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDetailsDialog(project)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          router.push(
                            `/dashboard/admin/project/${project._id}`
                          )
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => confirmDelete(project._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Renewal</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://${project.mainDomain.trim()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" />
                        {project.mainDomain}
                      </a>
                    </TableCell>
                    <TableCell>{formatDate(project.date)}</TableCell>
                    <TableCell>
                      ৳{calculateTotalRenewal(project)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {project.images.length}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={project.isDeleted ? "destructive" : "default"}
                      >
                        {project.isDeleted ? "Deleted" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => openDetailsDialog(project)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/dashboard/admin/project/${project._id}`
                              )
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => confirmDelete(project._id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, pagination.total)} of {pagination.total}{" "}
            projects
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={!pagination.hasPrevPage}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Project Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.name}</DialogTitle>
                <DialogDescription>
                  {selectedProject.mainDomain}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="domains">Domains</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge
                            variant={
                              selectedProject.isDeleted ? "destructive" : "default"
                            }
                          >
                            {selectedProject.isDeleted ? "Deleted" : "Active"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Created:
                          </span>
                          <span>{formatDate(selectedProject.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Last Updated:
                          </span>
                          <span>{formatDate(selectedProject.updatedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Address</h4>
                      <div className="text-sm space-y-1">
                        {selectedProject.address.map((addr, idx) => (
                          <div key={idx}>{addr}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <div className="prose prose-sm max-w-none">
                      {selectedProject.description.split("\n").map((line, idx) => (
                        <p key={idx} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="domains" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Main Domain</h4>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a
                        href={`https://${selectedProject.mainDomain.trim()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {selectedProject.mainDomain}
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Additional Domains</h4>
                    <div className="space-y-2">
                      {selectedProject.domains.map((domain, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 border rounded"
                        >
                          <span className="text-sm">{domain}</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">GitHub Links</h4>
                    <div className="space-y-2">
                      {selectedProject.githubLinks.map((link, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 border rounded"
                        >
                          <Github className="h-4 w-4" />
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex-1 truncate"
                          >
                            {link}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Project Contacts</h4>
                    <div className="space-y-4">
                      {selectedProject.contacts.map((contact, idx) => (
                        <Card key={idx}>
                          <CardContent className="pt-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium">{contact.name}</h5>
                                <Badge variant="outline">{contact.method}</Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">
                                  Contact via:
                                </span>
                                <span>{contact.way}</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Phone className="h-3 w-3" />
                                  <span className="text-sm font-medium">
                                    Phone Numbers
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {contact.numbers.map((num, numIdx) => (
                                    <div
                                      key={numIdx}
                                      className="text-sm bg-muted p-2 rounded"
                                    >
                                      {num}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financial" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Renewal Amounts</h4>
                    <div className="space-y-2">
                      {selectedProject.renualAmount.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border rounded"
                        >
                          <span className="font-medium">{item.service}</span>
                          <span className="text-lg font-bold">
                            ৳{item.amount}
                          </span>
                        </div>
                      ))}
                      {selectedProject.renualAmount.length > 0 && (
                        <div className="flex items-center justify-between p-3 border-t border-dashed pt-3 mt-2">
                          <span className="font-bold">Total</span>
                          <span className="text-xl font-bold">
                            ৳{calculateTotalRenewal(selectedProject)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Provided Services</h4>
                    <div className="prose prose-sm">
                      {selectedProject.providedServices.split("\n").map((line, idx) => (
                        <div key={idx} className="mb-1">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/admin/project/${selectedProject._id}`)
                  }
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDetailsDialogOpen(false);
                    confirmDelete(selectedProject._id);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Project
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}