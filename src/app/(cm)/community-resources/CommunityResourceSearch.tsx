import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

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

export default function CommunityResourceSearch() {
  return (
    <aside className="w-64 p-4 border-r border-gray-300">
      <Form action="/community-resources" className="flex gap-2 items-center">
        <fieldset className="space-y-2">
          <legend className="text-lg font-semibold">Filter by Services</legend>

          {allServices.map((service) => (
            <label key={service} className="flex items-center space-x-2">
              <Input
                type="checkbox"
                name="services"
                value={service}
                className="h-4 w-4"
              />
              <span className="capitalize">{service}</span>
            </label>
          ))}
          <SearchButton />
        </fieldset>
      </Form>
    </aside>
  );
}
