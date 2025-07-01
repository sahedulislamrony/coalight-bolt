import { Course, CourseModule, Assignment, Enrollment, CourseAnalytics } from '@/types/course';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class CoursesAPI {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include',
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Course CRUD operations
  async getCourses(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }): Promise<{ courses: Course[]; total: number; page: number; totalPages: number }> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return this.request(`/courses?${searchParams.toString()}`);
  }

  async getCourse(id: string): Promise<Course> {
    return this.request(`/courses/${id}`);
  }

  async createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    return this.request('/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    return this.request(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteCourse(id: string): Promise<void> {
    return this.request(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  // Course modules
  async getCourseModules(courseId: string): Promise<CourseModule[]> {
    return this.request(`/courses/${courseId}/modules`);
  }

  async createModule(courseId: string, module: Omit<CourseModule, 'id' | 'courseId'>): Promise<CourseModule> {
    return this.request(`/courses/${courseId}/modules`, {
      method: 'POST',
      body: JSON.stringify(module),
    });
  }

  async updateModule(courseId: string, moduleId: string, updates: Partial<CourseModule>): Promise<CourseModule> {
    return this.request(`/courses/${courseId}/modules/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteModule(courseId: string, moduleId: string): Promise<void> {
    return this.request(`/courses/${courseId}/modules/${moduleId}`, {
      method: 'DELETE',
    });
  }

  // Assignments
  async getAssignments(courseId: string): Promise<Assignment[]> {
    return this.request(`/courses/${courseId}/assignments`);
  }

  async createAssignment(courseId: string, assignment: Omit<Assignment, 'id'>): Promise<Assignment> {
    return this.request(`/courses/${courseId}/assignments`, {
      method: 'POST',
      body: JSON.stringify(assignment),
    });
  }

  async updateAssignment(courseId: string, assignmentId: string, updates: Partial<Assignment>): Promise<Assignment> {
    return this.request(`/courses/${courseId}/assignments/${assignmentId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteAssignment(courseId: string, assignmentId: string): Promise<void> {
    return this.request(`/courses/${courseId}/assignments/${assignmentId}`, {
      method: 'DELETE',
    });
  }

  // Enrollments
  async getEnrollments(courseId: string): Promise<Enrollment[]> {
    return this.request(`/courses/${courseId}/enrollments`);
  }

  async enrollStudent(courseId: string, studentId: string): Promise<Enrollment> {
    return this.request(`/courses/${courseId}/enrollments`, {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    });
  }

  async unenrollStudent(courseId: string, enrollmentId: string): Promise<void> {
    return this.request(`/courses/${courseId}/enrollments/${enrollmentId}`, {
      method: 'DELETE',
    });
  }

  async batchEnrollStudents(courseId: string, studentIds: string[]): Promise<Enrollment[]> {
    return this.request(`/courses/${courseId}/enrollments/batch`, {
      method: 'POST',
      body: JSON.stringify({ studentIds }),
    });
  }

  // Analytics
  async getCourseAnalytics(courseId: string): Promise<CourseAnalytics> {
    return this.request(`/courses/${courseId}/analytics`);
  }

  // File upload
  async uploadFile(file: File, courseId?: string): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    if (courseId) {
      formData.append('courseId', courseId);
    }

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  }
}

export const coursesAPI = new CoursesAPI();