import TestFlightGate from "@/components/TestFlightGate";

export const metadata = {
  title: "Join TestFlight Patrons | iFly",
  description: "Access the iFly TestFlight build for patrons.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestFlightPatronsPage() {
  return <TestFlightGate testflightUrl="https://testflight.apple.com/join/dpDcf8Ua" skipGate={true} />;
}
