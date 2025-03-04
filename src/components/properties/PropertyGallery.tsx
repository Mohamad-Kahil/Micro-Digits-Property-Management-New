import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export const PropertyGallery = ({
  images,
  propertyName,
}: PropertyGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setSelectedImage(
      images[currentIndex === 0 ? images.length - 1 : currentIndex - 1],
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setSelectedImage(
      images[currentIndex === images.length - 1 ? 0 : currentIndex + 1],
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Property Gallery</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Images
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden group relative">
            <CardContent className="p-0">
              <img
                src={image}
                alt={`${propertyName} - Image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="mr-2"
                      onClick={() => handleImageClick(image, index)}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{propertyName} - Image Gallery</DialogTitle>
                      <DialogDescription>
                        Image {currentIndex + 1} of {images.length}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative">
                      <img
                        src={selectedImage || image}
                        alt={`${propertyName} - Image ${currentIndex + 1}`}
                        className="w-full h-auto max-h-[70vh] object-contain"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                        onClick={handlePrevious}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                        onClick={handleNext}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Image Card */}
        <Card className="overflow-hidden border-dashed">
          <CardContent className="p-0 flex items-center justify-center h-64">
            <Button variant="ghost" className="flex flex-col items-center p-6">
              <Plus className="h-8 w-8 mb-2" />
              <span>Add New Image</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
