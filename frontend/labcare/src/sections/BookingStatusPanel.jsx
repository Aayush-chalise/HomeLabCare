import React from "react";

const BookingStatusPanel = React.memo(({ userBookings }) => {
  const validBookings = userBookings.filter((b) => Object.keys(b).length > 0);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">
        Booking & Appointment Status
      </h2>

      {validBookings.length === 0 ? (
        <div className="text-center text-indigo-200 py-8">No bookings yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {validBookings.map((booked, index) => (
            <div
              key={index}
              className="bg-[#171d32]/80 border border-indigo-800/60 rounded-xl p-5 shadow text-white/90"
            >
              {/* ---------- CLINIC BOOKINGS ---------- */}
              {booked.type === "clinic" && (
                <>
                  <div className="mb-2 font-semibold text-lg">
                    {booked.testName || booked.packageName}
                    {booked.packageName && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-indigo-600 text-white text-xs">
                        Package
                      </span>
                    )}
                  </div>

                  <div className="mb-2 text-indigo-200 text-sm">
                    <span className="font-medium">Clinic:</span>{" "}
                    {booked.clinicName}
                  </div>

                  <div className="text-gray-300 text-xs">
                    Booked by: {booked.name} | Phone: {booked.phone} | Location:{" "}
                    {booked.location}
                  </div>
                </>
              )}

              {/* ---------- DOCTOR APPOINTMENTS ---------- */}
              {booked.type === "doctor" && (
                <>
                  <div className="mb-2 font-semibold text-lg">
                    Doctor Appointment
                    <span className="ml-2 px-2 py-0.5 rounded bg-green-700 text-white text-xs">
                      Doctor
                    </span>
                  </div>

                  <div className="mb-2 text-indigo-200 text-sm">
                    <span className="font-medium">Doctor:</span>{" "}
                    {booked.docName}
                  </div>

                  <div className="text-gray-300 text-xs">
                    Appointed by: {booked.name} | Phone: {booked.phone}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
export default BookingStatusPanel;
