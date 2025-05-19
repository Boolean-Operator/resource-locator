"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/hooks/use-toast";

import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { StatesArray } from "@/constants/StatesArray";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  insertCommunityResourceSchema,
  insertCommunityResourceSchemaType,
  selectCommunityResourceSchemaType,
} from "@/zod-schema/community-resource";

import { saveCommunityResourceAction } from "@/app/actions/saveCommunityResourceAction";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";

type Props = {
  communityResource?: selectCommunityResourceSchemaType;
};

export default function CommunityResourceForm({ communityResource }: Props) {
  const { getPermission, isLoading } = useKindeBrowserClient();
  // const { getPermission, getPermissions, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission("manager")?.isGranted;
  const { toast } = useToast();

  const defaultValues: insertCommunityResourceSchemaType = {
    id: communityResource?.id ?? 0,
    title: communityResource?.title ?? "",
    street: communityResource?.street ?? "",
    city: communityResource?.city ?? "",
    state: communityResource?.state ?? "",
    housingPlacement: communityResource?.housingPlacement ?? false,
    housingFunding: communityResource?.housingFunding ?? false,
    jobSearch: communityResource?.jobSearch ?? false,
    wfd: communityResource?.wfd ?? false,
    careerTraining: communityResource?.careerTraining ?? false,
    academicLifeSkills: communityResource?.academicLifeSkills ?? false,
    rxBenefits: communityResource?.rxBenefits ?? false,
    bHmHCounsel: communityResource?.bHmHCounsel ?? false,
    bHmHReferral: communityResource?.bHmHReferral ?? false,
    soberLivingRecovery: communityResource?.soberLivingRecovery ?? false,
    caseManagement: communityResource?.caseManagement ?? false,
    idCards: communityResource?.idCards ?? false,
    foodMeals: communityResource?.foodMeals ?? false,
    clothes: communityResource?.clothes ?? false,
    directTransport: communityResource?.directTransport ?? false,
    busTickets: communityResource?.busTickets ?? false,
    email: communityResource?.email ?? "",
    note: communityResource?.note ?? "",
    website: communityResource?.website ?? "",
    phone: communityResource?.phone ?? "",
    contactName: communityResource?.contactName ?? "",
  };
  const form = useForm<insertCommunityResourceSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCommunityResourceSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCommunityResourceAction, {
    onSuccess({ data }) {
      toast({
        variant: "default",
        title: "Success! 🎉",
        description: data?.message,
      });
    },
    onError({ error }) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Save failed",
      });
      console.log(error);
    },
  });

  async function SubmitForm(data: insertCommunityResourceSchemaType) {
    executeSave(data);
  }

  if (!isManager)
    return (
      <div>
        Your login does not allow you to add notes. Please contact the system
        Admin.
      </div>
    );
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <h2 className="text-2xl font-bold">
        {communityResource?.id ? "Edit" : "New"} Community Resource{" "}
        {communityResource?.id ? `# ${communityResource.id}` : "Form"}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(SubmitForm)}
          className="flex flex-col sm:flex-row md:gap-4 gap-8"
        >
          <div className="flex flex-col gap-3 w-full max-w-xs ">
            <InputWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Community Resource Title"
              nameInSchema="title"
            />

            <InputWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Contact Name"
              nameInSchema="contactName"
            />
            <InputWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Contact Email"
              nameInSchema="email"
            />

            <InputWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Best Phone"
              nameInSchema="phone"
            />
            <InputWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Website Address"
              nameInSchema="website"
            />
            <InputWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Street Address"
              nameInSchema="street"
            />
            <InputWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />

            <SelectWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Housing Placement"
              nameInSchema="housingPlacement"
              message=""
            />

            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Housing Funding"
              nameInSchema="housingFunding"
              message=""
            />

            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Job Search"
              nameInSchema="jobSearch"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Workforce Development"
              nameInSchema="wfd"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Career Training"
              nameInSchema="careerTraining"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Academic & Life Skills"
              nameInSchema="academicLifeSkills"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Rx & Benefits"
              nameInSchema="rxBenefits"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Behavioral & Mental Health Counseling"
              nameInSchema="bHmHCounsel"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Behavioral & Mental Health Referral"
              nameInSchema="bHmHReferral"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Sober Living Recovery"
              nameInSchema="soberLivingRecovery"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Case Management"
              nameInSchema="caseManagement"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="ID's, SS Cards & Birth Certificates"
              nameInSchema="idCards"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Food & Meals"
              nameInSchema="foodMeals"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Clothing"
              nameInSchema="clothes"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Transportation - Direct"
              nameInSchema="directTransport"
              message=""
            />
            <CheckboxWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Transportation - Bus Tickets"
              nameInSchema="busTickets"
              message=""
            />

            {/* <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div> */}
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <TextAreaWithLabel<insertCommunityResourceSchemaType>
              fieldTitle="Note"
              nameInSchema="note"
              className="h-60 field-sizing-content"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
