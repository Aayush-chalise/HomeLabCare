import React, { useState, useEffect } from "react";
import BookingStatusPanel from "./BookingStatusPanel";

const CLINICS = [
  {
    id: 1,
    name: "HealthFirst Pharmacy",
    address: "Butwal",
    phone: "+977-9800000001",
    rating: 4.5,
    homeCollection: true,
    timings: "7:00 AM - 7:00 PM",
    tests: [
      { id: 1, name: "CBC (Complete Blood Count)", price: 299 },
      { id: 2, name: "Blood Sugar (Fasting)", price: 199 },
      { id: 3, name: "Blood Sugar (PP)", price: 199 },
      { id: 4, name: "Iron Profile", price: 399 },
      { id: 5, name: "Lipid Profile", price: 499 },
    ],
    packages: [
      {
        id: 101,
        name: "Basic Health Package",
        price: 799,
        includes: ["CBC", "Blood Sugar (Fasting)", "Urine Routine"],
      },
      {
        id: 102,
        name: "Diabetes Care Package",
        price: 999,
        includes: ["Blood Sugar (Fasting)", "Blood Sugar (PP)", "HbA1c"],
      },
    ],
  },
  {
    id: 2,
    name: "LifeCare Diagnostics",
    address: "Manigram",
    phone: "+977-9800000002",
    rating: 4.2,
    homeCollection: false,
    timings: "6:30 AM - 6:00 PM",
    tests: [
      { id: 6, name: "Thyroid Profile (T3, T4, TSH)", price: 699 },
      { id: 7, name: "Liver Function Test (LFT)", price: 599 },
      { id: 8, name: "Kidney Function Test (KFT)", price: 599 },
      { id: 9, name: "Vitamin D", price: 899 },
      { id: 10, name: "Vitamin B12", price: 699 },
    ],
    packages: [
      {
        id: 103,
        name: "Full Body Checkup",
        price: 2499,
        includes: [
          "CBC",
          "LFT",
          "KFT",
          "Lipid Profile",
          "Blood Sugar",
          "Urine Routine",
        ],
      },
      {
        id: 104,
        name: "Thyroid Package",
        price: 799,
        includes: ["T3", "T4", "TSH"],
      },
    ],
  },
  {
    id: 3,
    name: "CarePlus Labs",
    address: "Sainamaina",
    phone: "+977-9800000003",
    rating: 4.7,
    homeCollection: true,
    timings: "7:00 AM - 8:00 PM",
    tests: [
      { id: 11, name: "ESR", price: 149 },
      { id: 12, name: "CRP", price: 349 },
      { id: 13, name: "Urine Routine", price: 199 },
      { id: 14, name: "Stool Routine", price: 199 },
      { id: 15, name: "HbA1c", price: 499 },
    ],
    packages: [
      {
        id: 105,
        name: "Anemia Check Package",
        price: 899,
        includes: ["CBC", "Iron Profile", "Vitamin B12"],
      },
      {
        id: 106,
        name: "Senior Citizen Package",
        price: 1799,
        includes: ["CBC", "Blood Sugar", "Lipid Profile", "LFT", "KFT", "ECG"],
      },
    ],
  },
];

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Kavya Sharma",
    degree: "MBBS, MD",
    specialty: "Pathology",
  },
  {
    id: 2,
    name: "Dr. Aditya Verma",
    degree: "MBBS",
    specialty: "General Practitioner",
  },
];

