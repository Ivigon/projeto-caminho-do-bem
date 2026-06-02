import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Cadastro() {
  const [nome, setNome] = useState('');

  const salvarAtendido = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "atendidos"), {
        nome: nome,
        criadoEm: new Date().toLocaleDateString()
      });
      alert('Cadastro realizado com sucesso!');
      setNome('');
    } catch (e) {
      alert('Erro ao salvar: ' + e.message);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-3xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-[#4A148C]">Novo Atendido</h2>
      <form onSubmit={salvarAtendido}>
        <input 
          type="text" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome completo"
          className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:border-[#4A148C] outline-none"
          required
        />
        <button type="submit" className="w-full bg-[#FFC107] text-[#4A148C] p-4 rounded-xl font-bold shadow-md">
          Salvar no sistema
        </button>
      </form>
    </div>
  );
}