

import data from "./data.json"
import { DataTable } from "components/ui/data-table"

export default function Page() {
  return (
    <div className="w-full">
      <DataTable data={data} />
    </div>
  )
}
