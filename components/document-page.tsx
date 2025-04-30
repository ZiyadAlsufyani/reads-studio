"use client";

import { useState, useEffect } from "react";
import { DocumentSplitter } from "@/components/document-splitter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRead } from "@/src/graphql/queries";
import { client } from "@/lib/amplify";

interface DocumentPageProps {
  bookId?: string;
}

export function DocumentPage({ bookId }: DocumentPageProps) {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!bookId) {
      router.push("/books");
      return;
    }

    // Load book data to get the title
    const loadBookData = async () => {
      try {
        const response = await client.graphql({
          query: getRead,
          variables: { id: bookId },
          authMode: "userPool",
        });

        if (response.data?.getRead) {
          const book = response.data.getRead;
          console.log("Book data:", book);
          setBookTitle(
            typeof book.title === "string" ? book.title : "Book Details"
          );
        } else {
          // Book not found, redirect to books list
          router.push("/books");
        }
      } catch (e) {
        console.error("Failed to load book data:", e);
        router.push("/books");
      } finally {
        setIsLoading(false);
      }
    };

    loadBookData();
  }, [bookId, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted rounded w-1/3"></div>
          <div className="h-6 bg-muted rounded w-2/3"></div>
          <div className="h-[400px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {typeof bookTitle === "string" ? bookTitle : "Content Creation"}
          </h1>
          <Link href={`/books/${bookId}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Book Details
            </Button>
          </Link>
        </div>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Upload a document and create summaries with custom images.
        </p>
        <DocumentSplitter bookId={bookId} />
      </div>
    </main>
  );
}
