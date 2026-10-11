# Shelf & Story

A local school-library explorer with ERP import, interactive bookshelves, real-photo book maps, circulation updates, and book information lookup.

## Open the app

The development server runs at http://127.0.0.1:5173/.

To restart on Windows, double-click **Start-Library.cmd** in this folder. Keep its terminal open while testing; press Ctrl+C to stop it. Node.js 22.13 or newer is required. The launcher installs dependencies if needed and prepares the local database on first use.

Manual commands:

```powershell
npm ci
node scripts/setup-local.mjs
npm run dev
```

This is a local prototype, not an online deployment. The librarian desk has no password and is intended for trusted use on this computer. Library APIs reject requests for non-loopback hostnames. Authentication, student access, backups and shared hosting must be configured before an online launch.

## Start with your school ERP

Open **Import ERP list** or **Librarian desk → Import ERP catalogue**.

1. Upload the accession/book register as **.xls, .xlsx, .csv or .tsv**. Genuine legacy Excel .xls files are supported directly. One row must represent one physical copy with its own accession ID.
2. Choose a worksheet and the header row. Common headings are detected automatically. A report title above the table is supported.
3. Match fields to columns. Accession ID and book title are required. Author, ISBN, category, shelf, location, position, summary, suggested age, language, publisher, year, price, page description, availability and expected return are optional.
4. Review new, updated and unchanged copies, warnings, and changes from the existing record. Fix errors before applying. The source file is never edited.
5. Import. Column mappings are remembered on this browser when the next file has the same headings.

### Your supplied Library Book.xls

The supplied 979-copy catalogue is loaded in the local preview. The previous sample library is backed up in `outputs/library-before-erp-import.json` and can be restored through **Backup & restore**. Import findings are saved in `outputs/library-import-report.json`. The original .xls file is unchanged.

Verified worksheet **Books**, headings on **row 7**, **979 copies**, 979 unique accession IDs, and 939 distinct titles. Accession IDs such as `SIV/1` retain their slash and full text. Repeated titles remain separate copies.

Automatically recognized columns:

- Book Name → title
- Accession No. → physical copy ID
- Author Name → author (surrounding whitespace trimmed)
- Publisher Name → publisher
- Year of Publication → publication year
- Price → price as exported (no currency assumed)
- Page No → page count or original description

Sr. No. is report numbering, not the book ID. The file has no shelf, availability, genre, ISBN, age or summary columns. New copies therefore default to **Check with librarian**, and unassigned copies go to **ERP catalogue · not mapped yet**. They are not counted as available until circulation data or a librarian confirms their status.

The source has 205 missing authors and a publication year `20102` for `SIV/184`. The importer flags the year while preserving the original value. Page descriptions such as `approximately 24 pages` are retained.

### Import rules

- Match existing records by accession ID, case-insensitively. Keep the stored ID spelling.
- Never merge copies by title or ISBN.
- Duplicate accession IDs and malformed required fields block import. An error report can be downloaded.
- Records omitted from a later export remain in the library.
- Blank optional cells and unmapped fields preserve existing values.
- Existing circulation status and expected return remain unchanged unless **Update existing copies’ availability** is checked.
- Existing photo outlines remain unless an explicit shelf change moves the copy. Shelf moves are flagged in review and clear the old outline.
- Sample books can be removed during import with an explicit checkbox.
- Import up to 5,000 copies and 100 shelves in this local version; files must be under 8 MB. Large result sets are paginated.
- Workbook macros are not executed; formulas are not recalculated. Missing cached formula results and spreadsheet error cells are rejected.
- This is export-based ERP integration. A direct ERP API connection has not been configured.

## Add real shelf photos

Choose **Add shelf photo**, or **Librarian desk → Shelf photos** to edit an existing shelf. Use a well-lit, straight-on JPG, PNG or WebP, up to 20 MB. The browser resizes it before local storage.

Drag an outline over a book. Select its accession ID from the existing catalogue to map that physical copy. Existing IDs are locked in the photo editor. You can also draw a new outline and use **Link this outline to an ERP / existing copy**. This keeps the ERP metadata and current circulation status. Search by title, author, ISBN or accession ID. If there are multiple copies, choose the correct accession explicitly.

