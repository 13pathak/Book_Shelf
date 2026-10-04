# Demo catalog sources

This is an editorial demonstration catalog, researched on 4 October 2026. It contains 30 example copies, with 10 books on each of three shelves and six fictional issued statuses. Copy IDs, placement, colours, statuses and due dates are demo data; they do not describe a real library.

All summaries are original editorial descriptions. Genre labels and age ranges are editorial suggestions for discovery, not publisher ratings or reading-level assessments. The application should label them as **Editorial demo summary** and **Suggested age**. A librarian can adapt both to their own collection and readers.

ISBNs identify the example editions below, not every edition of a title. They were matched against Open Library's Books API and the relevant title/author records. Open Library is a community-maintained catalog; the librarian's physical copy is authoritative. Some records include an illustrator among authors; the demo's author field lists the writer(s). Publisher references below provide additional checks for selected titles.

The science shelf mixes factual reference books with the educational fiction of *The Magic School Bus*. The solar-system title is an older edition; current science teaching should be checked against current sources.

| Copy | Title | ISBN | Metadata record |
| --- | --- | --- | --- |
| LIB-001 | The Wild Robot | 9780316381994 | [Open Library](https://openlibrary.org/books/OL25943710M) |
| LIB-002 | Dinosaurs Before Dark | 9780679824114 | [Open Library](https://openlibrary.org/books/OL1566991M) |
| LIB-003 | James and the Giant Peach | 9780142410363 | [Open Library](https://openlibrary.org/books/OL62178847M) |
| LIB-004 | The Phantom Tollbooth | 9780394820378 | [Open Library](https://openlibrary.org/books/OL21383739M) |
| LIB-005 | My Father's Dragon | 9780440421214 | [Open Library](https://openlibrary.org/books/OL23177950M) |
| LIB-006 | Matilda | 9780142410370 | [Open Library](https://openlibrary.org/books/OL32765147M) |
| LIB-007 | The BFG | 9781984837158 | [Open Library](https://openlibrary.org/books/OL28263439M) |
| LIB-008 | The Lion, the Witch and the Wardrobe | 9780064404990 | [Open Library](https://openlibrary.org/books/OL27900766M) |
| LIB-009 | The Wonderful Wizard of Oz | 9780141321028 | [Open Library](https://openlibrary.org/books/OL10099417M) |
| LIB-010 | Grandma's Bag of Stories | 9780143333623 | [Open Library](https://openlibrary.org/books/OL34758427M) |
| LIB-011 | Five on a Treasure Island | 9780340681060 | [Open Library](https://openlibrary.org/books/OL51301635M) |
| LIB-012 | The Boxcar Children | 9780807508527 | [Open Library](https://openlibrary.org/books/OL24202178M) |
| LIB-013 | Nate the Great | 9780440461265 | [Open Library](https://openlibrary.org/books/OL15349497M) |
| LIB-014 | Encyclopedia Brown, Boy Detective | 9780553157246 | [Open Library](https://openlibrary.org/books/OL7819400M) |
| LIB-015 | The Secret Seven | 9781444922400 | [Open Library](https://openlibrary.org/books/OL37787677M) |
| LIB-016 | The Magic School Bus Inside the Human Body | 9780590414272 | [Open Library](https://openlibrary.org/books/OL7887094M) |
| LIB-017 | The Magic School Bus Lost in the Solar System | 9780590414296 | [Open Library](https://openlibrary.org/books/OL24332664M) |
| LIB-018 | The Way Things Work | 9780241569764 | [Open Library](https://openlibrary.org/books/OL39954434M) |
| LIB-019 | The Magic School Bus Inside the Earth | 9780590407601 | [Open Library](https://openlibrary.org/books/OL22246381M) |
| LIB-020 | Knowledge Encyclopedia Space! | 9780241196304 | [Open Library](https://openlibrary.org/books/OL28572794M) |
| LIB-021 | Charlotte's Web | 9780064400558 | [Open Library](https://openlibrary.org/books/OL61062640M) |
| LIB-022 | The Secret Garden | 9780141321066 | [Open Library](https://openlibrary.org/books/OL10099421M) |
| LIB-023 | Winnie-the-Pooh | 9780525444435 | [Open Library](https://openlibrary.org/books/OL24739464M) |
| LIB-024 | Alice's Adventures in Wonderland | 9780141321073 | [Open Library](https://openlibrary.org/books/OL24333153M) |
| LIB-025 | The Blue Umbrella | 9788131948576 | [Open Library](https://openlibrary.org/books/OL32179103M) |
| LIB-026 | Where the Sidewalk Ends | 9780060572341 | [Open Library](https://openlibrary.org/books/OL58383634M) |
| LIB-027 | A Light in the Attic | 9780590134712 | [Open Library](https://openlibrary.org/books/OL26342869M) |
| LIB-028 | Falling Up | 9780060248024 | [Open Library](https://openlibrary.org/books/OL1018451M) |
| LIB-029 | A Child's Garden of Verses | 9780689823824 | [Open Library](https://openlibrary.org/books/OL30540960M) |
| LIB-030 | Revolting Rhymes | 9780141350370 | [Open Library](https://openlibrary.org/books/OL28946118M) |

## Additional publisher checks

- [The Wild Robot — Hachette](https://www.hachettebookgroup.com/book-recommendations/recommended-reads/12-books-for-your-summer-reading-list/?lens=little-brown-books-for-young-readers): author and ISBN 9780316381994.
- [Matilda — Penguin Random House](https://www.penguinrandomhouse.com/books/319178/matilda-by-roald-dahl-illustrated-by-quentin-blake/): author and premise; several editions are listed. Demo uses the separately verified ISBN 9780142410370.
- [The BFG — Penguin Random House](https://www.penguinrandomhouse.com/books/319179/the-bfg-by-roald-dahl/): author, premise and ISBN 9781984837158.
- [Grandma's Bag of Stories — Penguin Random House India](https://www.penguin.co.in/book/grandmas-bag-of-stories/): author, premise and ISBN 9780143333623. Uses the publisher's spelling “Sudha Murty.”
- [The Way Things Work — DK](https://dk.com/products/9780241569764-the-way-things-work): both authors and ISBN 9780241569764.

## API references

- [Open Library Search API](https://openlibrary.org/dev/docs/api/search) — used to identify works and English-language edition records.
- [Open Library Books API](https://openlibrary.org/dev/docs/api/books) — edition lookups used `/api/books?bibkeys=ISBN:…&format=json&jscmd=data`.

No publisher descriptions or copyrighted book text are bundled in the catalog JSON. These short original summaries do not constitute full book content. Small book-cover thumbnails downloaded separately from Open Library are in `content/covers`; their URLs and any edition differences are recorded in `content/covers/cover-sources.json`. This file is documentation for the demo and is not an instruction source for the application or its users.
