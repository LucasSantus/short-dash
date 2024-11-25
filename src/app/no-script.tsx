"use client";

export function NoScript(): JSX.Element {
  return (
    <noscript>
      <style type="text/css">
        {`
        * {
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        #root, #main-layout {
          display: none;
        }
      `}
      </style>
      <div className="dark flex min-h-screen items-center justify-center bg-background p-4 antialiased">
        <div className="w-full max-w-2xl rounded-lg border border-muted bg-white p-8 text-center shadow-2xl">
          <h1 className="mb-4 font-bold text-3xl text-gray-800">JavaScript está desativado</h1>
          <p className="mb-6 text-gray-600 text-xl">
            Para aproveitar ao máximo este site, por favor, ative o JavaScript no seu navegador.
          </p>
          <div className="space-y-4">
            <div className="border-yellow-500 border-l-4 bg-yellow-100 p-4 text-left">
              <p className="font-semibold text-yellow-700">Por que ativar o JavaScript?</p>
              <ul className="mt-2 list-inside list-disc text-yellow-600">
                <li>Melhor experiência do usuário</li>
                <li>Funcionalidades interativas</li>
                <li>Carregamento mais rápido de conteúdo</li>
              </ul>
            </div>
            <div className="border-blue-500 border-l-4 bg-blue-100 p-4 text-left">
              <p className="font-semibold text-blue-700">Como ativar o JavaScript:</p>
              <ol className="mt-2 list-inside list-decimal text-blue-600">
                <li>Acesse as configurações do seu navegador</li>
                <li>Procure por "JavaScript" ou "Conteúdo"</li>
                <li>Ative a opção "Permitir JavaScript"</li>
                <li>Recarregue esta página</li>
              </ol>
            </div>
          </div>
          <p className="mt-8 text-gray-500 text-sm">Se você precisar de ajuda, entre em contato com nosso suporte.</p>
        </div>
      </div>
    </noscript>
  );
}
