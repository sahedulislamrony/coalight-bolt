import Dashboard from "@/components/dashboard/Dashboard";

export default function Page() {
  return (
    <Dashboard>
      <div className="flex  w-full  flex-col items-center justify-center h-full pt-10 ">
        <h1 className="text-4xl font-[900] text-gray-900 dark:text-white ">
          Welcome to the Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          This is your dashboard where you can manage your courses and settings.
        </p>
      </div>
    </Dashboard>
  );
}
