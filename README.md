# College Predictor

A Next.js app that predicts likely JEE college matches from cutoff data stored in Supabase. The user enters Main and optional Advanced ranks, selects category and gender, and the app returns matching colleges grouped by probability.

## Current Workflow

1. Run the app locally with `npm run dev`.
2. Open [http://localhost:3000](http://localhost:3000).
3. Choose `JEE Main only` or `Main + Advanced`.
4. Enter the required JEE Main rank and category rank fields.
5. Select category and gender.
6. Submit the form with `Predict colleges`.
7. Review results below the form in three buckets:
   - `High probability`
   - `Moderate probability`
   - `Low probability`

Each bucket shows a count card and a fit-to-width table with institute, branch, opening rank, closing rank, and college type.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase SSR client
- XLSX for cutoff spreadsheet conversion

## Setup

Install dependencies:

```bash
npm install
```

Create `.env` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The Supabase project must include a `cutoffs` table with fields matching `lib/types.ts` and `lib/variables.ts`.

## Commands

Start development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

Note: `next/font` may need network access during `npm run build` to fetch Google fonts.

## App Structure

- `app/page.tsx` renders the main page shell.
- `app/components/userInput.tsx` owns the form state, exam mode, submit action, and result buckets.
- `app/components/resultsTable.tsx` renders probability summaries and grouped tables.
- `app/components/Tablerow.tsx` renders each college result row.
- `app/components/collegetypebadge.tsx` renders IIT/NIT/IIIT/GFTI badges.
- `app/components/styles.ts` stores shared table class strings.
- `app/api/predictor.ts` orchestrates high, moderate, and low result queries.
- `app/api/getHighData.ts` fetches direct rank matches.
- `app/api/getModerateData.ts` fetches near matches around +/- 100 ranks and excludes high matches.
- `app/api/getLowData.ts` fetches wider near matches around +/- 200 ranks and excludes stronger matches.
- `utils/supabase/client.ts` and `utils/supabase/server.ts` create Supabase clients.
- `utils/import/conversion.ts` and `utils/import/updateTable.ts` support cutoff import.

## Result Grouping

The UI stores results in three separate arrays:

- `results_high`
- `results_moderate`
- `results_low`

`app/api/predictor.ts` returns Main and Advanced results separately for each probability bucket:

```ts
{
  predicted_mains_data: {
    high: [],
    moderate: [],
    low: []
  },
  predicted_advanced_data: {
    high: [],
    moderate: [],
    low: []
  }
}
```

The form merges Main and Advanced rows into the matching UI bucket before passing them to `ResultsTable`.

## Data Refresh

Cutoff import helpers live in `utils/import`.

- `conversion.ts` downloads the published XLSX sheet, converts the first sheet to JSON, writes `data.json`, and calls `updateTable`.
- `updateTable.ts` normalizes rank values, derives `college_type`, and inserts transformed rows into Supabase.

These helpers are not currently exposed through an npm script. If a refresh script or admin route is added later, verify the Supabase table schema before inserting new data.

## Notes

- UI changes should stay inside `app/components` unless page-level layout changes are required.
- Predictor behavior lives in `app/api/getHighData.ts`, `app/api/getModerateData.ts`, `app/api/getLowData.ts`, and `app/api/predictor.ts`.
- Keep environment values out of commits.

## 