export default function UserDashboard({ user }) {
  const [bookings, setBookings] = useState([]);

  const [tab, setTab] = useState("clinics");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showTestForm, setShowTestForm] = useState(false);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [bookInfo, setBookInfo] = useState({
    type: "clinic",
    name: user.name || "",
    phone: "",
    location: "",
    packageName: "",
    clinicName: "",
    testName: "",

    // payment: "later",
  });

  const [tempInputs, setTempInputs] = useState({
    name: user.name || "",
    phone: "",
    location: "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [doctorBookInfo, setDoctorBookInfo] = useState({
    name: user.name || "",
    phone: "",
    reportFile: null,
    docName: "",
  });
  const [tempInputsForDoc, setTempInputsForDoc] = useState({
    name: user.name || "",
    phone: "",
    reportFile: null,
  });

  const handleBookTestClick = async (e) => {
    e.preventDefault();
    alert("Booking submitted!  ");
    setShowTestForm(false);

    setShowPackageForm(false);

    const newBooking = {
      type: "clinic",
      name: tempInputs.name,
      phone: tempInputs.phone,
      location: tempInputs.location,
      clinicName: selectedClinic?.name || "",
      packageName: selectedPackage?.name || "",
      testName: selectedTest?.name || "",
      // payment: bookInfo.payment,
      // date: new Date().toISOString(),
      // status: "pending",
    };

    setBookings((prev) => [...prev, newBooking]);
    setBookInfo(newBooking);

    let data;
    const response = await fetch(" http://localhost:8080/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookInfo),
    });
    data = await response.json();
  };
  // useEffect(() => {
  //   setBookInfo((prev) => ({
  //     ...prev,
  //     clinicName: selectedClinic?.name || "",
  //     packageName: selectedPackage?.name || "",
  //     testName: selectedTest?.name || "",
  //   }));
  // }, [selectedClinic, selectedPackage, selectedTest]);

  const handleBookDoctorClick = async (e) => {
    e.preventDefault();
    alert("Appointment sent!");
    setShowDoctorForm(false);

    const newBookingForDoc = {
      type: "doctor",
      name: tempInputsForDoc.name,
      phone: tempInputsForDoc.phone,
      reportFile: tempInputsForDoc.reportFile,
      docName: selectedDoctor?.name || "",
    };
    setBookings((prev) => [...prev, newBookingForDoc]);
    setDoctorBookInfo(newBookingForDoc);

    let data;
    const response = await fetch(" http://localhost:8080/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookInfo),
    });
    data = await response.json();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050917] via-[#050a1c] to-[#040d19] p-0 md:p-8">
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex gap-3 mb-8">
          <button
            className={`py-2 px-6 rounded-xl font-semibold transition-colors ${
              tab === "clinics"
                ? "bg-indigo-700 text-white shadow"
                : "bg-[#101826]/80 text-indigo-200 hover:bg-indigo-900/70"
            }`}
            onClick={() => {
              setTab("clinics");
              setSelectedClinic(null);
              setSelectedTest(null);
              setSelectedPackage(null);
              setShowTestForm(false);
              setShowPackageForm(false);
            }}
          >
            Clinic
          </button>
          <button
            className={`py-2 px-6 rounded-xl font-semibold transition-colors ${
              tab === "doctors"
                ? "bg-indigo-700 text-white shadow"
                : "bg-[#101826]/80 text-indigo-200 hover:bg-indigo-900/70"
            }`}
            onClick={() => {
              setTab("doctors");
              setSelectedDoctor(null);
              setShowDoctorForm(false);
            }}
          >
            Doctor
          </button>
        </div>

        {/* ---------------- Pharmacy/Clinic Tab ---------------- */}
        {tab === "clinics" && (
          <div>
            {!selectedClinic ? (
              <div className="grid gap-5 md:grid-cols-2">
                {CLINICS.map((clinic) => (
                  <div
                    key={clinic.id}
                    className="bg-[#111a28] p-6 rounded-xl shadow-lg text-white/90 border border-indigo-900/50 hover:border-indigo-500 transition cursor-pointer"
                    onClick={() => setSelectedClinic(clinic)}
                  >
                    <h3 className="text-xl font-bold">{clinic.name}</h3>
                    <div className="mt-2 text-indigo-200 text-sm">
                      {clinic.address}
                    </div>
                    <div className="mt-1 text-sm text-indigo-400">
                      Phone: {clinic.phone}
                    </div>
                    <div className="flex gap-1 mt-2 text-xs items-center">
                      <span className="bg-indigo-800/80 px-2 py-1 rounded text-indigo-200">
                        Rating: {clinic.rating}★
                      </span>
                      <span className="bg-indigo-900/70 px-2 rounded text-indigo-100">
                        Timings: {clinic.timings}
                      </span>
                      <span
                        className={`px-2 rounded ${
                          clinic.homeCollection
                            ? "bg-green-700/70 text-green-100"
                            : "bg-red-700/70 text-red-100"
                        }`}
                      >
                        {clinic.homeCollection
                          ? "Home Collection Available"
                          : "No Home Collection"}
                      </span>
                    </div>
                    <div className="mt-3 font-semibold tracking-wide text-xs text-indigo-400">
                      Click to view details →
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  className="mb-4 text-indigo-400 font-semibold underline hover:text-indigo-200 transition"
                  onClick={() => {
                    setSelectedClinic(null);
                    setSelectedTest(null);
                    setSelectedPackage(null);
                    setShowTestForm(false);
                    setShowPackageForm(false);
                  }}
                >
                  ← Back to Clinics
                </button>
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {selectedClinic.name}
                </h2>
                <div className="mb-2 text-indigo-200">
                  {selectedClinic.address}
                </div>
                <div className="mb-2 text-indigo-400 text-sm">
                  Phone: {selectedClinic.phone}
                </div>
                <div className="mb-6 flex gap-3 text-sm">
                  <span className="bg-indigo-800/80 px-2 py-1 rounded text-indigo-200">
                    Rating: {selectedClinic.rating}★
                  </span>
                  <span className="bg-indigo-900/70 px-2 rounded text-indigo-100">
                    Timings: {selectedClinic.timings}
                  </span>
                  <span
                    className={`px-2 rounded ${
                      selectedClinic.homeCollection
                        ? "bg-green-700/70 text-green-100"
                        : "bg-red-700/70 text-red-100"
                    }`}
                  >
                    {selectedClinic.homeCollection
                      ? "Home Collection Available"
                      : "No Home Collection"}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  Available Tests
                </h3>
                <div className="grid gap-4 mb-8 md:grid-cols-2">
                  {selectedClinic.tests.map((test) => (
                    <div
                      key={test.id}
                      className="rounded-xl p-4 bg-[#171d32]/80 border border-indigo-800/60 text-white/90 flex flex-col gap-2"
                    >
                      <div className="font-semibold text-md">{test.name}</div>
                      <div className="text-indigo-200">NPR:{test.price}</div>
                      <button
                        className="mt-2 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 font-semibold text-white transition"
                        onClick={() => {
                          setSelectedTest(test);
                          setShowTestForm(true);
                          setShowPackageForm(false);
                        }}
                      >
                        Book this test
                      </button>
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Health Packages
                </h3>
                <div className="grid gap-4 mb-8 md:grid-cols-2">
                  {selectedClinic.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="rounded-xl p-4 bg-[#171d32]/80 border border-indigo-800/60 text-white/90 flex flex-col gap-2"
                    >
                      <div className="font-semibold text-md">{pkg.name}</div>
                      <div className="text-indigo-200">NPR:{pkg.price}</div>
                      <div className="text-sm text-indigo-300">
                        Includes: {pkg.includes.join(", ")}
                      </div>
                      <button
                        className="mt-2 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 font-semibold text-white transition"
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setShowPackageForm(true);
                          setShowTestForm(false);
                        }}
                      >
                        Book this package
                      </button>
                    </div>
                  ))}
                </div>

                {/* Booking Forms */}
                {showTestForm && selectedTest && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-[#101826] rounded-2xl p-8 max-w-sm w-full text-white relative border border-indigo-700">
                      <button
                        className="absolute top-4 right-4 text-indigo-300 hover:text-white"
                        onClick={() => {
                          setShowTestForm(false);
                          setSelectedTest(null);
                        }}
                      >
                        ✕
                      </button>
                      <h3 className="font-bold text-xl mb-3">
                        Booking for {selectedTest.name}
                      </h3>
                      <form
                        onSubmit={handleBookTestClick}
                        className="flex flex-col gap-3"
                      >
                        <input
                          className="rounded-lg p-2 bg-white/10 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Your name"
                          value={tempInputs.name}
                          required
                          onChange={(e) =>
                            setTempInputs((b) => ({
                              ...b,
                              name: e.target.value,
                            }))
                          }
                        />
                        <input
                          className="rounded-lg p-2 bg-white/10 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Phone number"
                          type="tel"
                          value={tempInputs.phone}
                          required
                          onChange={(e) =>
                            setTempInputs((b) => ({
                              ...b,
                              phone: e.target.value,
                            }))
                          }
                        />
                        <input
                          className="rounded-lg p-2 bg-white/10 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Location"
                          value={tempInputs.location}
                          required
                          onChange={(e) =>
                            setTempInputs((b) => ({
                              ...b,
                              location: e.target.value,
                            }))
                          }
                        />
                        <div className="flex gap-3 items-center mt-2">
                          <label className="flex items-center gap-2 text-gray-200">
                            <input
                              type="radio"
                              name="payment"
                              checked={bookInfo.payment === "digital"}
                              onChange={() =>
                                setBookInfo((b) => ({
                                  ...b,
                                  payment: "digital",
                                }))
                              }
                            />{" "}
                            Pay digitally
                          </label>
                          <label className="flex items-center gap-2 text-gray-200">
                            <input
                              type="radio"
                              name="payment"
                              checked={bookInfo.payment === "later"}
                              onChange={() =>
                                setBookInfo((b) => ({ ...b, payment: "later" }))
                              }
                            />{" "}
                            Pay later
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="mt-2 bg-indigo-700 hover:bg-indigo-900 rounded-lg py-2 font-bold text-white transition"
                        >
                          Book Test
                        </button>
                        <div className="mt-1 text-xs text-gray-300 text-center">
                          {bookInfo.payment === "later" &&
                            "Clinic will call to confirm your booking."}
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {showPackageForm && selectedPackage && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-[#101826] rounded-2xl p-8 max-w-sm w-full text-white relative border border-indigo-700">
                      <button
                        className="absolute top-4 right-4 text-indigo-300 hover:text-white"
                        onClick={() => {
                          setShowPackageForm(false);
                          setSelectedPackage(null);
                        }}
                      >
                        ✕
                      </button>
                      <h3 className="font-bold text-xl mb-2">
                        Booking for {selectedPackage.name}
                      </h3>
                      <div className="mb-2 text-indigo-300 text-sm">
                        Includes: {selectedPackage.includes.join(", ")}
                      </div>
                      <form
                        className="flex flex-col gap-3"
                        onSubmit={handleBookTestClick}
                      >
                        <input
                          className="rounded-lg p-2 bg-white/10 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Your name"
                          value={tempInputs.name}
                          required
                          onChange={(e) =>
                            setTempInputs((b) => ({
                              ...b,
                              name: e.target.value,
                            }))
                          }
                        />
                        <input
                          className="rounded-lg p-2 bg-white/10 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Phone number"
                          type="tel"
                          value={tempInputs.phone}
                          required
                          onChange={(e) =>
                            setTempInputs((b) => ({
                              ...b,
                              phone: e.target.value,
                            }))
                          }
                        />
                        <input
                          className="rounded-lg p-2 bg-white/10 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Location"
                          value={tempInputs.location}
                          required
                          onChange={(e) =>
                            setTempInputs((b) => ({
                              ...b,
                              location: e.target.value,
                            }))
                          }
                        />
                        <div className="flex gap-3 items-center mt-2">
                          <label className="flex items-center gap-2 text-gray-200">
                            <input
                              type="radio"
                              name="package-payment"
                              checked={bookInfo.payment === "digital"}
                              onChange={() =>
                                setBookInfo((b) => ({
                                  ...b,
                                  payment: "digital",
                                }))
                              }
                            />{" "}
                            Pay digitally
                          </label>
                          <label className="flex items-center gap-2 text-gray-200">
                            <input
                              type="radio"
                              name="package-payment"
                              checked={bookInfo.payment === "later"}
                              onChange={() =>
                                setBookInfo((b) => ({ ...b, payment: "later" }))
                              }
                            />{" "}
                            Pay later
                          </label>
                        </div>
                        <button className="mt-2 bg-indigo-700 hover:bg-indigo-900 rounded-lg py-2 font-bold text-white transition">
                          Book Package
                        </button>
                        <div className="mt-1 text-xs text-gray-300 text-center">
                          {bookInfo.payment === "later" &&
                            "Clinic will call to confirm your booking."}
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ---------------- Doctor Tab ---------------- */}
        {tab === "doctors" && (
          <div>
            {!selectedDoctor ? (
              <div className="grid gap-5 md:grid-cols-2">
                {DOCTORS.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-[#111a28] p-6 rounded-xl shadow-lg text-white/90 border border-indigo-900/50 hover:border-indigo-500 transition cursor-pointer"
                    onClick={() => setSelectedDoctor(doc)}
                  >
                    <div className="text-xl font-bold">{doc.name}</div>
                    <div className="text-indigo-200 text-sm mt-1">
                      {doc.specialty} ({doc.degree})
                    </div>
                    <div className="mt-3 text-xs text-indigo-400 font-semibold">
                      Click to appoint doctor for your report →
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  className="mb-4 text-indigo-400 font-semibold underline hover:text-indigo-200 transition"
                  onClick={() => {
                    setSelectedDoctor(null);
                    setShowDoctorForm(false);
                    setTempInputsForDoc({
                      name: user.name || "",
                      phone: "",
                      reportFile: null,
                    });
                  }}
                >
                  ← Back to list
                </button>
                <div className="bg-[#171d32]/80 border border-indigo-800/60 p-6 rounded-xl max-w-md mx-auto mt-3">
                  <h2 className="text-white text-xl font-bold mb-2">
                    {selectedDoctor.name}
                  </h2>
                  <div className="text-indigo-200 mb-5">
                    {selectedDoctor.specialty} ({selectedDoctor.degree})
                  </div>
                  <button
                    className="py-2 px-4 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white font-semibold mb-4"
                    onClick={() => setShowDoctorForm(true)}
                  >
                    Book Appointment to Show Report
                  </button>
                  {showDoctorForm && (
                    <form
                      className="flex flex-col gap-3 mt-3"
                      onSubmit={handleBookDoctorClick}
                    >
                      <input
                        className="rounded-lg p-2 bg-white/10 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Your name"
                        value={tempInputsForDoc.name}
                        required
                        onChange={(e) =>
                          setTempInputsForDoc((b) => ({
                            ...b,
                            name: e.target.value,
                          }))
                        }
                      />
                      <input
                        className="rounded-lg p-2 bg-white/10 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                        value={tempInputsForDoc.phone}
                        placeholder="Phone number"
                        type="tel"
                        required
                        onChange={(e) =>
                          setTempInputsForDoc((b) => ({
                            ...b,
                            phone: e.target.value,
                          }))
                        }
                      />
                      <div>
                        <label className="block text-gray-200 mb-1">
                          Upload Lab Report (PDF, JPG, PNG)
                        </label>
                        <input
                          className="rounded-lg p-2 bg-white/10 w-full text-gray-200 file:bg-indigo-700 file:border-none file:rounded file:px-3 file:py-1"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                          onChange={(e) =>
                            setTempInputsForDoc((b) => ({
                              ...b,
                              reportFile: e.target.files[0],
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-3 items-center mt-2">
                        <label className="flex items-center gap-2 text-gray-200">
                          <input
                            type="radio"
                            name="docpay"
                            checked={doctorBookInfo.payment === "digital"}
                            onChange={() =>
                              setDoctorBookInfo((b) => ({
                                ...b,
                                payment: "digital",
                              }))
                            }
                          />{" "}
                          Pay digitally
                        </label>
                        <label className="flex items-center gap-2 text-gray-200">
                          <input
                            type="radio"
                            name="docpay"
                            checked={doctorBookInfo.payment === "later"}
                            onChange={() =>
                              setDoctorBookInfo((b) => ({
                                ...b,
                                payment: "later",
                              }))
                            }
                          />{" "}
                          Pay later
                        </label>
                      </div>
                      <button
                        className="mt-2 bg-indigo-700 hover:bg-indigo-900 rounded-lg py-2 font-bold text-white transition"
                        type="submit"
                      >
                        Confirm Appointment
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="min-h-screen ...">
        <div className="max-w-5xl mx-auto py-8">
          <BookingStatusPanel userBookings={bookings} user={user} />
          {/* Tabs and other dashboard content... */}
        </div>
      </div>
    </div>
  );
}
