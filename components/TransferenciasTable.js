import React from "react";
import TransferenciasRow from "./TransferenciasRow";

const titles = ["#", "value", "date", "currency","payeer document","payeer name"];

const TableTransferencias = ({ Transferencias, search }) => {
  const filteredTransferencias = Transferencias.filter((Transferencias) =>
    Transferencias.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!Transferencias) return <div>no Transferencias</div>

  return (
    <table className="table table-dark mt-4 table-hover">
      <thead>
        <tr>
          {titles.map((title, i) => (
            <td key={i}>{title}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredTransferencias.map((Transferencias, index) => (
          <TransferenciasRow key={Transferencias.id} Transferencias={Transferencias} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};

export default TableTransferencias;
