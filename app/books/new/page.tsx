import { BookDetailsPage } from "@/components/shared/book/book-details-page";

export const metadata = {
  title: "Create New Book",
  description: "Create a new book and enter its details",
};

export default function NewBookPage() {
  return <BookDetailsPage isNew={true} />;
}
