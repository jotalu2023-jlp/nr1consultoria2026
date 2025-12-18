import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Trash2, Edit, FileText, Video, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Document {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  category: string | null;
  is_active: boolean | null;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("geral");
  const [fileType, setFileType] = useState("pdf");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta área.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [isAdmin, adminLoading, user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchDocuments();
    }
  }, [isAdmin]);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar documentos.",
        variant: "destructive",
      });
    } else {
      setDocuments(data || []);
    }
    setLoadingDocs(false);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title.trim()) {
      toast({
        title: "Erro",
        description: "Preencha o título e selecione um arquivo.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      const bucket = fileType === "video" ? "videos" : "documents";
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from("documents")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          file_path: urlData.publicUrl,
          file_type: fileType,
          file_size: file.size,
          category,
          is_active: true,
        });

      if (dbError) throw dbError;

      toast({
        title: "Sucesso",
        description: "Arquivo enviado com sucesso!",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("geral");
      setFileType("pdf");
      setFile(null);
      
      // Refresh list
      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar arquivo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm("Tem certeza que deseja excluir este documento?")) return;

    try {
      // Extract file name from URL
      const bucket = doc.file_type === "video" ? "videos" : "documents";
      const urlParts = doc.file_path.split("/");
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      await supabase.storage.from(bucket).remove([fileName]);

      // Delete from database
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", doc.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Documento excluído com sucesso!",
      });
      
      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir documento.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;

    try {
      const { error } = await supabase
        .from("documents")
        .update({
          title: editingDoc.title,
          description: editingDoc.description,
          category: editingDoc.category,
          is_active: editingDoc.is_active,
        })
        .eq("id", editingDoc.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Documento atualizado com sucesso!",
      });
      
      setIsEditDialogOpen(false);
      setEditingDoc(null);
      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar documento.",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (doc: Document) => {
    try {
      const { error } = await supabase
        .from("documents")
        .update({ is_active: !doc.is_active })
        .eq("id", doc.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Documento ${!doc.is_active ? "ativado" : "desativado"} com sucesso!`,
      });
      
      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar status.",
        variant: "destructive",
      });
    }
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Área Administrativa</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload de Arquivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nome do documento"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição do documento"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="fileType">Tipo de Arquivo</Label>
                  <Select value={fileType} onValueChange={setFileType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geral">Geral</SelectItem>
                      <SelectItem value="nr1">NR1</SelectItem>
                      <SelectItem value="legislacao">Legislação</SelectItem>
                      <SelectItem value="treinamento">Treinamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="file">Arquivo *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept={fileType === "video" ? "video/*" : ".pdf"}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Enviar Arquivo
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentos ({documents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingDocs ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : documents.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum documento cadastrado.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            {doc.file_type === "video" ? (
                              <Video className="h-5 w-5 text-primary" />
                            ) : (
                              <FileText className="h-5 w-5 text-destructive" />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{doc.title}</TableCell>
                          <TableCell>
                            <span className="capitalize">{doc.category || "geral"}</span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant={doc.is_active ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleActive(doc)}
                            >
                              {doc.is_active ? "Ativo" : "Inativo"}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog open={isEditDialogOpen && editingDoc?.id === doc.id} onOpenChange={(open) => {
                                setIsEditDialogOpen(open);
                                if (!open) setEditingDoc(null);
                              }}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingDoc(doc)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Editar Documento</DialogTitle>
                                  </DialogHeader>
                                  {editingDoc && (
                                    <form onSubmit={handleEdit} className="space-y-4">
                                      <div>
                                        <Label htmlFor="edit-title">Título</Label>
                                        <Input
                                          id="edit-title"
                                          value={editingDoc.title}
                                          onChange={(e) => setEditingDoc({...editingDoc, title: e.target.value})}
                                          required
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-description">Descrição</Label>
                                        <Textarea
                                          id="edit-description"
                                          value={editingDoc.description || ""}
                                          onChange={(e) => setEditingDoc({...editingDoc, description: e.target.value})}
                                          rows={3}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-category">Categoria</Label>
                                        <Select 
                                          value={editingDoc.category || "geral"} 
                                          onValueChange={(v) => setEditingDoc({...editingDoc, category: v})}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="geral">Geral</SelectItem>
                                            <SelectItem value="nr1">NR1</SelectItem>
                                            <SelectItem value="legislacao">Legislação</SelectItem>
                                            <SelectItem value="treinamento">Treinamento</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <Button type="submit" className="w-full">
                                        Salvar Alterações
                                      </Button>
                                    </form>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(doc)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
