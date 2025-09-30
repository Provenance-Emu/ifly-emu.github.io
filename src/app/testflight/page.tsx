import TestFlightGate from "@/components/TestFlightGate";

export const metadata = {
  title: "Join TestFlight | iFly",
  description: "Access the iFly TestFlight build.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestFlightPage() {
  return <TestFlightGate />;
}
