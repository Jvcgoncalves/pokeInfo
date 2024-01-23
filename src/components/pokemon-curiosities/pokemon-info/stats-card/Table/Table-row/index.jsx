export default function TableRow({th,td}){
  return (
    <tr className="row">
      <th className="col-2">
        {th}
      </th>
      <td className="col-9 d-flex align-items-center">
        <meter className="stats-bar w-100 rounded border border-0"
        low={"55"}
        high={"100"}
        min={"0"}
        max={"255"}
        value={td}
        >
        </meter>
      </td>
      <td className="col-1 text-center">
        {td}
      </td>
    </tr>
  )
}