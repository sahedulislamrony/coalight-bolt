'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCourses } from '@/hooks/useCourses';
import { Course } from '@/types/course';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';

interface CourseListProps {
  onCreateCourse?: () => void;
}

export default function CourseList({ onCreateCourse }: CourseListProps) {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
  });

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error } = useCourses({
    search: debouncedSearch,
    ...filters,
    limit: 20,
  });

  const courses = data?.courses || [];

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Failed to load courses</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and track student progress
          </p>
        </div>
        <Button onClick={onCreateCourse} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Course Grid/List */}
      {isLoading ? (
        <CourseListSkeleton viewMode={viewMode} />
      ) : (
        <motion.div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} viewMode={viewMode} />
          ))}
        </motion.div>
      )}

      {courses.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found</p>
          <Button onClick={onCreateCourse} className="mt-4">
            Create your first course
          </Button>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course, viewMode }: { course: Course; viewMode: 'grid' | 'list' }) {
  const statusColors = {
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/dashboard/courses/${course.id}`}>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <Badge className={statusColors[course.status]}>
                    {course.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">
                  {course.code} • {course.instructor.name}
                </p>
                <p className="text-sm line-clamp-2">{course.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {course.enrollmentCount}/{course.maxEnrollment} students
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(course.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {course.code}
                </p>
              </div>
              <Badge className={statusColors[course.status]}>
                {course.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {course.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Instructor</span>
                <span>{course.instructor.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Students</span>
                <span>{course.enrollmentCount}/{course.maxEnrollment}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Start Date</span>
                <span>{new Date(course.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

function CourseListSkeleton({ viewMode }: { viewMode: 'grid' | 'list' }) {
  const skeletonCount = viewMode === 'grid' ? 6 : 4;

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}