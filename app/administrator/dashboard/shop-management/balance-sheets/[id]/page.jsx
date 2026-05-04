"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import DataTable from "@/components/common/DataTable/DataTable";
import Searchbar from "../../../components/Searchbar";
import BalanceSheetColumns from "../components/BalanceSheetColumns";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

const BalanceSheetPage = () => {
  const params = useParams();
  const quarter = params?.id || 1;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [months, setMonths] = useState({ m1: "Month 1", m2: "Month 2", m3: "Month 3" });

  const fetchBalanceSheet = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/admin/balance-sheets/${quarter}?year=${year}`);
      if (response.success) {
        setData(response.data);
        setMonths(response.months);
      } else {
        toast.error(response.message || "Failed to load balance sheet");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }, [quarter, year]);

  useEffect(() => {
    fetchBalanceSheet();
  }, [fetchBalanceSheet]);

  const handleYearSearch = (searchValue) => {
    if (searchValue && !isNaN(searchValue)) {
      setYear(searchValue);
    }
  };

  // Generate dynamic columns based on fetched month names
  const dynamicColumns = useMemo(() => {
    return BalanceSheetColumns(months);
  }, [months]);

  return (
    <>
      <DashboardHeading
        titlePrefix={`${quarter}${quarter == 1 ? 'st' : quarter == 2 ? 'nd' : quarter == 3 ? 'rd' : 'th'} Quarter`}
        label="balance sheet"
        subtitle={`Balance sheet for year ${year}`}
      >
        <BackButton />
      </DashboardHeading>

      <div className={"mb-4"}>
        <Searchbar 
          placeholder={"Write year here for search (e.g. 2024)"} 
          onSearch={handleYearSearch} 
          defaultValue={year}
        />
      </div>

      <DataTable
        rowColored
        columns={dynamicColumns}
        data={data}
        loading={loading}
      />
    </>
  );
};

export default BalanceSheetPage;
