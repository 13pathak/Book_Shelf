# Demo cover thumbnails

30 real book-cover thumbnails are available as `LIB-001.jpg` through `LIB-030.jpg`. They were downloaded from Open Library's Covers API and visually checked against each catalog title and author on 4 October 2026. The images are approximately 180 pixels wide. All six requested featured covers are included.

`cover-sources.json` records the source URL, catalog ISBN, dimensions, byte size and verification notes for every image. The application should retain its book-spine fallback if an asset fails to load.

Three covers use title-matched alternatives to the catalog ISBN's default image:

- **LIB-012, The Boxcar Children:** the ISBN endpoint returned audiobook artwork. The included image is a print cover from the matching Open Library work record.
- **LIB-018, The Way Things Work:** Open Library has no image for the catalog's 2023 ISBN. The included image is an older edition with the matching title and author.
- **LIB-027, A Light in the Attic:** the catalog ISBN returned an internal title page. The included image is a cover from another English-language edition of the same title.

These thumbnails are catalog imagery obtained from Open Library, not AI-generated cover art. No image processing or changes to the original artwork were performed.
