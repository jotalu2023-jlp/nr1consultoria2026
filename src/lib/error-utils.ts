/**
 * Maps Supabase/storage errors to user-friendly Portuguese messages.
 * Keeps detailed errors in console for debugging.
 */
export function getUserFriendlyError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Erro ao processar solicitação';
  }

  const err = error as { code?: string; message?: string; statusCode?: number };
  
  // Database errors
  if (err.code === '23505') return 'Este registro já existe';
  if (err.code === '42501') return 'Permissão negada';
  if (err.code === '23503') return 'Registro relacionado não encontrado';
  if (err.code === '23514') return 'Dados inválidos';
  
  // Auth errors
  if (err.message?.includes('Invalid login credentials')) return 'E-mail ou senha incorretos';
  if (err.message?.includes('already registered')) return 'Este e-mail já está cadastrado';
  if (err.message?.includes('Email not confirmed')) return 'E-mail não confirmado';
  if (err.message?.includes('Password')) return 'Senha inválida';
  if (err.message?.includes('rate limit')) return 'Muitas tentativas. Aguarde alguns minutos.';
  
  // Storage errors
  if (err.message?.includes('storage') || err.message?.includes('bucket')) {
    return 'Erro ao processar arquivo';
  }
  if (err.statusCode === 413) return 'Arquivo muito grande';
  if (err.message?.includes('mime type') || err.message?.includes('file type')) {
    return 'Tipo de arquivo não permitido';
  }
  
  // Generic fallback - don't expose internal details
  return 'Erro ao processar solicitação';
}
