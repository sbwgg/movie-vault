import { forwardRef } from "react";

interface MediaGridProps {
  children?: React.ReactNode;
}

export const MediaGrid = forwardRef<HTMLDivElement, MediaGridProps>(
  (props, ref) => {
    return (
      <div
        className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-5"
        ref={ref}
      >
        {props.children}
      </div>
    );
  },
);
