import { z } from 'zod';

// Document upload/edit validation
export const documentSchema = z.object({
  title: z.string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título deve ter no máximo 200 caracteres')
    .transform(s => s.trim()),
  description: z.string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional()
    .transform(s => s?.trim() || null),
  category: z.enum(['geral', 'nr1', 'legislacao', 'treinamento']),
  fileType: z.enum(['pdf', 'video']),
});

// File validation
export const fileSchema = z.object({
  file: z.instanceof(File)
    .refine(f => f.size > 0, 'Arquivo é obrigatório')
    .refine(f => f.size <= 500 * 1024 * 1024, 'Arquivo deve ter no máximo 500MB'),
});

// Auth validation
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .max(255, 'E-mail muito longo')
    .transform(s => s.trim().toLowerCase()),
  password: z.string()
    .min(1, 'Senha é obrigatória'),
});

export const signupSchema = z.object({
  fullName: z.string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .transform(s => s.trim()),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .max(255, 'E-mail muito longo')
    .transform(s => s.trim().toLowerCase()),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(72, 'Senha deve ter no máximo 72 caracteres')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type DocumentInput = z.infer<typeof documentSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
