import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, ArrowLeft, Download, FileText, LogOut, Loader2, Video, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Document {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  category: string | null;
  created_at: string;
}

// Video player component that loads signed URL on open
const VideoPlayer = ({ doc, getSignedUrl }: { doc: Document; getSignedUrl: (path: string) => Promise<string | null> }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      const url = await getSignedUrl(doc.file_path);
      setVideoUrl(url);
      setLoading(false);
    };
    loadVideo();
  }, [doc.file_path, getSignedUrl]);

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{doc.title}</DialogTitle>
      </DialogHeader>
      <div className="aspect-video">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : videoUrl ? (
          <video
            src={videoUrl}
            controls
            className="w-full h-full rounded-lg"
          >
            Seu navegador não suporta a reprodução de vídeos.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
            <p className="text-muted-foreground">Erro ao carregar vídeo</p>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

const Downloads = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os documentos.",
        variant: "destructive",
      });
    } finally {
      setLoadingDocs(false);
    }
  };

  const getSignedUrl = async (filePath: string): Promise<string | null> => {
    // Parse path format: bucket/filename
    const pathParts = filePath.split("/");
    const bucket = pathParts[0];
    const fileName = pathParts.slice(1).join("/");

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(fileName, 3600); // 1 hour expiry

    if (error) {
      console.error("Error creating signed URL:", error);
      return null;
    }
    return data.signedUrl;
  };

  const handleDownload = async (doc: Document) => {
    setDownloading(doc.id);

    try {
      // Log the download
      await supabase.from("downloads_log").insert({
        user_id: user?.id,
        document_id: doc.id,
      });

      // Get signed URL for the file
      const signedUrl = await getSignedUrl(doc.file_path);
      if (!signedUrl) {
        throw new Error("Could not generate download URL");
      }

      // Open the signed URL
      window.open(signedUrl, "_blank");
      toast({
        title: "Download iniciado",
        description: `${doc.title} está sendo baixado.`,
      });
    } catch (error) {
      console.error("Error downloading:", error);
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o arquivo.",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "N/A";
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  const pdfs = documents.filter(d => d.file_type !== "video");
  const videos = documents.filter(d => d.file_type === "video");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">NR1 Consultoria</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
          <h1 className="text-3xl font-bold">Materiais para Download</h1>
          <p className="text-muted-foreground mt-2">
            Acesse nossos materiais exclusivos sobre NR1 e riscos psicossociais.
          </p>
        </div>

        {loadingDocs ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : documents.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum documento disponível</h3>
              <p className="text-muted-foreground text-center">
                Novos materiais serão adicionados em breve.<br />
                Fique atento às atualizações!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* PDFs Section */}
            {pdfs.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-destructive" />
                  Documentos PDF ({pdfs.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pdfs.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-destructive/10 rounded-lg">
                            <FileText className="h-6 w-6 text-destructive" />
                          </div>
                          {doc.category && (
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full capitalize">
                              {doc.category}
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        {doc.description && (
                          <CardDescription>{doc.description}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {formatFileSize(doc.file_size)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(doc)}
                            disabled={downloading === doc.id}
                          >
                            {downloading === doc.id ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Download className="h-4 w-4 mr-2" />
                            )}
                            Baixar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Videos Section */}
            {videos.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Vídeos ({videos.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Video className="h-6 w-6 text-primary" />
                          </div>
                          {doc.category && (
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full capitalize">
                              {doc.category}
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        {doc.description && (
                          <CardDescription>{doc.description}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {formatFileSize(doc.file_size)}
                          </span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Play className="h-4 w-4 mr-2" />
                                Assistir
                              </Button>
                            </DialogTrigger>
                            <VideoPlayer doc={doc} getSignedUrl={getSignedUrl} />
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Downloads;
