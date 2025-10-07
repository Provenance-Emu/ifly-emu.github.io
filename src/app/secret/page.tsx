import TestFlightGate from "@/components/TestFlightGate";

export const metadata = {
  title: "Join TestFlight | iFly",
  description: "Access the iFly TestFlight build.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SecretTestFlightPage() {
  return <TestFlightGate testflightUrl="https://testflight.apple.com/join/9mbKzrZH" />;
}
