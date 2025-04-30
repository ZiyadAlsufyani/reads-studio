"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Download,
  ImageIcon,
  Plus,
  GripVertical,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define types for our drag and drop functionality
interface PageSummary {
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition?: "top" | "bottom";
  isLoading?: boolean;
  isGeneratingImage?: boolean;
}

// Update the interface to include the new prop
interface SummarizedPagesListProps {
  pageSummaries: PageSummary[];
  fileName: string;
  fileType: "word" | "pdf";
  selectedPageIndex: number;
  onSelectPage: (index: number) => void;
  onReorderPages?: (reorderedPages: PageSummary[]) => void;
  onAddNewPage?: (options?: {
    duplicate?: boolean;
    insertAfterIndex?: number;
    template?: "blank" | "detailed";
  }) => void;
  onDeletePage?: (index: number) => void;
  isSummarizingPages?: boolean;
  onGenerateAllImages?: () => void;
  onUploadSlides?: () => Promise<void>;
}

// Update the function parameters to include the new prop
export function SummarizedPagesList({
  pageSummaries,
  fileName,
  fileType,
  selectedPageIndex,
  onSelectPage,
  onReorderPages,
  onAddNewPage,
  onDeletePage,
  isSummarizingPages = false,
  onUploadSlides,
  onGenerateAllImages,
}: SummarizedPagesListProps) {
  const { toast } = useToast();
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState<
    number | null
  >(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<number | null>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastClientYRef = useRef<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Clean up auto-scroll interval on unmount
  useEffect(() => {
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  // Set up global mouse move and mouse up listeners for dragging outside the container
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        lastClientYRef.current = e.clientY;
        handleAutoScroll(e.clientY);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        stopAutoScroll();
        isDraggingRef.current = false;
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const downloadAllSummaries = () => {
    const zip = require("jszip")();
    const baseFileName = fileName.replace(/\.[^/.]+$/, "");
    const extension = "html";

    const pages = pageSummaries.map((summary) => summary.content);

    pages.forEach((page, index) => {
      zip.file(`${baseFileName}_page_${index + 1}.${extension}`, page);
    });

    zip.generateAsync({ type: "blob" }).then((content: Blob) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseFileName}_pages.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  // Handle auto-scrolling based on mouse position
  const handleAutoScroll = (clientY: number) => {
    if (!listContainerRef.current) return;

    const container = listContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const scrollSensitivityZone = 80; // pixels from edge to trigger scrolling

    // Calculate distance from top and bottom edges
    const distanceFromTop = clientY - containerRect.top;
    const distanceFromBottom = containerRect.bottom - clientY;

    // Determine if cursor is above or below the container
    const isAboveContainer = clientY < containerRect.top;
    const isBelowContainer = clientY > containerRect.bottom;

    // Determine scroll direction and speed
    let scrollAmount = 0;

    if (isAboveContainer || distanceFromTop < scrollSensitivityZone) {
      // Scroll up - speed increases as you get further above or closer to the top edge
      const intensity = isAboveContainer
        ? Math.min(8, Math.abs(containerRect.top - clientY) / 10)
        : Math.max(1, (scrollSensitivityZone - distanceFromTop) / 10);
      scrollAmount = -intensity;
    } else if (isBelowContainer || distanceFromBottom < scrollSensitivityZone) {
      // Scroll down - speed increases as you get further below or closer to the bottom edge
      const intensity = isBelowContainer
        ? Math.min(8, Math.abs(clientY - containerRect.bottom) / 10)
        : Math.max(1, (scrollSensitivityZone - distanceFromBottom) / 10);
      scrollAmount = intensity;
    }

    // Start, update, or stop auto-scrolling based on scroll amount
    if (scrollAmount !== 0) {
      startAutoScroll(scrollAmount);
    } else {
      stopAutoScroll();
    }
  };

  // Start auto-scrolling with the given amount
  const startAutoScroll = (scrollAmount: number) => {
    // Clear any existing interval
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    // Set up interval for smooth scrolling
    autoScrollIntervalRef.current = setInterval(() => {
      if (listContainerRef.current) {
        listContainerRef.current.scrollBy({ top: scrollAmount });

        // If we have a last known cursor position, update the drop indicator
        if (lastClientYRef.current !== null && draggedItemIndex !== null) {
          updateDropIndicator(lastClientYRef.current);
        }
      }
    }, 16); // ~60fps
  };

  // Stop auto-scrolling
  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  // Update drop indicator position based on cursor position
  const updateDropIndicator = (clientY: number) => {
    if (!listContainerRef.current || draggedItemIndex === null) return;

    const container = listContainerRef.current;
    const items = Array.from(
      container.querySelectorAll('[data-page-item="true"]')
    );

    // Find the closest item to the cursor
    let closestItem: Element | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;
    let closestIndex = -1;
    let insertBefore = false;

    items.forEach((item, index) => {
      if (index === draggedItemIndex) return; // Skip the dragged item

      const rect = item.getBoundingClientRect();
      const itemMiddle = rect.top + rect.height / 2;
      const distance = Math.abs(clientY - itemMiddle);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
        closestIndex = index;
        insertBefore = clientY < itemMiddle;
      }
    });

    if (closestItem) {
      // Adjust the index based on whether we're inserting before or after the closest item
      let newPosition = closestIndex;
      if (!insertBefore) newPosition += 1;

      // Adjust for the dragged item's original position
      if (draggedItemIndex < closestIndex && !insertBefore) newPosition -= 1;
      if (draggedItemIndex > closestIndex && insertBefore) newPosition += 1;

      // Ensure the position is within bounds
      newPosition = Math.max(0, Math.min(newPosition, pageSummaries.length));

      setDropIndicatorPosition(newPosition);
    }
  };

  // Manual implementation of drag and drop functionality
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
    isDraggingRef.current = true;
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    lastClientYRef.current = e.clientY;

    // Handle auto-scrolling
    handleAutoScroll(e.clientY);

    // Determine if we should show the indicator above or below this item
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;

    // If cursor is in the top half, show indicator above this item
    // If cursor is in the bottom half, show indicator below this item
    const newPosition = y < height / 2 ? index : index + 1;

    if (newPosition !== dropIndicatorPosition) {
      setDropIndicatorPosition(newPosition);
    }
  };

  const handleDragEnd = () => {
    // Stop auto-scrolling
    stopAutoScroll();
    isDraggingRef.current = false;
    lastClientYRef.current = null;

    if (draggedItemIndex !== null && dropIndicatorPosition !== null) {
      // Don't reorder if dropping at the same position or adjacent position
      if (
        dropIndicatorPosition !== draggedItemIndex &&
        dropIndicatorPosition !== draggedItemIndex + 1
      ) {
        const reorderedPages = [...pageSummaries];
        const [removed] = reorderedPages.splice(draggedItemIndex, 1);

        // Adjust the insertion index if needed
        let insertAt = dropIndicatorPosition;
        if (dropIndicatorPosition > draggedItemIndex) {
          insertAt--;
        }

        reorderedPages.splice(insertAt, 0, removed);

        if (onReorderPages) {
          onReorderPages(reorderedPages);

          // Update selected page index if needed
          let newSelectedIndex = selectedPageIndex;
          if (selectedPageIndex === draggedItemIndex) {
            newSelectedIndex = insertAt;
          } else if (
            selectedPageIndex > draggedItemIndex &&
            selectedPageIndex <= insertAt
          ) {
            newSelectedIndex--;
          } else if (
            selectedPageIndex < draggedItemIndex &&
            selectedPageIndex >= insertAt
          ) {
            newSelectedIndex++;
          }

          onSelectPage(newSelectedIndex);

          // Fixed toast call
          toast.success("Pages reordered", {
            description: `Page moved from position ${
              draggedItemIndex + 1
            } to position ${insertAt + 1}`,
          });
        }
      }
    }

    // Reset drag state
    setDraggedItemIndex(null);
    setDropIndicatorPosition(null);
  };

  const handleAddNewPage = (options?: {
    duplicate?: boolean;
    insertAfterIndex?: number;
    template?: "blank" | "detailed";
  }) => {
    if (onAddNewPage) {
      onAddNewPage(options);
      // Fixed toast call
      toast.success("New page added", {
        description: "A new blank page has been added to your summaries.",
      });
    }
  };

  const handleDeleteClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the page
    setPageToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (pageToDelete !== null && onDeletePage) {
      onDeletePage(pageToDelete);
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setPageToDelete(null);
  };

  const renderDropIndicator = (position: number) => {
    if (
      draggedItemIndex === null ||
      dropIndicatorPosition !== position ||
      position === undefined
    )
      return null;

    return (
      <div
        className="h-1.5 bg-primary rounded-full w-full my-2 transition-all duration-200 animate-pulse"
        style={{ marginTop: position === 0 ? "0" : "8px", marginBottom: "8px" }}
      />
    );
  };

  // Loading animation for summarizing pages
  const renderLoadingOverlay = () => {
    if (!isSummarizingPages) return null;

    return (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-md">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary border-solid rounded-full animate-spin opacity-30"></div>
          <div className="absolute inset-2 border-4 border-primary border-dashed rounded-full animate-spin animate-reverse"></div>
          <div className="absolute inset-4 border-4 border-primary border-dotted rounded-full animate-spin animate-delay"></div>
        </div>
        <h3 className="mt-4 text-lg font-semibold">Summarizing Pages</h3>
        <p className="text-sm text-muted-foreground mt-2">
          This may take a moment...
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium truncate">{fileName}</h3>
        </div>
        <div className="flex space-x-2">
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
            {pageSummaries.length} pages
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary uppercase">
            {fileType}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={downloadAllSummaries}
        >
          <Download className="mr-2 h-4 w-4" />
          Download All Summaries
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex-shrink-0"
          onClick={() => handleAddNewPage()}
          aria-label="Add new page"
          title="Add new page (Ctrl+N)"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {onGenerateAllImages && (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={onGenerateAllImages}
          disabled={pageSummaries.some((summary) => summary.isGeneratingImage)}
        >
          {pageSummaries.some((summary) => summary.isGeneratingImage) ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Images...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Generate All Images
            </>
          )}
        </Button>
      )}
      <Button
        size="sm"
        onClick={onUploadSlides}
        disabled={isUploading || pageSummaries.length === 0}
      >
        {isUploading ? "Uploading..." : "Save Slides"}
      </Button>

      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-medium">Summarized Pages</h4>
        <div
          ref={listContainerRef}
          className="space-y-3 max-h-[calc(100vh-270px)] overflow-y-auto pr-2 relative"
        >
          {/* Loading overlay */}
          {renderLoadingOverlay()}

          {/* Render drop indicator for position 0 (before first item) */}
          {renderDropIndicator(0)}

          {pageSummaries.map((summary, index) => (
            <div key={`page-container-${index}`}>
              <div
                data-page-item="true"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "border rounded-md p-3 transition-colors relative",
                  selectedPageIndex === index
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50",
                  draggedItemIndex === index ? "opacity-50" : ""
                )}
                onClick={() => onSelectPage(index)}
              >
                {/* Loading indicator for individual page */}
                {summary.isLoading ? (
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] flex items-center justify-center rounded-md z-10">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : null}

                {/* Image generation loading indicator */}
                {summary.isGeneratingImage ? (
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] flex flex-col items-center justify-center rounded-md z-10">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                    <span className="text-xs text-center">
                      Generating image...
                    </span>
                  </div>
                ) : null}

                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium">Page {index + 1}</h5>
                    <p className="text-sm font-medium text-muted-foreground truncate">
                      {typeof summary.title === "string"
                        ? summary.title
                        : `Page ${index + 1}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Replace dropdown menu with direct trash icon */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => handleDeleteClick(index, e)}
                      aria-label="Delete page"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div
                      className="cursor-grab active:cursor-grabbing p-1.5 rounded-md hover:bg-muted flex-shrink-0 border border-dashed border-muted-foreground/30 h-8 w-8 flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {summary.imageUrl && (
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={summary.imageUrl || "/placeholder.svg"}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-1 min-w-0">
                    {typeof summary.content === "string"
                      ? summary.content
                      : "No content available"}
                  </p>
                  {summary.imageUrl && (
                    <div className="flex-shrink-0 mt-1">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              {/* Render drop indicator after this item */}
              {renderDropIndicator(index + 1)}
            </div>
          ))}

          {/* Add new page button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4 border-dashed hover:bg-primary/5 focus:ring-2 focus:ring-primary/20"
            onClick={() => handleAddNewPage()}
            aria-label="Add new page at the end"
            title="Add new page at the end (Ctrl+N)"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Page
          </Button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this page? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Add keyboard shortcut for adding new page
function useKeyboardShortcut(
  onAddNewPage: (options?: {
    duplicate?: boolean;
    insertAfterIndex?: number;
    template?: "blank" | "detailed";
  }) => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+N or Cmd+N to add new page
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault(); // Prevent browser's "New Window" action
        if (onAddNewPage) {
          onAddNewPage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onAddNewPage]);
}

export default function SummarizedPagesListWrapper(
  props: SummarizedPagesListProps
) {
  const { onAddNewPage } = props;
  useKeyboardShortcut(onAddNewPage!); // Non-null assertion is safe here

  return <SummarizedPagesList {...props} />;
}
