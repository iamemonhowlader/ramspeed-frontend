import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import NewsLetterColumns from "./components/NewsLetterColumns";
import { newsletterList } from "@/data/newsLetterData";

const NewsLetterList = () => {
  return (
    <>
      <DashboardHeading
        titlePrefix="Newesletter"
        label="list"
        subtitle="Manage your newsletter here"
      >
        <BackButton />
      </DashboardHeading>

      <div className={"ml-auto max-w-max mb-4"}>
        <Button variant={"destructive"}>Delete Selected</Button>
      </div>

      {/* table container  */}
      <DataTable rowColored columns={NewsLetterColumns} data={newsletterList} />
    </>
  );
};

export default NewsLetterList;
