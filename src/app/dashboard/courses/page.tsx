'use client';

import { useState } from 'react';
import CourseList from '@/components/courses/CourseList';
import CreateCourseDialog from '@/components/courses/CreateCourseDialog';

export default function CoursesPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="container mx-auto py-6">
      <CourseList onCreateCourse={() => setShowCreateDialog(true)} />
      
      <CreateCourseDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}