# Plenio B2B Landing

Landing page moderna per Plenio B2B, costruita con Next.js 16 e shadcn/ui.

## 🚀 Tecnologie

- **Next.js 16** - Framework React per produzione
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling utility-first
- **shadcn/ui** - Componenti UI accessibili e personalizzabili
- **Lucide React** - Icone moderne

## 📦 Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser per vedere il risultato.

## 🛠️ Script disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea la build di produzione
- `npm run start` - Avvia il server di produzione
- `npm run lint` - Esegue il linter

## 📁 Struttura del progetto

```
plenio-b2b-landing/
├── app/
│   ├── layout.tsx      # Layout principale
│   ├── page.tsx        # Homepage
│   └── globals.css     # Stili globali
├── components/
│   └── ui/             # Componenti shadcn/ui
├── lib/
│   └── utils.ts        # Utility functions
└── public/             # File statici
```

## 🎨 Componenti UI

Questo progetto utilizza [shadcn/ui](https://ui.shadcn.com/) per i componenti. Per aggiungere nuovi componenti:

```bash
npx shadcn@latest add [component-name]
```

## 📝 Licenza

Questo progetto è privato e di proprietà di Plenio.
