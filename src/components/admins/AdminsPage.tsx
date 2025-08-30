import { columns } from "@/components/admins/columns";
import { DataTable } from "@/components/data-table";
import { getAdmins } from "@/lib/admins/api";
import { Admin } from "@/types/type";
import { useState, useEffect } from "react";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins(); //return data
        setAdmins(data);
      } catch (error) {
        console.error("Failed to fetch admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  {
    console.log("api response data from admins page:", admins);
  }
  return (
    <div className="container mx-auto">
      <div>
        <p className="text-muted-foreground text-center text-xl text-gray-700">
          Manage admins and their settings.
        </p>
      </div>
      <DataTable columns={columns} data={admins} dataType="admin" />
    </div>
  );
}
