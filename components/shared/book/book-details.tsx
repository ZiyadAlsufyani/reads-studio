"use client";
import { uploadData } from "aws-amplify/storage";
import type React from "react";
import { v4 as uuidv4 } from "uuid";
import { FileUploaderHandle } from "@aws-amplify/ui-react-storage";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface BookInfo {
  title: string;
  author: string;
  description: string;
  coverImageUrl?: string;
  isOwnedByUser: boolean;
}

interface BookDetailsProps {
  bookInfo: BookInfo;
  onUpdateBookInfo: (info: BookInfo) => void;
  isNew?: boolean;
}

export function BookDetails({
  bookInfo,
  onUpdateBookInfo,
  isNew = false,
}: BookDetailsProps) {
  const [title, setTitle] = useState(bookInfo.title);
  const [author, setAuthor] = useState(bookInfo.author);
  const [description, setDescription] = useState(bookInfo.description || "");
  const [isOwnedByUser, setIsOwnedByUser] = useState(
    bookInfo.isOwnedByUser || false
  );
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>(
    bookInfo.coverImageUrl
  );
  const [tempPreviewUrl, setTempPreviewUrl] = useState<string | undefined>(
    undefined
  );
  const [isDragging, setIsDragging] = useState(false);
  const [fileInput, setFileInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const fileUploaderRef = useRef<FileUploaderHandle>(null);
  // Update local state when bookInfo prop changes
  useEffect(() => {
    setTitle(bookInfo.title || "");
    setAuthor(bookInfo.author || "");
    setDescription(bookInfo.description || "");
    setIsOwnedByUser(bookInfo.isOwnedByUser || false);
    setCoverImageUrl(bookInfo.coverImageUrl);
    setHasChanges(false);
  }, [bookInfo]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasChanges(true);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    setHasChanges(true);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    setHasChanges(true);
  };

  const handleOwnershipChange = (checked: boolean) => {
    setIsOwnedByUser(checked);
    setHasChanges(true);
  };

  const handleSave = () => {
    const updatedBookInfo = {
      title,
      author,
      description,
      coverImageUrl,
      isOwnedByUser,
    };

    onUpdateBookInfo(updatedBookInfo);
    setHasChanges(false);

    toast.success("Book details updated", {
      description: "Your book details have been saved.",
    });
  };

  // better way for handling images
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // is this approach better?
      // const key = `public/${Date.now()}-${file.name}`; // Dynamic unique filename

      const uniqueId = uuidv4(); // Generate a new UUID
      const extension = file.name.split(".").pop(); // Get the file extension
      const key = `public/${uniqueId}.${extension}`;
      setCoverImageUrl(key);
      console.log("Uploading to S3 with key:", key);
      const { result } = await uploadData({
        path: key,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes = 100 }) => {
            const percent = Math.round((transferredBytes / totalBytes) * 100);
            console.log(`Upload progress: ${percent}%`);
          },
        },
      });

      console.log("Upload succeeded:", result);
      // Since you want to show a preview immediately:
      const url = URL.createObjectURL(file);
      console.log(url);

      setTempPreviewUrl(url); // For immediate local preview
      setHasChanges(true);

      toast.success("Cover image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload cover image.");
    }
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const uploadedImageUrl = event.target.result as string;
        setCoverImageUrl(uploadedImageUrl);
        setHasChanges(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCoverImageUrl(undefined);
    setHasChanges(true);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        processImageFile(file);
      } else {
        toast.error("Invalid file type", {
          description: "Please upload an image file.",
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Book Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5">
            <div className="space-y-2">
              <label htmlFor="book-title" className="text-sm font-medium">
                Book Title
              </label>
              <Input
                id="book-title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter book title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="book-author" className="text-sm font-medium">
                Author Name
              </label>
              <Input
                id="book-author"
                value={author}
                onChange={handleAuthorChange}
                placeholder="Enter author name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="book-description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="book-description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter book description"
                className="min-h-[150px]"
              />
            </div>

            <div className="flex items-center space-x-2 pt-3">
              <Checkbox
                id="ownership"
                checked={isOwnedByUser}
                onCheckedChange={handleOwnershipChange}
              />
              <Label
                htmlFor="ownership"
                className="text-sm font-medium cursor-pointer"
              >
                I confirm that I own the rights to this book or have permission
                to use it
              </Label>
            </div>

            {!isOwnedByUser && hasChanges && (
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You must confirm that you own the rights to this book or have
                  permission to use it before saving.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                onClick={handleSave}
                disabled={!hasChanges || !isOwnedByUser || !title || !author}
              >
                {isNew ? "Create Book" : "Save Book Details"}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Book Cover</label>
            <div
              className={cn(
                "border rounded-md overflow-hidden transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-dashed border-primary/50 hover:border-primary"
              )}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              {coverImageUrl ? (
                <div className="relative aspect-[2/3] w-full">
                  <img
                    src={tempPreviewUrl || "/placeholder.svg"}
                    alt="Book cover"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="aspect-[2/3] w-full flex flex-col items-center justify-center p-6 text-muted-foreground cursor-pointer">
                  <ImageIcon className="h-12 w-12 mb-3 text-primary/70" />
                  <p className="text-center text-sm">
                    {isDragging
                      ? "Drop image here"
                      : "Click or drag to upload cover image"}
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
            />
          </div>

          {/* Amplify approach. But the styling isn't that good*/}
          {/* <FileUploader
            acceptedFileTypes={["image/*"]}
            path="public/"
            maxFileCount={1}
            isResumable
          /> */}
        </div>
      </CardContent>
    </Card>
  );
}
