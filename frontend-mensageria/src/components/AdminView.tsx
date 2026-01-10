import { useState } from "react";
import { Settings, Plus, Pencil, Trash2 } from "lucide-react";
import type {
  Template,
  NotificationEvent,
  NotificationChannel,
} from "../types";

interface AdminViewProps {
  templates: Template[];
  onCreateTemplate: (template: Omit<Template, "id">) => void;
  onUpdateTemplate: (id: string, template: Omit<Template, "id">) => void;
  onDeleteTemplate: (id: string) => void;
}

export function AdminView({
  templates,
  onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
}: AdminViewProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Template, "id">>({
    nome: "",
    evento: "chamado-aberto",
    canal: "email",
    assunto: "",
    conteudo: "",
    ativo: true,
  });

  const resetForm = () => {
    setFormData({
      nome: "",
      evento: "chamado-aberto",
      canal: "email",
      assunto: "",
      conteudo: "",
      ativo: true,
    });
    setShowForm(false);
    setIsEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      onUpdateTemplate(isEditing, formData);
    } else {
      onCreateTemplate(formData);
    }
    resetForm();
  };

  const handleEdit = (template: Template) => {
    setFormData({
      nome: template.nome,
      evento: template.evento,
      canal: template.canal,
      assunto: template.assunto,
      conteudo: template.conteudo,
      ativo: template.ativo,
    });
    setIsEditing(template.id);
    setShowForm(true);
  };

  const getEventoLabel = (evento: NotificationEvent) => {
    const labels = {
      "chamado-aberto": "Chamado Aberto",
      "chamado-em-andamento": "Chamado em Andamento",
      "chamado-resolvido": "Chamado Resolvido",
      "chamado-fechado": "Chamado Fechado",
    };
    return labels[evento];
  };

  const getCanalLabel = (canal: NotificationChannel) => {
    return canal === "email" ? "E-mail" : "Push";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-600" />
              <h1>Gestão de Templates</h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Novo Template
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="mb-4">
              {isEditing ? "Editar Template" : "Criar Template"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    Nome do Template
                  </label>
                  <input
                    id="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="evento"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    Evento Associado
                  </label>
                  <select
                    id="evento"
                    value={formData.evento}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        evento: e.target.value as NotificationEvent,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="chamado-aberto">Chamado Aberto</option>
                    <option value="chamado-em-andamento">
                      Chamado em Andamento
                    </option>
                    <option value="chamado-resolvido">Chamado Resolvido</option>
                    <option value="chamado-fechado">Chamado Fechado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="canal"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    Canal de Envio
                  </label>
                  <select
                    id="canal"
                    value={formData.canal}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        canal: e.target.value as NotificationChannel,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="email">E-mail</option>
                    <option value="push">Push</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="assunto"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    Assunto
                  </label>
                  <input
                    id="assunto"
                    type="text"
                    required
                    value={formData.assunto}
                    onChange={(e) =>
                      setFormData({ ...formData, assunto: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="conteudo"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Conteúdo da Mensagem
                </label>
                <textarea
                  id="conteudo"
                  required
                  value={formData.conteudo}
                  onChange={(e) =>
                    setFormData({ ...formData, conteudo: e.target.value })
                  }
                  rows={4}
                  placeholder="Use {nome}, {id} e outras variáveis..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="ativo"
                  type="checkbox"
                  checked={formData.ativo}
                  onChange={(e) =>
                    setFormData({ ...formData, ativo: e.target.checked })
                  }
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="ativo" className="text-sm text-gray-700">
                  Template Ativo
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  {isEditing ? "Atualizar" : "Criar"} Template
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="mb-4">Templates Cadastrados</h2>

          {templates.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum template cadastrado ainda.
            </p>
          ) : (
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3>{template.nome}</h3>
                        {template.ativo ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            Ativo
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                            Inativo
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>Evento: {getEventoLabel(template.evento)}</span>
                        <span>Canal: {getCanalLabel(template.canal)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(template)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTemplate(template.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Assunto:</p>
                      <p className="text-sm">{template.assunto}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Conteúdo:</p>
                      <p className="text-sm text-gray-700">
                        {template.conteudo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
