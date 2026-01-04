import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-contact-email function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, company, email, phone, message }: ContactFormData = await req.json();
    
    console.log("Received contact form data:", { name, company, email, phone: phone ? "provided" : "not provided" });

    // Validate required fields
    if (!name || !company || !email || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não preenchidos" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailHtml = `
      <h1>Nova mensagem de contato - NR1 Consultoria</h1>
      <hr/>
      <h2>Dados do contato:</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Empresa:</strong> ${company}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
      <hr/>
      <h2>Mensagem:</h2>
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p><em>Mensagem enviada através do formulário de contato do site NR1 Consultoria.</em></p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "NR1 Consultoria <onboarding@resend.dev>",
        to: ["jotalu2023@gmail.com"],
        subject: "Consultoria sobre NR1 atualizações",
        html: emailHtml,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error("Failed to send email");
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao enviar mensagem. Tente novamente." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
