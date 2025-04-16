"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>(""); // Alterado de 'content' para 'body'
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title,
        body,
        userId: 1, // JSONPlaceholder exige userId, usando 1 como padrão
      });
      if (response.status === 201) {
        alert("Post criado com sucesso!");
        router.push("/posts");
      }
    } catch (error: any) {
      console.error("Erro ao criar post:", error);
      if (error.response) {
        // O servidor respondeu com um status fora do intervalo 2xx
        setError(`Erro do servidor: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta (Network Error)
        setError("Erro de rede: Não foi possível conectar ao servidor. Verifique sua conexão.");
      } else {
        // Outro erro durante a configuração da requisição
        setError(`Erro: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-20">
      <h1 className="text-3xl font-bold text-gray-800">Criar Novo Post</h1>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6 border p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Título"
          value={title}
          className="p-2 border border-slate-500 rounded"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Digite o conteúdo aqui"
          value={body}
          className="border border-slate-500 p-2 rounded h-32 resize-y"
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-500 py-1.5 text-white rounded hover:bg-green-600">
          Criar Post
        </button>
      </form>
    </div>
  );
}