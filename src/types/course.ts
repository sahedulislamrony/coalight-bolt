export interface Course {
  id: string;
  title: string;
  description: string;
  code: string;
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  enrollmentCount: number;
  maxEnrollment: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
  resources: CourseResource[];
  assignments: Assignment[];
}

export interface CourseResource {
  id: string;
  moduleId: string;
  title: string;
  type: 'video' | 'document' | 'link' | 'quiz';
  url: string;
  size?: number;
  duration?: number;
  order: number;
  isRequired: boolean;
}

export interface Assignment {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'essay' | 'quiz' | 'project' | 'submission';
  dueDate: Date;
  maxPoints: number;
  instructions: string;
  rubric?: AssignmentRubric;
  submissions: AssignmentSubmission[];
}

export interface AssignmentRubric {
  id: string;
  criteria: RubricCriterion[];
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  levels: RubricLevel[];
}

export interface RubricLevel {
  id: string;
  name: string;
  description: string;
  points: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  attachments: SubmissionAttachment[];
  submittedAt: Date;
  grade?: number;
  feedback?: string;
  status: 'draft' | 'submitted' | 'graded' | 'returned';
}

export interface SubmissionAttachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: Date;
  status: 'active' | 'dropped' | 'completed';
  progress: number;
  lastAccessedAt: Date;
}

export interface CourseAnalytics {
  courseId: string;
  totalEnrollments: number;
  activeStudents: number;
  completionRate: number;
  averageGrade: number;
  engagementMetrics: {
    averageTimeSpent: number;
    resourceViews: number;
    assignmentSubmissions: number;
  };
}