"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      
      const localResponse = await axios.get("http://localhost:3001/posts");
      const localPosts = localResponse.data;
      
      const maxId = localPosts.length > 0 ? Math.max(...localPosts.map((post: any) => post.id)) : 100;
      const nextId = maxId + 1;

      
      const response = await axios.post("http://localhost:3001/posts", {
        id: nextId,
        title,
        body,
        userId: 1,
      });
      if (response.status === 201) {
        alert("Post criado com sucesso!");
        router.push("/posts");
      }
    } catch (error: any) {
      console.error("Erro ao criar post:", error);
      if (error.response) {
        setError(`Erro do servidor: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        setError("Erro de rede: Não foi possível conectar ao json-server. Verifique se está rodando em http://localhost:3001.");
      } else {
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