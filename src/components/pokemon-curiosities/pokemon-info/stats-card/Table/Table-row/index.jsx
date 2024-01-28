export default function TableRow({th,td}){
  
  return (
    <tr className="stat-row">
      <th scope="row">
        {th}
      </th>
      <td className="w-75">
        <meter className="stats-bar w-100 rounded border border-0"
          low={"55"}
          high={"100"}
          min={"0"}
          max={"255"}
          value={td}
          >
        </meter>
      </td>
      <td className="text-center">
        {td}
      </td>
    </tr>
  )
}