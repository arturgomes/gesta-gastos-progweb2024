import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Transacao } from "./types"


interface FormularioTransacaoProps {
  transacaoAtual: Transacao | null;
  salvarTransacao: (transacao: Transacao) => void;
  cancelarEdicao: () => void;
}
export const FormularioTransacao = ({transacaoAtual, salvarTransacao, cancelarEdicao}: FormularioTransacaoProps) => {
  const [transacao, setTransacao] = useState<Transacao>({
    id: 0,
    tipo: "receita",
    descricao: "",
    valor: 0
  })

  useEffect(()=>{
    if(transacaoAtual){
      setTransacao(transacaoAtual)
    }
  },[transacaoAtual])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    const {name, value} = e.target;
    setTransacao(prevTransacao => ({
      ...prevTransacao, 
      [name]: name === "valor" ? parseFloat(value) : value
    }))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    salvarTransacao(transacao)
    setTransacao({
      id: 0,
      tipo: "receita",
      descricao: "",
      valor: 0
    })
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 flex gap-2 flex-col">
      <div className="flex flex-row gap-2 items-center">
        <label>Tipo:</label>
        <select name="tipo" value={transacao.tipo} onChange={handleChange} className="border-slate-300 border rounded-sm p-1 w-full">
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label>Descrição:</label>
        <input type="text" name="descricao" value={transacao.descricao} onChange={handleChange} className="w-full border-slate-300 border rounded-sm p-1"/>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label>Valor:</label>
        <input type="number" name="valor" value={transacao.valor} onChange={handleChange} step="0.01" className="w-full border-slate-300 border rounded-sm p-1"/>
      </div>
      <div className="flex flex-row gap-2 w-full">
        <button type="submit" className="border-slate-300 bg-slate-200 px-8 py-2 border rounded-md p-1 flex-1">
          Salvar
        </button>
        {transacaoAtual && <button type="button" onClick={cancelarEdicao} className="border-slate-300 flex-1 bg-slate-200 px-8 py-2 border rounded-md p-1">Cancelar</button>}
      </div>
    </form>
  )
}