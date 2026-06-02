import React, { useState, useEffect } from 'react';

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('cadastro');
  const [assistidos, setAssistidos] = useState([]);
  
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataAtendimento, setDataAtendimento] = useState(new Date().toISOString().split('T')[0]);
  const [obs, setObs] = useState('');
  
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    const dadosLocais = localStorage.getItem('caminho_do_bem_dados');
    if (dadosLocais) {
      setAssistidos(JSON.parse(dadosLocais));
    }
  }, []);

  const handleSalvar = (e) => {
    e.preventDefault();
    if (!nome.trim() || !endereco.trim()) {
      alert('🚨 Nome e Endereço são obrigatórios.');
      return;
    }

    const novoRegistro = {
      id: Date.now(),
      nome: nome.trim(),
      cpf: cpf.trim(),
      endereco: endereco.trim(),
      telefone: telefone.trim(),
      dataAtendimento: dataAtendimento,
      obs: obs.trim()
    };

    const listaAtualizada = [novoRegistro, ...assistidos];
    setAssistidos(listaAtualizada);
    localStorage.setItem('caminho_do_bem_dados', JSON.stringify(listaAtualizada));

    setNome(''); setCpf(''); setEndereco(''); setTelefone(''); setObs('');
    setDataAtendimento(new Date().toISOString().split('T')[0]);
    alert(`✅ Registro de ${novoRegistro.nome} salvo com sucesso!`);
  };

  const registrosFiltrados = assistidos.filter((item) => {
    const termo = termoBusca.toLowerCase();
    return item.nome.toLowerCase().includes(termo) || item.cpf.includes(termo) || item.endereco.toLowerCase().includes(termo);
  });

  return (
    <div className="app-container">
      <style>{`
        :root {
          --roxo-escuro: #3b103c; --roxo-claro: #5c1a5d; --dourado: #d4a017;
          --fundo: #f4f0ec; --branco: #ffffff; --texto-escuro: #1e293b;
          --texto-mutado: #64748b; --borda: #e2e8f0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, sans-serif; }
        .app-container { display: flex; height: 100vh; width: 100vw; background-color: var(--fundo); }
        
        .sidebar { width: 260px; background: linear-gradient(180deg, var(--roxo-escuro) 0%, var(--roxo-claro) 100%); color: var(--branco); display: flex; flex-direction: column; box-shadow: 4px 0 24px rgba(0,0,0,0.1); z-index: 10; }
        .sidebar-logo { padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center; }
        .sidebar-logo h1 { font-size: 1.3rem; font-weight: 800; margin-bottom: 4px; }
        .sidebar-logo p { color: var(--dourado); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
        .nav-menu { padding: 20px 16px; display: flex; flex-direction: column; gap: 8px; }
        .nav-item { background: transparent; border: none; color: rgba(255,255,255,0.7); padding: 14px; text-align: left; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.2s ease; }
        .nav-item:hover { background: rgba(255,255,255,0.1); color: var(--branco); }
        .nav-item.active { background: var(--dourado); color: var(--roxo-escuro); font-weight: 700; }
        
        .main-content { flex: 1; overflow-y: auto; padding: 30px 40px; height: 100vh; }
        
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .header h2 { font-size: 1.8rem; color: var(--roxo-escuro); font-weight: 800; }
        .status-badge { background: #e0f2fe; color: #0369a1; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; }
        .card { background: var(--branco); border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); overflow: hidden; margin-bottom: 40px; }
        .card-header { padding: 16px 24px; border-bottom: 1px solid var(--borda); background: #fafafa; }
        .card-header h3 { font-size: 1.1rem; color: var(--roxo-escuro); font-weight: 700; text-transform: uppercase; }
        .card-body { padding: 24px; }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .full-width { grid-column: 1 / -1; }
        .form-label { font-size: 0.9rem; font-weight: 600; color: var(--texto-escuro); }
        .form-control { padding: 12px; border: 1px solid var(--borda); border-radius: 8px; font-size: 0.95rem; background: #f8fafc; }
        .form-control:focus { outline: none; border-color: var(--roxo-claro); background: var(--branco); }
        textarea.form-control { resize: vertical; min-height: 100px; }
        
        .btn-primary { background: var(--roxo-escuro); color: var(--branco); border: none; padding: 16px; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; margin-top: 10px; width: 100%; text-transform: uppercase;}
        .btn-primary:hover { background: var(--roxo-claro); transform: translateY(-2px); }
        
        .search-container { margin-bottom: 20px; }
        .search-input { width: 100%; padding: 14px; border: 1px solid var(--borda); border-radius: 8px; font-size: 1rem; }
        .table-wrapper { overflow-x: auto; border: 1px solid var(--borda); border-radius: 8px; }
        .data-table { width: 100%; border-collapse: collapse; text-align: left; }
        .data-table th { background: #f8fafc; padding: 14px; font-size: 0.85rem; color: var(--texto-mutado); border-bottom: 1px solid var(--borda); }
        .data-table td { padding: 14px; border-bottom: 1px solid var(--borda); font-size: 0.9rem; }
        .action-btn { background: var(--roxo-claro); color: var(--branco); border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
      `}</style>

      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>Caminho do Bem</h1>
          <p>Projeto Social</p>
        </div>
        <nav className="nav-menu">
          <button className={`nav-item ${telaAtiva === 'cadastro' ? 'active' : ''}`} onClick={() => setTelaAtiva('cadastro')}>
            📝 Novo Atendimento
          </button>
          <button className={`nav-item ${telaAtiva === 'busca' ? 'active' : ''}`} onClick={() => setTelaAtiva('busca')}>
            🔍 Buscar Famílias
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <div className="header">
          <h2>{telaAtiva === 'cadastro' ? 'Cadastro de Assistidos' : 'Consulta de Registros'}</h2>
          <span className="status-badge">🟢 Sistema Offline Seguro</span>
        </div>

        {telaAtiva === 'cadastro' ? (
          <div className="card">
            <div className="card-header">
              <h3>Ficha de Registro</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSalvar} className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nome Completo</label>
                  <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Rafaela Carvalho Dias" />
                </div>
                <div className="form-group">
                  <label className="form-label">CPF</label>
                  <input type="text" className="form-control" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Endereço Residencial (Guajuviras)</label>
                  <input type="text" className="form-control" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua, número, bloco ou ponto de referência" />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp / Telefone</label>
                  <input type="text" className="form-control" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(51) 99999-9999" />
                </div>
                <div className="form-group">
                  <label className="form-label">Data do Atendimento</label>
                  <input type="date" className="form-control" value={dataAtendimento} onChange={(e) => setDataAtendimento(e.target.value)} />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Observações e Necessidades (Itens entregues)</label>
                  <textarea className="form-control" value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Descreva aqui o histórico do atendimento, cestas básicas, etc..."></textarea>
                </div>
                <div className="form-group full-width">
                  <button type="submit" className="btn-primary">Salvar no Sistema</button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-header">
              <h3>Banco de Dados de Famílias</h3>
            </div>
            <div className="card-body">
              <div className="search-container">
                <input type="text" className="search-input" placeholder="Pesquisar por nome, CPF ou endereço..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} />
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Assistido</th>
                      <th>Endereço</th>
                      <th>Contato</th>
                      <th>Data</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosFiltrados.length > 0 ? (
                      registrosFiltrados.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: '600', color: 'var(--roxo-escuro)' }}>
                            {item.nome}
                            <div style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)', marginTop: '4px', fontWeight: 'normal' }}>CPF: {item.cpf || 'Não informado'}</div>
                          </td>
                          <td>{item.endereco}</td>
                          <td>{item.telefone || '---'}</td>
                          <td>{item.dataAtendimento.split('-').reverse().join('/')}</td>
                          <td>
                            <button className="action-btn" onClick={() => alert(`HISTÓRICO DE ${item.nome.toUpperCase()}:\n\n${item.obs || 'Sem observações.'}`)}>
                              Ver Ficha
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '48px', color: 'var(--texto-mutado)' }}>
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}