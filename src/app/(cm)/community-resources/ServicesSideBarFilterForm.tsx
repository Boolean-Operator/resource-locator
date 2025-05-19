// components/ServiceSidebarForm.tsx
// import { serviceFiltersSchema } from "@/lib/filtersSchema";
import Form from "next/form";

import { ServiceKey } from "@/zod-schema/servicesSchema";

const allServices: ServiceKey[] = [
  "housingPlacement",
  "housingFunding",
  "jobSearch",
  "wfd",
  "careerTraining",
  "academicLifeSkills",
  "rxBenefits",
  "bHmHCounsel",
  "bHmHReferral",
  "soberLivingRecovery",
  "caseManagement",
  "idCards",
  "foodMeals",
  "clothes",
  "directTransport",
  "busTickets",
];

export function ServiceSidebarForm() {
  return (
    <aside className="w-64 p-4 border-r border-gray-300">
      <Form action="/community-resources" className="flex gap-2 items-center">
        {" "}
        <fieldset className="space-y-2">
          <legend className="text-lg font-semibold">Filter by Services</legend>

          {allServices.map((service) => (
            <label key={service} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="services"
                value={service}
                className="h-4 w-4"
              />
              <span className="capitalize">{service}</span>
            </label>
          ))}
        </fieldset>
        {/* <div>
          <label htmlFor="logic" className="block mb-1 font-medium">
            Logic
          </label>
          <select name="logic" id="logic" className="w-full p-1 border rounded">
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </Form>
    </aside>
  );
}