Save the reviewed shelf, then use **Photo twin** in the student view. Outlined books are clickable and show current status. The digital bookshelf and Covers views also show the imported catalogue without requiring photos. A picture alone does not prove availability, since issued books may be absent.

### Optional AI book recognition

Manual photo mapping and ERP import work without API keys. Automatic spine recognition needs an OpenAI API key:

1. Copy `.dev.vars.example` to `.dev.vars` in this folder.
2. Set `OPENAI_API_KEY` and optionally `OPENAI_VISION_MODEL` (default `gpt-5.4-mini`).
3. Restart the server.
4. In the photo editor, click **Identify books with AI**. This sends that photo to OpenAI and can incur API charges. The key stays on the local server and is never sent to the browser.
5. Review every suggested title and outline, then link drafts to existing ERP accessions. Unreadable books are explicitly marked. The AI step does not silently overwrite the catalogue.

Recognition needs internet access, readable spines and human review. The no-key error path has been tested; a live AI recognition request has not been verified without a key.

## Daily issue / return data

Use **Librarian desk → Issue & return**. Upload .xls, .xlsx, CSV or TSV; choose worksheet/header and map accession ID, action/status and optional due date. Accepted actions include Issue / Issued / Borrowed and Return / Returned / Available. Dates should be `YYYY-MM-DD` or genuine Excel date cells.

Use one final status per copy per upload. Unknown IDs, duplicates and invalid dates block applying the file. Fix the source and upload again. Books omitted from the file retain their status. A successful import can be undone during the same desk session until another catalogue edit is made. Import history is retained. Student/borrower names and other unmapped fields are not saved.

Open student views refresh library data every 30 seconds. Expected return dates are visible; borrower identities are not stored. A date passing does not automatically make an issued copy available.

## Book details and reading lists

Students can search by title, author, genre or accession, filter available books, browse spines/covers/photos, and save a personal reading list on the current browser. A saved book is not a reservation.

**Look up book information** searches Open Library online. Students/librarians choose a matching result rather than accepting the first match. Summaries and subjects are attributed. Librarians may save a selected summary. Some titles have no metadata; local records remain usable when the external service is unavailable. Suggested ages and demo summaries are editorial, not official publisher ratings.

## Saving and backups

Catalogue data is stored in the local SQLite database through the D1 emulator. Shelf photos use local R2 storage. Both persist in `.wrangler/state/` across refreshes and server restarts. Do not delete that folder if you want to keep your library. No data is deployed or uploaded to a host by the setup commands.

**Backup & restore** downloads a JSON backup including records, photos, outlines and import history. Restoring explicitly replaces the library after a review. Reading lists and remembered column mappings remain device/browser preferences.

Use **Export catalogue** to obtain the supported catalogue fields as CSV. Spreadsheet formula-like strings are escaped in the export.

## Validation

```powershell
npm run typecheck
npm test
node tests/library.test.mjs "C:/Users/rampa/Downloads/Library Book.xls"
npm run build
```

`tests/api-smoke.mjs` can check a running local server. It performs an unchanged library save (incrementing its revision) and uploads an unattached test image. It verifies rejection of stale writes, duplicates, cross-origin writes and unsupported images, and confirms photo byte persistence. Do not run it against a future production deployment.

Automatic browser visual/interaction inspection was unavailable in the Codex environment. Manually check desktop/mobile layout, keyboard navigation, importing a file, drawing photo outlines and backup downloads in the local preview before deployment.

## Sources and implementation

React/Vinext, TypeScript, local Cloudflare D1/R2 emulation, Zod validation and SheetJS CE 0.20.3. The official SheetJS package supports both legacy XLS and XLSX. Book metadata is fetched only when requested.

- [SheetJS installation](https://docs.sheetjs.com/docs/getting-started/installation/nodejs/)
- [Open Library APIs](https://openlibrary.org/developers/api)
- [OpenAI image inputs](https://developers.openai.com/api/docs/guides/images-vision)
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

Demo book provenance is in `../content/demo-sources.md`; cover provenance is in `../content/covers/cover-sources.json`. Some covers depict another edition of the same title. Uploaded ERP metadata and photos remain authoritative for your library.
