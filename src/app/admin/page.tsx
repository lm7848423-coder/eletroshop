// @ts-nocheck
'use client';
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const USER_VALIDO = 'Sato'
const SENHA_VALIDA = '88251267'

export default function Admin(){
  const [logado,setLogado]=useState(false)
  const [user,setUser]=useState('')
  const [senha,setSenha]=useState('')
  const [tab,setTab]=useState('produtos')
  const [produtos,setProdutos]=useState([])
  const [pedidos,setPedidos]=useState([])
  const [config,setConfig]=useState({whatsapp:'',instagram:'',logo_url:'',nome_loja:''})
  const [f,setF]=useState({nome:'',preco:'',estoque:10,categoria:'fone',foto:'',descricao:'',destaque:false})
  const [editId,setEditId]=useState(null)

  useEffect(()=>{
    const log = localStorage.getItem('admin_logado')
    if(log === 'true') setLogado(true)
  },[])

  async function load(){ 
    const res1 = await supabase.from('produtos').select('*').order('id',{ascending:false}); if(res1.data) setProdutos(res1.data)
    const res2 = await supabase.from('pedidos').select('*').order('id',{ascending:false}); if(res2.data) setPedidos(res2.data)
    const res3 = await supabase.from('config_loja').select('*').eq('id',1).single(); if(res3.data) setConfig(res3.data)
  }
  useEffect(()=>{ if(logado) load() },[logado])

  function fazerLogin(){
    if(user === USER_VALIDO && senha === SENHA_VALIDA){
      localStorage.setItem('admin_logado','true')
      setLogado(true)
    } else {
      alert('Usuário ou senha errados!')
    }
  }
  function sair(){
    localStorage.removeItem('admin_logado')
    setLogado(false)
    setUser(''); setSenha('')
  }

  async function saveProd(){
    const payload={nome:f.nome,preco:parseFloat(f.preco),estoque:parseInt(f.estoque),categoria:f.categoria,foto:f.foto,descricao:f.descricao,destaque:f.destaque}
    if(editId){ await supabase.from('produtos').update(payload).eq('id',editId) } else { await supabase.from('produtos').insert([payload]) }
    setF({nome:'',preco:'',estoque:10,categoria:'fone',foto:'',descricao:'',destaque:false}); setEditId(null); load()
  }
  async function saveConfig(){ await supabase.from('config_loja').update({whatsapp:config.whatsapp,instagram:config.instagram,logo_url:config.logo_url,nome_loja:config.nome_loja}).eq('id',1); alert('Config salva!') }

  if(!logado){
    return(
      <div style={{ minHeight: '100vh', background: '#ffe600', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ background: 'white', padding: 30, borderRadius: 12, width: 380, maxWidth: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ background: '#000', color: '#ffe600', width: 50, height: 50, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 24, margin: '0 auto' }}>E</div>
            <h1 style={{ color: '#000', fontSize: 20, fontWeight: 900, marginTop: 12, marginBottom: 0 }}>ELETROSHOP ADM</h1>
            <p style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Acesso restrito • Imperatriz-MA</p>
          </div>
          <label style={lab}>Usuário</label><input value={user} onChange={e=>setUser(e.target.value)} placeholder="Sato" style={inp} />
          <label style={lab}>Senha</label><input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="Sua senha" style={inp} onKeyDown={e=> e.key==='Enter' && fazerLogin()} />
          <button onClick={fazerLogin} style={{ width: '100%', marginTop: 16, background: '#000', color: '#ffe600', padding: 12, borderRadius: 8, fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: 14 }}>Entrar no Painel</button>
          <p style={{ fontSize: 11, color: '#999', textAlign: 'center', marginTop: 12 }}>Dica: Sato / 88251267</p>
        </div>
      </div>
    )
  }

  return(
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: '#ffe600', padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
        <b style={{ color: '#000' }}>ADM • {config.nome_loja}</b>
        <button onClick={()=>setTab('produtos')} style={{ marginLeft: 20, background: tab==='produtos' ? '#000' : '#fff', color: tab==='produtos' ? '#ffe600' : '#000', padding: '6px 12px', borderRadius: 6, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Produtos</button>
        <button onClick={()=>setTab('pedidos')} style={{ background: tab==='pedidos' ? '#000' : '#fff', color: tab==='pedidos' ? '#ffe600' : '#000', padding: '6px 12px', borderRadius: 6, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Pedidos ({pedidos.length})</button>
        <button onClick={()=>setTab('config')} style={{ background: tab==='config' ? '#000' : '#fff', color: tab==='config' ? '#ffe600' : '#000', padding: '6px 12px', borderRadius: 6, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Config</button>
        <button onClick={sair} style={{ marginLeft: 'auto', background: '#fff', color: '#000', padding: '6px 12px', borderRadius: 6, border: '1px solid #ddd', fontWeight: 700, cursor: 'pointer' }}>Sair</button>
      </header>

      {tab==='produtos' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16, display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16 }}>
          <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #ddd', height: 'fit-content' }}>
            <b style={{ color: '#000' }}>{editId ? 'Editar' : 'Novo'} Produto</b>
            <input value={f.nome} onChange={e=>setF({...f,nome:e.target.value})} placeholder="Nome" style={inp} />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}><input type="number" value={f.preco} onChange={e=>setF({...f,preco:e.target.value})} placeholder="Preço" style={inp} /><input type="number" value={f.estoque} onChange={e=>setF({...f,estoque:e.target.value})} placeholder="Estoque" style={inp} /></div>
            <select value={f.categoria} onChange={e=>setF({...f,categoria:e.target.value})} style={{...inp, marginTop: 8}}><option value="fone">Fone</option><option value="caixa">Caixa</option><option value="smartwatch">Smartwatch</option><option value="acessorio">Acessório</option></select>
            <input value={f.foto} onChange={e=>setF({...f,foto:e.target.value})} placeholder="Link foto" style={{...inp, marginTop: 8}} />
            <textarea value={f.descricao} onChange={e=>setF({...f,descricao:e.target.value})} placeholder="Descrição" style={{...inp, marginTop: 8, height: 60}} />
            <label style={{ display: 'flex', gap: 6, marginTop: 8, color: '#000', fontSize: 13 }}><input type="checkbox" checked={f.destaque} onChange={e=>setF({...f,destaque:e.target.checked})} /> Destaque</label>
            <button onClick={saveProd} style={{ width: '100%', marginTop: 12, background: '#3483fa', color: 'white', padding: 10, borderRadius: 6, border: 'none', fontWeight: 800, cursor: 'pointer' }}>Salvar</button>
          </div>
          <div style={{ background: 'white', borderRadius: 8, border: '1px solid #ddd' }}>
            {produtos.map(p=>(
              <div key={p.id} style={{ padding: 12, display: 'flex', gap: 10, borderBottom: '1px solid #eee', alignItems: 'center' }}>
                <img src={p.foto} style={{ width: 48, height: 48, objectFit: 'contain', border: '1px solid #eee' }} />
                <div style={{ flex: 1 }}><b style={{ color: '#000', fontSize: 13 }}>{p.nome}</b><br/><span style={{ color: '#333', fontSize: 11 }}>R$ {p.preco} • {p.estoque} un</span></div>
                <button onClick={()=>{setF({nome:p.nome,preco:p.preco,estoque:p.estoque,categoria:p.categoria,foto:p.foto,descricao:p.descricao||'',destaque:p.destaque}); setEditId(p.id)}} style={{ background: '#000', color: 'white', padding: '6px 10px', borderRadius: 6, border: 'none', fontSize: 11, cursor: 'pointer' }}>Editar</button>
                <button onClick={async()=>{if(confirm('Excluir?')){await supabase.from('produtos').delete().eq('id',p.id); load()}}} style={{ background: '#ffeaea', color: '#c00', padding: '6px 10px', borderRadius: 6, border: 'none', fontSize: 11, cursor: 'pointer' }}>Excluir</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='pedidos' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
          <div style={{ background: 'white', borderRadius: 8, border: '1px solid #ddd' }}>
            <div style={{ padding: 14, fontWeight: 800, color: '#000', borderBottom: '1px solid #eee' }}>Pedidos - Imperatriz e Davinópolis ({pedidos.length})</div>
            {pedidos.map(pe=>(
              <div key={pe.id} style={{ padding: 16, borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ color: '#000' }}>Pedido #{pe.id} • {pe.cidade} • R$ {pe.total}</b><span style={{ background: '#00a650', color: 'white', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>{pe.status}</span></div>
                <p style={{ color: '#000', fontSize: 13 }}><b>{pe.nome}</b> • {pe.telefone} • {pe.endereco}, {pe.bairro}</p>
                <p style={{ color: '#333', fontSize: 11 }}>PIX: {pe.pix_chave}</p>
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>{pe.itens && pe.itens.map((it,i)=>(<span key={i} style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: 4, fontSize: 11, color: '#000' }}>{it.nome} x{it.qtd}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='config' && (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
          <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #ddd' }}>
            <b style={{ color: '#000' }}>Configurações</b>
            <label style={lab}>WhatsApp</label><input value={config.whatsapp} onChange={e=>setConfig({...config,whatsapp:e.target.value})} style={inp} />
            <label style={lab}>Instagram</label><input value={config.instagram} onChange={e=>setConfig({...config,instagram:e.target.value})} style={inp} />
            <label style={lab}>Nome Loja</label><input value={config.nome_loja} onChange={e=>setConfig({...config,nome_loja:e.target.value})} style={inp} />
            <label style={lab}>Logo URL</label><input value={config.logo_url} onChange={e=>setConfig({...config,logo_url:e.target.value})} style={inp} />
            <button onClick={saveConfig} style={{ width: '100%', marginTop: 16, background: '#000', color: '#ffe600', padding: 12, borderRadius: 8, fontWeight: 800, border: 'none', cursor: 'pointer' }}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  )
}
const inp = { width: '100%', padding: '9px 10px', border: '1px solid #ccc', borderRadius: 6, color: '#000', fontSize: 13, background: 'white' }
const lab = { display: 'block', marginTop: 12, fontSize: 12, fontWeight: 700, color: '#000' }