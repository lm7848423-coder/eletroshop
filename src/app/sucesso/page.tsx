export default function Sucesso(){
  return (
    <div style={{minHeight:"80vh", display:"grid", placeItems:"center", fontFamily:"system-ui", textAlign:"center", padding:20}}>
      <div>
        <div style={{fontSize:64}}>✅</div>
        <h1 style={{fontSize:32, fontWeight:900, color:"#1d1d1f"}}>Obrigado! Pedido recebido</h1>
        <p style={{color:"#666", marginTop:12, maxWidth:400}}>Recebemos seu pedido. Vamos te chamar no WhatsApp em até 10 minutos com o rastreio.</p>
        <a href="/" style={{display:"inline-block", marginTop:24, background:"#1d1d1f", color:"white", padding:"14px 28px", borderRadius:999, textDecoration:"none", fontWeight:700}}>Voltar para a loja</a>
      </div>
    </div>
  )
}