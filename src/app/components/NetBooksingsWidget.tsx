// src/app/components/NetBookingsWidget.tsx

import { useNetBookings } from "../../hooks/useNetBookings";

interface NetBookingsWidgetProps {
  businessId: string;
}

export function NetBookingsWidget({
  businessId,
}: NetBookingsWidgetProps) {
  const { ref, status } = useNetBookings({ businessId });

  return (
    <div className="relative w-full">
      <div ref={ref} />

      {status === "loading" && (
        <div className="mt-4 text-sm text-bone/50 italic">
          Loading availability…
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 text-sm text-red-400">
          Booking system temporarily unavailable.
        </div>
      )}
    </div>
  );
}
