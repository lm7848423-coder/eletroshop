'use client';
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const iStyle = { width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, marginTop: 10, outline: 'none', color: '#000', fontSize: 14, boxSizing: 'border-box' } as any

export default function Home() {
  const [produtos,setProdutos]=useState<any[]>([])
  const [busca,setBusca]=useState('')
  const [carrinho,setCarrinho]=useState<any[]>([])
  const [showCart,setShowCart]=useState(false)
  const [showCheckout,setShowCheckout]=useState(false)
  const [loading,setLoading]=useState(true)
  const [config,setConfig]=useState<any>({whatsapp:'5599999999999',instagram:'@eletroshop.itz',nome_loja:'ELETROSHOP', logo_url: ''})
  const [form,setForm]=useState({nome:'',telefone:'',endereco:'',bairro:'',cidade:'Imperatriz'})
  const [pedidoGerado,setPedidoGerado]=useState<any>(null)

  useEffect(()=>{
    async function load(){
      const {data: prods} = await supabase.from('produtos').select('*').order('destaque',{ascending:false}).order('id',{ascending:false})
      if(prods) setProdutos(prods)
      const {data: cfg} = await supabase.from('config_loja').select('*').eq('id',1).single()
      if(cfg) setConfig(cfg)
      setLoading(false)
      const saved = localStorage.getItem('carrinho'); 
      if(saved) try { setCarrinho(JSON.parse(saved)) } catch {}
    }
    load()
  },[])

  useEffect(()=>{ localStorage.setItem('carrinho', JSON.stringify(carrinho)) },[carrinho])

  const filtrados = produtos.filter(p=> p.nome.toLowerCase().includes(busca.toLowerCase()))
  const totalProdutos = carrinho.reduce((s,p)=> s + p.preco*p.qtd,0)
  const frete = 10
  const totalFinal = totalProdutos + (carrinho.length>0 ? frete : 0)

  function addCart(p:any){
    setCarrinho(prev=>{
      const ex = prev.find((i:any)=>i.id===p.id)
      if(ex) return prev.map((i:any)=> i.id===p.id ? {...i,qtd:i.qtd+1} : i)
      return [...prev,{...p,qtd:1}]
    }); setShowCart(true)
  }

  async function finalizar(){
    if(!form.nome || !form.telefone || !form.endereco) return alert('Preencha nome, telefone e endereço')
    const pixChave = `${Math.random().toString(36).substring(2,10)}-${config.whatsapp}`.toUpperCase()
    const pixCodigo = `000201264${Math.random().toString().slice(2,14)}520400005303986540${totalFinal.toFixed(2)}5802BR5908EletroShop6009Imperatriz62070503***6304${Math.random().toString().slice(2,6)}`
    const { data } = await supabase.from('pedidos').insert([{ itens: carrinho, total: totalFinal, frete, nome: form.nome, telefone: form.telefone, endereco: form.endereco, cidade: form.cidade, bairro: form.bairro, status: 'pago', pix_codigo: pixCodigo, pix_chave: pixChave }]).select().single()
    setPedidoGerado(data); setCarrinho([]); localStorage.removeItem('carrinho')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ebebeb', fontFamily: 'sans-serif' }}>
      <header style={{ background: '#ffe600', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 160 }}>
            {config.logo_url ? <img src={config.logo_url} style={{ width: 40, height: 40, borderRadius: 8 }} /> : <div style={{ background: '#000', color: '#ffe600', width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>E</div>}
            <b style={{ color: '#000', fontSize: 16, lineHeight: 1 }}>{config.nome_loja}<br/><span style={{ fontSize: 9, fontWeight: 400 }}>IMPERATRIZ E DAVINÓPOLIS</span></b>
          </div>
          <div style={{ flex: 1, maxWidth: 600, display: 'flex', background: 'white', borderRadius: 6, overflow: 'hidden' }}>
            <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar produtos..." style={{ flex: 1, padding: '12px 16px', border: 'none', outline: 'none', color: '#000' }} />
            <button style={{ padding: '0 16px', borderLeft: '1px solid #eee', background: 'white' }}>🔍</button>
          </div>
          <button onClick={()=>setShowCart(true)} style={{ background: '#000', color: '#ffe600', padding: '10px 18px', borderRadius: 6, border: 'none', fontWeight: 800, cursor: 'pointer' }}>🛒 Carrinho ({carrinho.reduce((s,i:any)=>s+i.qtd,0)})</button>
        </div>
      </header>

      <div style={{ maxWidth: 1250, margin: '12px auto', padding: '0 16px', display: 'flex', gap: 10 }}>
        <div style={{ background: 'white', padding: '10px 14px', borderRadius: 20, border: '1px solid #ddd', fontSize: 13, color: '#000' }}>📍 Entregamos em <b>Imperatriz e Davinópolis • MA</b></div>
        <div style={{ background: 'white', padding: '10px 14px', borderRadius: 20, border: '1px solid #ddd', fontSize: 13, color: '#000' }}>🛡️ {config.instagram}</div>
      </div>

      {loading ? <p style={{ textAlign: 'center', marginTop: 40 }}>Carregando...</p> : filtrados.length === 0 ? 
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <p style={{ fontWeight: 700 }}>Nenhum produto ainda</p>
          <p>Entre em /admin para cadastrar</p>
          <a href="/admin" style={{ background: '#000', color: '#ffe600', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 700 }}>Ir para Admin</a>
        </div>
        :
        <div style={{ maxWidth: 1250, margin: '16px auto', padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          {filtrados.map((p:any)=>(
            <div key={p.id} style={{ background: 'white', borderRadius: 8, border: '1px solid #e6e6e6', overflow: 'hidden' }}>
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}><img src={p.foto} style={{ maxHeight: '100%', maxWidth: '100%' }} /></div>
              <div style={{ padding: 12, borderTop: '1px solid #f2f2f2' }}>
                <p style={{ color: '#000', fontSize: 14, height: 36, overflow: 'hidden', margin: 0 }}>{p.nome}</p>
                <p style={{ color: '#000', fontSize: 22, margin: '8px 0 0 0' }}>R$ {Number(p.preco).toFixed(2).replace('.',',')}</p>
                <p style={{ color: '#666', fontSize: 11, margin: '4px 0' }}>{p.estoque} disponíveis</p>
                <button onClick={()=>addCart(p)} style={{ width: '100%', marginTop: 10, background: '#3483fa', color: 'white', padding: 10, borderRadius: 6, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Adicionar ao carrinho</button>
              </div>
            </div>
          ))}
        </div>
      }

      {showCart && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: 400, background: 'white', height: '100%', padding: 20, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>Seu Carrinho</b><button onClick={()=>setShowCart(false)}>✕</button></div>
            {carrinho.map((item:any,i:number)=>(
              <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 0', borderBottom: '1px solid #eee' }}>
                <img src={item.foto} style={{ width: 50, height: 50, objectFit: 'contain' }} />
                <div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{item.nome}</p><p style={{ margin: 0 }}>R$ {item.preco} x {item.qtd}</p></div>
                <button onClick={()=>setCarrinho(carrinho.filter((_:any,idx:number)=>idx!==i))} style={{ color: 'red', border: 'none', background: 'none' }}>Excluir</button>
              </div>
            ))}
            <p>Subtotal: R$ {totalProdutos.toFixed(2)}</p>
            <b>Total: R$ {totalFinal.toFixed(2)}</b>
            <button onClick={()=>{setShowCart(false); setShowCheckout(true)}} style={{ width: '100%', marginTop: 16, background: '#000', color: '#ffe600', padding: 14, borderRadius: 8, fontWeight: 800 }}>Finalizar Compra</button>
          </div>
        </div>
      )}

      {showCheckout && !pedidoGerado && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 24, width: 420 }}>
            <h2 style={{ color: '#000', margin: 0 }}>Finalizar Pedido</h2>
            <input placeholder="Nome completo" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} style={iStyle} />
            <input placeholder="WhatsApp" value={form.telefone} onChange={e=>setForm({...form,telefone:e.target.value})} style={iStyle} />
            <select value={form.cidade} onChange={e=>setForm({...form,cidade:e.target.value})} style={iStyle}><option>Imperatriz</option><option>Davinópolis</option></select>
            <input placeholder="Bairro" value={form.bairro} onChange={e=>setForm({...form,bairro:e.target.value})} style={iStyle} />
            <input placeholder="Endereço completo" value={form.endereco} onChange={e=>setForm({...form,endereco:e.target.value})} style={iStyle} />
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}><button onClick={()=>setShowCheckout(false)} style={{ flex: 1, padding: 12, background: '#eee', borderRadius: 8, border: 'none' }}>Voltar</button><button onClick={finalizar} style={{ flex: 2, padding: 12, background: '#00a650', color: 'white', borderRadius: 8, border: 'none', fontWeight: 800 }}>Gerar PIX e Pagar</button></div>
          </div>
        </div>
      )}

      {pedidoGerado && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 102, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 24, width: 450, textAlign: 'center' }}>
            <h2 style={{ color: '#000' }}>Pagamento Aprovado!</h2>
            <p style={{ fontSize: 12, wordBreak: 'break-all' }}><b>PIX:</b> {pedidoGerado.pix_codigo}</p>
            <p style={{ color: '#00a650', fontWeight: 700 }}>Entrega hoje em {pedidoGerado.cidade}</p>
            <button onClick={()=>{setPedidoGerado(null); setShowCheckout(false)}} style={{ width: '100%', marginTop: 14, background: '#000', color: 'white', padding: 12, borderRadius: 8 }}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  )
}