import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BookOpenText, Users, CalendarDays, MoveUpRight } from "lucide-react";

import Link from "next/link";

export default function CourseCard() {
  return (
    <Card className="w-[380px] relative rounded-md border border-t-0 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md dark:shadow-neutral-800/50">
      <TopBorderAccent />
      <CourseCardBody>
        <CourseCardHeader title="Design Thinking and Innovation" link="#" />
        <CourseCardContent
          courseCode="DES-501"
          numberOfStudents={120}
          year={2025}
          duration="12 weeks"
        />
        <CourseCardFooter level="Graduate level" elective="Design Elective" />
      </CourseCardBody>
    </Card>
  );
}

const TopBorderAccent = () => {
  return (
    <div className="h-[2px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent dark:via-blue-400" />
  );
};
const CourseCardBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-6">{children}</div>;
};
const CourseCardHeader = ({
  title,
  link,
}: {
  title: string;
  link: URL | string;
}) => {
  return (
    <Link href={link} className="no-underline">
      <CardHeader className="p-0 mb-0 group relative ">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-medium tracking-tight leading-snug text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <MoveUpRight className="absolute right-0 top-0 h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </div>
        <div className="w-16 h-[1.5px] my-2 bg-blue-200 dark:bg-blue-500/70 rounded-full" />
      </CardHeader>
    </Link>
  );
};

const CourseCardFooter = ({
  level = "Graduate level",
}: {
  level?: string;
  elective?: string;
}) => {
  return (
    <CardFooter className="p-0 mt-2 flex justify-between items-center">
      {/* <span className="text-xs text-muted-foreground">{level}</span> */}
      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        {level}
      </span>
    </CardFooter>
  );
};

const CourseCardContent = ({
  courseCode,
  numberOfStudents,
  year,
  duration,
}: {
  courseCode: string;
  numberOfStudents: number;
  year: number;
  duration: string;
}) => {
  return (
    <CardContent className="p-0 my-4 space-y-1 text-sm">
      <div className="flex items-center gap-3 text-muted-foreground">
        <BookOpenText className="h-4 w-4 text-blue-600 dark:text-white" />
        <span>{courseCode}</span>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        <Users className="h-4 w-4 text-blue-600 dark:text-white" />
        <span>{numberOfStudents} students enrolled</span>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        <CalendarDays className="h-4 w-4 text-blue-600 dark:text-white" />
        <span>{`Fall ${year} • ${duration}`}</span>
      </div>
    </CardContent>
  );
};
