import { useState } from 'react'
import { Transacao } from './types'
import { SaldoAtual } from './SaldoAtual'
import { FormularioTransacao } from './FormularioTransacao'
import { ListaTransacoes } from './ListaTransacoes'
import Header from './Header'

function ControleGastos() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])

  const [transacaoEditando, setTransacaoEditando] = useState<Transacao | null>(null)

  const adicionarOuEditarTransacao = (transacao: Transacao) => {
    if(transacao.id===0){
      transacao.id = Math.random();

      setTransacoes(prevTransacoes => [...prevTransacoes, transacao])
    } else{
      setTransacoes(prevTransacoes => prevTransacoes.map((t:Transacao) => (t.id === transacao.id ? transacao : t)))
    }
  }

  const editarTransacao = (transacao: Transacao) => setTransacaoEditando(transacao)

  const deletarTransacao = (id: number) => {
    setTransacoes(prevTransacoes => prevTransacoes.filter((t:Transacao) => t.id !== id))
  }

  const cancelaEdicao = () => setTransacaoEditando(null)
  return (
    <div>
      <Header/>
    <div className="bg-slate-50 p-6 flex gap-4 flex-col h-screen oveflow-hidden">
      <h1 className="text-5xl">Gestão de Gastos</h1>
      <div className="flex flex-row justify-between items-center">
      <SaldoAtual transacoes={transacoes}/>
      <FormularioTransacao 
        transacaoAtual={transacaoEditando}
        salvarTransacao={adicionarOuEditarTransacao}
        cancelarEdicao={cancelaEdicao}
      />
      </div>
      <ListaTransacoes 
        transacoes={transacoes}
        editarTransacao={editarTransacao}
        deletarTransacao={deletarTransacao}
      />
    </div>
    </div>
  )
}

export default ControleGastos
