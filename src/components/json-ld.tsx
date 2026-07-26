/**
 * Renders a single `<script type="application/ld+json">`.
 *
 * `JSON.stringify` is safe here (not `dangerouslySetInnerHTML`-with-user-input
 * unsafe) because every caller passes data drawn from `src/content/site.ts`,
 * never from a request, a query param, or anything a visitor can influence.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
