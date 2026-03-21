"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SocialButton, { BmcIcon, PatreonIcon, VenmoIcon, ZelleIcon, OpenCollectiveIcon } from "@/components/SocialButton";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const DEFAULT_TESTFLIGHT_URL = "https://testflight.apple.com/join/9ZEfnyMP";
const TWITTER_URL = "https://x.com/provenanceapp";
const STORAGE_KEY = "ifly_testflight_gate_passed";

interface TestFlightGateProps {
  testflightUrl?: string;
  skipGate?: boolean;
}

export default function TestFlightGate({ testflightUrl, skipGate }: TestFlightGateProps = {}) {
  const TESTFLIGHT_URL = testflightUrl || DEFAULT_TESTFLIGHT_URL;
  const [gatePassed, setGatePassed] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      setGatePassed(stored === "true" || skipGate === true);
    } catch {}
    setChecking(false);
  }, [skipGate]);

  function markPassed(method: "follow" | "skip") {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    const gtag = typeof window !== "undefined" ? window.gtag : undefined;
    gtag?.("event", "testflight_access", { method });
    setGatePassed(true);
  }

  if (checking) {
    return <div className="min-h-screen" aria-hidden="true" />;
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Join the iFly TestFlight</h1>
          <p className="text-gray-400">
            Get early access to iFly builds via Apple TestFlight. Seats may be limited.
          </p>
        </header>

        {!gatePassed ? (
          <section className="rounded-2xl border border-gray-800 p-6 bg-gray-900">
            <h2 className="text-xl font-medium mb-2 text-white">Help support the project</h2>
            <p className="text-sm text-gray-400 mb-4">
              Please follow <a href={TWITTER_URL} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">@provenanceapp</a> on X (Twitter) to stay updated on releases and development. Once followed, click “I followed” below. If you prefer not to follow, you can still proceed.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-md border bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition"
              >
                Follow on X (@provenanceapp)
              </a>
              <button
                type="button"
                onClick={() => markPassed("follow")}
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
              >
                I followed
              </button>
              <button
                type="button"
                onClick={() => markPassed("skip")}
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
              >
                Proceed without following
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-gray-800 p-6 bg-gray-900">
            <h2 className="text-xl font-medium mb-2 text-white">You’re in</h2>
            <p className="text-sm text-gray-400 mb-4">
              Click below to open the TestFlight invite. If the build is full, try again later.
            </p>
            <div className="flex gap-3">
              <a
                href={TESTFLIGHT_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-md bg-orange-700 text-white px-4 py-2 text-sm font-medium hover:bg-orange-600 transition"
              >
                Open TestFlight Invite
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
              >
                Go home
              </Link>
            </div>
          </section>
        )}

        <section className="text-xs text-gray-400">
          <p>
            Note: Following is optional and not required for access. Your choice is stored locally in your browser.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-800 p-6 bg-gray-900">
          <h2 className="text-xl font-medium mb-2 text-white">Support Development</h2>
          <p className="text-sm text-gray-400 mb-4">
            If you find iFly helpful, consider supporting ongoing development. Thank you!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-items-start">
            <SocialButton
              href="https://buymeacoffee.com/joemattiello"
              label="Buy Me a Coffee"
              leftIcon={<BmcIcon className="w-5 h-5" />}
              variant="bmc"
            />
            <SocialButton
              href="https://www.patreon.com/provenance"
              label="Support on Patreon"
              leftIcon={<PatreonIcon className="w-5 h-5" />}
              variant="patreon"
            />
            <SocialButton
              href="https://account.venmo.com/u/Joe-Mattiello"
              label="Venmo: @Joe-Mattiello"
              leftIcon={<VenmoIcon className="w-5 h-5" />}
              variant="venmo"
            />
            <SocialButton
              href="mailto:mail@joemattiello.com?subject=Zelle%20Donation%20for%20iFly"
              label="Zelle: mail@joemattiello.com"
              leftIcon={<ZelleIcon className="w-5 h-5" />}
              variant="zelle"
            />
            <SocialButton
              href="https://opencollective.com/provenanceemu"
              label="Open Collective"
              leftIcon={<OpenCollectiveIcon className="w-5 h-5" />}
              variant="opencollective"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
