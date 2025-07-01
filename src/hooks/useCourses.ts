import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesAPI } from '@/lib/api/courses';
import { Course, CourseModule, Assignment, Enrollment } from '@/types/course';
import { toast } from 'sonner';

export const useCourses = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => coursesAPI.getCourses(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => coursesAPI.getCourse(id),
    enabled: !!id,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) =>
      coursesAPI.createCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create course');
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Course> }) =>
      coursesAPI.updateCourse(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['course', id] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update course');
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => coursesAPI.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete course');
    },
  });
};

export const useCourseModules = (courseId: string) => {
  return useQuery({
    queryKey: ['course-modules', courseId],
    queryFn: () => coursesAPI.getCourseModules(courseId),
    enabled: !!courseId,
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, module }: { courseId: string; module: Omit<CourseModule, 'id' | 'courseId'> }) =>
      coursesAPI.createModule(courseId, module),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['course-modules', courseId] });
      toast.success('Module created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create module');
    },
  });
};

export const useAssignments = (courseId: string) => {
  return useQuery({
    queryKey: ['assignments', courseId],
    queryFn: () => coursesAPI.getAssignments(courseId),
    enabled: !!courseId,
  });
};

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, assignment }: { courseId: string; assignment: Omit<Assignment, 'id'> }) =>
      coursesAPI.createAssignment(courseId, assignment),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['assignments', courseId] });
      toast.success('Assignment created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create assignment');
    },
  });
};

export const useEnrollments = (courseId: string) => {
  return useQuery({
    queryKey: ['enrollments', courseId],
    queryFn: () => coursesAPI.getEnrollments(courseId),
    enabled: !!courseId,
  });
};

export const useEnrollStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, studentId }: { courseId: string; studentId: string }) =>
      coursesAPI.enrollStudent(courseId, studentId),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['enrollments', courseId] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Student enrolled successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to enroll student');
    },
  });
};

export const useBatchEnrollStudents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, studentIds }: { courseId: string; studentIds: string[] }) =>
      coursesAPI.batchEnrollStudents(courseId, studentIds),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['enrollments', courseId] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Students enrolled successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to enroll students');
    },
  });
};

export const useCourseAnalytics = (courseId: string) => {
  return useQuery({
    queryKey: ['course-analytics', courseId],
    queryFn: () => coursesAPI.getCourseAnalytics(courseId),
    enabled: !!courseId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFileUpload = () => {
  return useMutation({
    mutationFn: ({ file, courseId }: { file: File; courseId?: string }) =>
      coursesAPI.uploadFile(file, courseId),
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload file');
    },
  });
};