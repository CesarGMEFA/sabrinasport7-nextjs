import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function SkeletonCarousel({}: Props) {
  return (
    <Skeleton className="w-[85%] lg:w-full mx-auto" />
  );
}
