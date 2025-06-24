import Dashboard from "@/components/dashboard/Dashboard";

export default function Page() {
  return (
    <Dashboard>
      <div className="flex  w-full  flex-col items-center justify-center h-screen ">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to the Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          This is your dashboard where you can manage your courses and settings.
        </p>
      </div>
    </Dashboard>
  );
}
