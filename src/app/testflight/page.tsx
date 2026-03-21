import type { Metadata } from 'next';
import TestFlightGate from "@/components/TestFlightGate";

export const metadata: Metadata = {
  title: 'TestFlight Beta',
  description: 'Join the iFly TestFlight beta. Get early access to the latest Dreamcast emulator builds for iOS and tvOS before public release.',
  alternates: { canonical: 'https://ifly-emu.com/testflight/' },
};

export default function TestFlightPage() {
  return <TestFlightGate />;
}
