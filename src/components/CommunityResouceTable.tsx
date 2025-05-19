"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import ServiceItem from "./ServiceItem";
import { Button } from "./ui/button";

type Props = {
  data: selectCommunityResourceSchemaType[];
};

import type { selectCommunityResourceSchemaType } from "@/zod-schema/community-resource";

export default function CommunityResouceTable({ data }: Props) {
  const { getPermission } = useKindeBrowserClient();
  const isManager = getPermission("manager")?.isGranted;
  return (
    <Table>
      {/* <TableCaption>Filtered Community Resources</TableCaption> */}
      <TableHeader>
        <TableRow className="bg-white">
          <TableHead className="w-[250px]">Titile</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>City</TableHead>
          <TableHead>State</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      {data
        ? data.map((resource: selectCommunityResourceSchemaType) => (
            <TableBody key={resource.id}>
              <TableRow>
                <TableCell className="font-medium py-4">
                  {isManager ? (
                    <Button>
                      <Link
                        href={`/community-resources/form?resourceId=${resource.id}`}
                      >
                        {resource.title}
                      </Link>{" "}
                    </Button>
                  ) : (
                    resource.title
                  )}
                </TableCell>
                <TableCell>{resource.contactName}</TableCell>
                <TableCell>{resource.phone}</TableCell>
                <TableCell>{resource.email}</TableCell>
                <TableCell>{resource.city}</TableCell>
                <TableCell>{resource.state}</TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <ServiceItem
                    label={"Housing Placement"}
                    item={resource.housingPlacement}
                  />
                  <ServiceItem
                    label={"Housing Funding"}
                    item={resource.housingFunding}
                  />
                  <ServiceItem label={"Job Search"} item={resource.jobSearch} />
                  <ServiceItem
                    label={"Workforce Development"}
                    item={resource.wfd}
                  />
                  <ServiceItem
                    label={"Career Training"}
                    item={resource.careerTraining}
                  />
                  <ServiceItem
                    label={"Academic and Life Skills"}
                    item={resource.careerTraining}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <ServiceItem
                    label={"Prescriptions and Health Benefits"}
                    item={resource.rxBenefits}
                  />
                  <ServiceItem
                    label={"Behavioral & Mental Health Counseling"}
                    item={resource.bHmHCounsel}
                  />
                  <ServiceItem
                    label={"Behavioral & Mental Health Referrals"}
                    item={resource.bHmHReferral}
                  />
                  <ServiceItem
                    label={"Sober Living Recovery"}
                    item={resource.soberLivingRecovery}
                  />
                  <ServiceItem
                    label={"Case Management"}
                    item={resource.caseManagement}
                  />
                </TableCell>
                <TableCell colSpan={3}>
                  <ServiceItem
                    label={"Id Cards & Government Docs"}
                    item={resource.idCards}
                  />{" "}
                  <ServiceItem
                    label={"Food & Meals"}
                    item={resource.foodMeals}
                  />{" "}
                  <ServiceItem label={"Clothing"} item={resource.clothes} />{" "}
                  <ServiceItem
                    label={"Direct Transportation"}
                    item={resource.directTransport}
                  />{" "}
                  <ServiceItem
                    label={"Bus Tickests"}
                    item={resource.busTickets}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h3>Notes: </h3>
                  <p>{resource.note ?? ""}</p>
                  <p>{resource.website ?? ""}</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} className="p-2"></TableCell>
              </TableRow>
            </TableBody>
          ))
        : null}
    </Table>
  );
}
