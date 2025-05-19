import { BackButton } from "@/components/BackButton";
import { getWorker } from "@/lib/queries/getWorker";
// import * as Sentry from "@sentry/nextjs";
import WorkerForm from "./WorkerForm";
// import ClientForm from "./ClientForm";

export default async function WorkerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    // const { workerId } = await searchParams;
    const params = await searchParams;
    const workerId = params.workerId;

    // Edit client form
    if (workerId) {
      const worker = await getWorker(parseInt(workerId));

      if (!worker) {
        return (
          <>
            <h2 className="text-2xl mb-2">Worker ID #{workerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      // Edit Form Component
      return <WorkerForm worker={worker} />;
    } else {
      // New Form Component
      return <WorkerForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      // Sentry.captureException(error);
      console.log(error);
      throw error;
    }
  }
}
